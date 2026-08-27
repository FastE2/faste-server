import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.sellerSalesReport.deleteMany({});
  console.log('Cleared SellerSalesReport');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
