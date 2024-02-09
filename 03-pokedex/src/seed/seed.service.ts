import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { IHttpAdapter } from 'src/common/interfaces/http-adapter.interface';

@Injectable()
export class SeedService {
  
  

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel = Model<Pokemon>,
    private readonly http: IHttpAdapter
  ) {}

  public async executeSeed() {

    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=800');

    const pokemons = data.results.map(({ name, url }) => ({
      no: +url.split('/').at(-2),
      name
    }));

    await this.pokemonModel.insertMany(pokemons);

    return 'Seed executed successfully';
  }


}
