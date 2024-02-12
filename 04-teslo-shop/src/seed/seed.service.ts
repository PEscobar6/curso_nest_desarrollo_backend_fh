import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly productService: ProductsService
  ) {}
  
  async runSeed() {
    await this.insertNewProducts();
    return 'SEED EXECUTE';
  }

  private async insertNewProducts() {
    await this.productService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];
    
    try {
      products.forEach( product => {
        insertPromises.push( this.productService.create( product ) );
      });
      await Promise.all( insertPromises );
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error while inserting products');
    }

  }

}
