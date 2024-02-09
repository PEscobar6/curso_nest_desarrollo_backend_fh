import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { IHttpAdapter } from './common/interfaces/http-adapter.interface';
import { AxiosAdapter } from './common/adapters/axios.adapter';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),
    
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),

    PokemonModule,

    CommonModule,

    SeedModule
  ],
  providers: [
    {
      provide: IHttpAdapter,
      useClass: AxiosAdapter
    }
  ],
})
export class AppModule {}
