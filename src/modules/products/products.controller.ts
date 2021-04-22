import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpStatus,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') productTitle: string,
    @Body('description') productDesc: string,
    @Body('price') productPrice: number,
  ) {
    const product = await this.productsService.insertProduct(
      productTitle,
      productDesc,
      productPrice,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Product added successfully',
      data: product,
    };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') productId: string) {
    return this.productsService.getSingleProduct(productId);
  }

  @Patch(':id')
  async productBook(
    @Param('id') productId: string,
    @Body('title') productTitle: string,
    @Body('description') productDesc: string,
    @Body('price') productPrice: number,
  ) {
    const product = await this.productsService.updateProduct(
      productId,
      productTitle,
      productDesc,
      productPrice,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Product updated successfully',
      product: product,
    };
  }

  @Delete(':id')
  async removeProduct(@Param('id') productId: string) {
    const isDeleted = await this.productsService.deleteProduct(productId);
    if (isDeleted) {
      return {
        statusCode: HttpStatus.OK,
        message: 'product deleted successfully',
      };
    }
  }
}
