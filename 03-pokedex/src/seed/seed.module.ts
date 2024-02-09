import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { IHttpAdapter } from 'src/common/interfaces/http-adapter.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Module({
  controllers: [SeedController],
  providers: [
    SeedService,
    { provide: IHttpAdapter, useClass: AxiosAdapter }
  ],
  imports: [
    PokemonModule
  ],
})
export class SeedModule {}
