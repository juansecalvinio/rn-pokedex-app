import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Pokemon} from '../../../domain/entities/pokemon';
import {Card, Text} from 'react-native-paper';
import {FadeInImage} from '../ui/FadeInImage';

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  return (
    // TODO: backgroundColor
    <Card style={[styles.cardContainer, {backgroundColor: pokemon.color}]}>
      <Text variant="bodyLarge" lineBreakMode="middle" style={styles.name}>
        {pokemon.name}
        {'\n #' + pokemon.id}
      </Text>

      {/* Pokeball background image */}
      <View style={styles.pokeballContainer}>
        <Image
          source={require('../../../assets/pokeball-light.png')}
          style={styles.pokeball}
        />
      </View>

      {/* Pokemon image */}
      {/* <Image source={{uri: pokemon.avatar}} style={styles.pokemonImage} /> */}
      <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />

      {/* Types */}
      <Text style={[styles.name, {marginTop: 35}]}>{pokemon.types[0]}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    flex: 0.5,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    top: 10,
    left: 10,
  },
  pokeball: {
    width: 100,
    height: 100,
    right: -25,
    top: -25,
    opacity: 0.4,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -15,
    top: -30,
  },

  pokeballContainer: {
    alignItems: 'flex-end',
    width: '100%',
    position: 'absolute',

    overflow: 'hidden',
    opacity: 0.5,
  },
});
