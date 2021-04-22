import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  databaseConfig,
  MongooseConnectMiddleware,
  appConfig,
} from '../../common';
import { ProductsModule } from '../products';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
    }),
    MongooseModule.forRootAsync(MongooseConnectMiddleware),
    ProductsModule,
  ],
})
export class AppModule {
}
