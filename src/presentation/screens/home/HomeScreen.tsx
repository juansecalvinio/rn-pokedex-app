import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {getPokemons} from '../../../actions/pokemons';
import {PokeballBackground} from '../../components/ui/PokeballBackground';
import {FlatList} from 'react-native-gesture-handler';
import {ActivityIndicator, Text} from 'react-native-paper';
import {globalTheme} from '../../../config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../../components/pokemons/PokemonCard';
import {ThemeContext} from '../../context/ThemeContext';

export const HomeScreen = () => {
  const {isDark} = useContext(ThemeContext);
  const {top} = useSafeAreaInsets();

  const {isLoading, data: pokemons} = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(),
    staleTime: 1000 * 60, // 1 minute
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBackground style={styles.imgPosition} />
      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{paddingTop: top + 20}}
        ListHeaderComponent={() => (
          <Text
            variant="displayMedium"
            style={{
              color: isDark ? '#fafafa' : '#222222',
              fontWeight: 'bold',
              marginBottom: 35,
            }}>
            Pokédex
          </Text>
        )}
        renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
      />

      {isLoading && <ActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
