import { NavigatorScreenParams } from '@react-navigation/native';

export type BrowseStackParamList = {
  PokemonList: undefined;
  PokemonDetail: { id: string };
};

export type RootTabParamList = {
  Browse: NavigatorScreenParams<BrowseStackParamList>;
  Favorites: undefined;
};
