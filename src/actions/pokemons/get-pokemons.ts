import {pokemonApi} from '../../config/api/pokemon.api';
import {Pokemon} from '../../domain/pokemon';

export const getPokemon = async (): Promise<Pokemon[]> => {
  try {
    const url = '/pokemon';
    const {data} = await pokemonApi.get(url);

    console.log({data});

    return [];
  } catch (error) {
    throw new Error('Error getting pokemons.');
  }
};
