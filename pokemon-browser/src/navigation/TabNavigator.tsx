import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonListScreen from '../screens/PokemonListScreen';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { BrowseStackParamList, RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<BrowseStackParamList>();

function BrowseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PokemonList" component={PokemonListScreen} options={{ title: 'Browse' }} />
      <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Browse" component={BrowseStack} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
