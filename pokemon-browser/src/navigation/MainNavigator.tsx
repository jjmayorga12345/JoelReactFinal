import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PokemonListScreen from '../screens/PokemonListScreen'
import PokemonDetailScreen from '../screens/PokemonDetailScreen'
import FavoritesScreen from '../screens/FavoritesScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function BrowserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PokemonList" component={PokemonListScreen} />
      <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} />
    </Stack.Navigator>
  )
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Browse" component={BrowserStack} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
