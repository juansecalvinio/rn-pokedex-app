import {pokemonApi} from '../../config/api/pokemon.api';
import {Pokemon} from '../../domain/entities/pokemon';
import {
  PokeAPIPaginationResponse,
  PokeAPIPokemon,
} from '../../infrastrucure/interfaces/pokeapi.interfaces';
import {PokemonMapper} from '../../infrastrucure/mappers/pokemon.mapper';

export const sleepRequest = async (ms: number = 2000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getPokemons = async (
  page: number = 0,
  limit: number = 20,
): Promise<Pokemon[]> => {
  await sleepRequest();
  try {
    const offset = page * 10; // Para mostrar siempre 10 por página

    const url = `/pokemon?offset=${offset}&limit=${limit}`;
    const {data} = await pokemonApi.get<PokeAPIPaginationResponse>(url);

    const pokemonPromises = data.results.map(pokemonInfo => {
      return pokemonApi.get<PokeAPIPokemon>(pokemonInfo.url);
    });

    const pokeApiPokemons = await Promise.all(pokemonPromises);

    const pokemonsPromises = pokeApiPokemons.map(item =>
      PokemonMapper.pokeApiPokemonToEntity(item.data),
    );

    return await Promise.all(pokemonsPromises);
  } catch (error) {
    console.log('🚀 ~ error:', error);
    throw new Error('Error getting pokemons.');
  }
};
