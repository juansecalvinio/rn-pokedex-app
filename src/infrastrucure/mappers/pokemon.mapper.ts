import {getColorFromImage} from '../../config/helpers/get-color';
import {Pokemon} from '../../domain/entities/pokemon';
import {PokeAPIPokemon} from '../interfaces/pokeapi.interfaces';

export class PokemonMapper {
  static async pokeApiPokemonToEntity(
    pokeApiPokemon: PokeAPIPokemon,
  ): Promise<Pokemon> {
    const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeApiPokemon.id}.png`;
    const sprites = PokemonMapper.getSprites(pokeApiPokemon);
    const color = await getColorFromImage(avatar);

    return {
      id: pokeApiPokemon.id,
      name: pokeApiPokemon.name,
      avatar: avatar,
      sprites: sprites,
      types: pokeApiPokemon.types.map(type => type.type.name),
      color: color,
    };
  }

  static getSprites(data: PokeAPIPokemon): string[] {
    const sprites: string[] = [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny,
    ];

    if (data.sprites.other?.home.front_default)
      sprites.push(data.sprites.other?.home.front_default);
    if (data.sprites.other?.['official-artwork'].front_default)
      sprites.push(data.sprites.other?.['official-artwork'].front_default);
    if (data.sprites.other?.['official-artwork'].front_shiny)
      sprites.push(data.sprites.other?.['official-artwork'].front_shiny);
    if (data.sprites.other?.showdown.front_default)
      sprites.push(data.sprites.other?.showdown.front_default);
    if (data.sprites.other?.showdown.back_default)
      sprites.push(data.sprites.other?.showdown.back_default);

    return sprites;
  }
}
