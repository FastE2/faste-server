import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { startOfDay, endOfDay, subDays, startOfMonth } from 'date-fns';

export type DateRange = { from: Date; to: Date };

export interface OverviewResult {
  totalRevenue: number;
  totalOrders: number;
  totalProductsSold: number;
  totalReturns: number;
}

export interface SalesTrendItem {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopProductItem {
  productId: number;
  productName: string;
  image: string;
  totalSold: number;
  totalRevenue: number;
}

export interface TopSellerItem {
  shopId: number;
  shopName: string;
  logo: string | null;
  totalRevenue: number;
  totalOrders: number;
}

@Injectable()
export class ReportRepository {
  constructor(private readonly prisma: PrismaService) {}

  resolveDateRange(query: {
    dateRange?: string;
    from?: Date;
    to?: Date;
  }): DateRange {
    const now = new Date();
    if (query.from && query.to) {
      return { from: startOfDay(query.from), to: endOfDay(query.to) };
    }
    switch (query.dateRange) {
      case 'today':
        return { from: startOfDay(now), to: endOfDay(now) };
      case 'last7days':
        return { from: startOfDay(subDays(now, 6)), to: endOfDay(now) };
      case 'last30days':
        return { from: startOfDay(subDays(now, 29)), to: endOfDay(now) };
      case 'thisMonth':
        return { from: startOfMonth(now), to: endOfDay(now) };
      default:
        return { from: startOfDay(subDays(now, 6)), to: endOfDay(now) };
    }
  }

  async getOverview(
    range: DateRange,
    shopId?: number,
  ): Promise<OverviewResult> {
    const shopFilter =
      shopId !== undefined
        ? Prisma.sql`AND o."shopId" = ${shopId}`
        : Prisma.empty;

    const rows = await this.prisma.$queryRaw<
      {
        totalRevenue: bigint | number | null;
        totalOrders: bigint | number | null;
        totalProductsSold: bigint | number | null;
        totalReturns: bigint | number | null;
      }[]
    >(Prisma.sql`
      SELECT
        COALESCE(SUM(
          CASE WHEN o."status" IN ('DELIVERED', 'RECEIVED')
               THEN s."skuPrice" * s."quantity" ELSE 0 END
        ), 0) AS "totalRevenue",
        COUNT(DISTINCT CASE
          WHEN o."status" NOT IN ('CANCELLED') THEN o."id" END
        ) AS "totalOrders",
        COALESCE(SUM(
          CASE WHEN o."status" IN ('DELIVERED', 'RECEIVED')
               THEN s."quantity" ELSE 0 END
        ), 0) AS "totalProductsSold",
        COUNT(DISTINCT CASE
          WHEN o."status" IN ('RETURNED', 'CANCELLED') THEN o."id" END
        ) AS "totalReturns"
      FROM "Order" o
      LEFT JOIN "ProductSKUSnapshot" s ON s."orderId" = o."id"
      WHERE o."createdAt" BETWEEN ${range.from} AND ${range.to}
        AND o."deletedAt" IS NULL
        ${shopFilter}
    `);

    const row = rows[0];
    return {
      totalRevenue: Number(row?.totalRevenue ?? 0),
      totalOrders: Number(row?.totalOrders ?? 0),
      totalProductsSold: Number(row?.totalProductsSold ?? 0),
      totalReturns: Number(row?.totalReturns ?? 0),
    };
  }

  async getAdminExtraCounts(range: DateRange): Promise<{
    totalCustomers: number;
    totalSellers: number;
  }> {
    const rows = await this.prisma.$queryRaw<
      {
        totalCustomers: bigint | number | null;
        totalSellers: bigint | number | null;
      }[]
    >(Prisma.sql`
      SELECT
        (
          SELECT COUNT(DISTINCT o."userId")
          FROM "Order" o
          WHERE o."createdAt" BETWEEN ${range.from} AND ${range.to}
            AND o."deletedAt" IS NULL
        ) AS "totalCustomers",
        (
          SELECT COUNT(*)
          FROM "Shop" s
          WHERE s."status" = 'APPROVED'
            AND s."deletedAt" IS NULL
        ) AS "totalSellers"
    `);

    const row = rows[0];
    return {
      totalCustomers: Number(row?.totalCustomers ?? 0),
      totalSellers: Number(row?.totalSellers ?? 0),
    };
  }

  async getSalesTrend(
    range: DateRange,
    shopId?: number,
  ): Promise<SalesTrendItem[]> {
    const shopFilter =
      shopId !== undefined
        ? Prisma.sql`AND o."shopId" = ${shopId}`
        : Prisma.empty;

    const rows = await this.prisma.$queryRaw<
      { date: Date; revenue: number | null; orders: bigint | number | null }[]
    >(Prisma.sql`
      SELECT
        DATE(o."createdAt") AS "date",
        COALESCE(SUM(s."skuPrice" * s."quantity"), 0) AS "revenue",
        COUNT(DISTINCT o."id") AS "orders"
      FROM "Order" o
      JOIN "ProductSKUSnapshot" s ON s."orderId" = o."id"
      WHERE o."status" IN ('DELIVERED', 'RECEIVED')
        AND o."createdAt" BETWEEN ${range.from} AND ${range.to}
        AND o."deletedAt" IS NULL
        ${shopFilter}
      GROUP BY DATE(o."createdAt")
      ORDER BY "date" ASC
    `);

    return rows.map((r) => ({
      date: new Date(r.date).toISOString().split('T')[0],
      revenue: Number(r.revenue ?? 0),
      orders: Number(r.orders ?? 0),
    }));
  }

  async getTopProducts(
    range: DateRange,
    limit: number,
    shopId?: number,
  ): Promise<TopProductItem[]> {
    const shopFilter =
      shopId !== undefined
        ? Prisma.sql`AND o."shopId" = ${shopId}`
        : Prisma.empty;

    const rows = await this.prisma.$queryRaw<
      {
        productId: number | null;
        productName: string;
        image: string;
        totalSold: bigint | number | null;
        totalRevenue: number | null;
      }[]
    >(Prisma.sql`
      SELECT
        s."productId",
        s."productName",
        s."image",
        SUM(s."quantity") AS "totalSold",
        SUM(s."skuPrice" * s."quantity") AS "totalRevenue"
      FROM "ProductSKUSnapshot" s
      JOIN "Order" o ON s."orderId" = o."id"
      WHERE o."status" IN ('DELIVERED', 'RECEIVED')
        AND o."createdAt" BETWEEN ${range.from} AND ${range.to}
        AND o."deletedAt" IS NULL
        ${shopFilter}
      GROUP BY s."productId", s."productName", s."image"
      ORDER BY "totalSold" DESC
      LIMIT ${limit}
    `);

    return rows.map((r) => ({
      productId: Number(r.productId ?? 0),
      productName: r.productName,
      image: r.image,
      totalSold: Number(r.totalSold ?? 0),
      totalRevenue: Number(r.totalRevenue ?? 0),
    }));
  }

  async getTopSellers(
    range: DateRange,
    limit: number,
  ): Promise<TopSellerItem[]> {
    const rows = await this.prisma.$queryRaw<
      {
        shopId: number;
        shopName: string;
        logo: string | null;
        totalRevenue: number | null;
        totalOrders: bigint | number | null;
      }[]
    >(Prisma.sql`
      SELECT
        o."shopId",
        sh."name" AS "shopName",
        sh."logo",
        SUM(s."skuPrice" * s."quantity") AS "totalRevenue",
        COUNT(DISTINCT o."id") AS "totalOrders"
      FROM "Order" o
      JOIN "ProductSKUSnapshot" s ON s."orderId" = o."id"
      JOIN "Shop" sh ON sh."shopid" = o."shopId"
      WHERE o."status" IN ('DELIVERED', 'RECEIVED')
        AND o."createdAt" BETWEEN ${range.from} AND ${range.to}
        AND o."deletedAt" IS NULL
      GROUP BY o."shopId", sh."name", sh."logo"
      ORDER BY "totalRevenue" DESC
      LIMIT ${limit}
    `);

    return rows.map((r) => ({
      shopId: Number(r.shopId),
      shopName: r.shopName,
      logo: r.logo,
      totalRevenue: Number(r.totalRevenue ?? 0),
      totalOrders: Number(r.totalOrders ?? 0),
    }));
  }

  /** Upsert daily seller snapshots for the snapshot cron job */
  async upsertSellerDailySnapshot(
    sellerId: number,
    date: Date,
    data: {
      totalRevenue: number;
      totalQuantity: number;
      totalOrders: number;
      totalReturns: number;
    },
  ) {
    return this.prisma.sellerSalesReport.upsert({
      where: { sellerId_date: { sellerId, date } },
      create: { sellerId, date, ...data },
      update: data,
    });
  }

  /** Upsert daily admin summary for the snapshot cron job */
  async upsertAdminDailySummary(
    date: Date,
    data: {
      totalRevenue: number;
      totalOrders: number;
      totalQuantity: number;
      totalReturns: number;
      totalCustomers: number;
      totalSellers: number;
    },
  ) {
    return this.prisma.adminDailySummary.upsert({
      where: { date },
      create: { date, ...data },
      update: data,
    });
  }

  /** Get all distinct shopIds with completed orders on a given date */
  async getActiveSellerIds(range: DateRange): Promise<number[]> {
    const rows = await this.prisma.$queryRaw<{ shopId: number }[]>(Prisma.sql`
      SELECT DISTINCT o."shopId"
      FROM "Order" o
      WHERE o."createdAt" BETWEEN ${range.from} AND ${range.to}
        AND o."deletedAt" IS NULL
    `);
    return rows.map((r) => Number(r.shopId));
  }
}
