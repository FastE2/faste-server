import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CustomZodValidationPipe } from './common/pipes/custom-zod-validation.pipe';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/common.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { UserModule } from './modules/user/user.module';
import { MediaModule } from './modules/media/media.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { LanguageModule } from './modules/language/language.module';
import { ProfileModule } from './modules/profile/profile.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { ProvincesModule } from './modules/provinces/provinces.module';
import { DeliveryTypeModule } from './modules/delivery-type/delivery-type.module';
import { AddressShipModule } from './modules/address-ship/address-ship.module';
import { ShopModule } from './modules/shop/shop.module';
import { QueueModule } from './queues/queue.module';
import { PaymentModule } from './modules/payment/payment.module';

const modules = [
  AuthModule,
  UserModule,
  MediaModule,
  RoleModule,
  PermissionModule,
  LanguageModule,
  ProfileModule,
  BrandModule,
  CategoryModule,
  ProductModule,
  CartModule,
  OrderModule,
  ProvincesModule,
  DeliveryTypeModule,
  AddressShipModule,
  ShopModule,
  PaymentModule,
];
@Module({
  imports: [QueueModule, PrismaModule, CommonModule, ...modules],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: CustomZodValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
