import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt'

import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SeedService {

  constructor(
    private readonly productService: ProductsService,
    @InjectRepository( User )
    private readonly userRepository: Repository<User>
  ) {}
  
  async runSeed() {
    await this.deleteTables();

    const adminUser = await this.insertUsers();

    await this.insertNewProducts( adminUser );
    return { message: 'SEED EXECUTE'};
  }

  private async deleteTables() {

    await this.productService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute();

  }

  private async insertUsers(): Promise<User> {
    
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach( user => {
      user.password = bcrypt.hashSync( user.password, 10 );
      users.push( this.userRepository.create( user ) );
    });

    const dbUsers = await this.userRepository.save( users );

    return dbUsers[0];
  }

  private async insertNewProducts( user: User ) {
    await this.productService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];
    
    try {
      products.forEach( product => {
        insertPromises.push( this.productService.create( product, user ) );
      });
      await Promise.all( insertPromises );
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error while inserting products');
    }

  }

}
