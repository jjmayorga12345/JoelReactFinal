import React, { useCallback, useState } from 'react'
import {
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import useFavorites from '../hooks/useFavorites'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

export default function FavoritesScreen() {
  const { favorites, reloadFavorites } = useFavorites()
  const navigation = useNavigation<any>()
  const [items, setItems] = useState<{ id: string; name: string; image: string }[]>([])

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        await reloadFavorites()
        const out: { id: string; name: string; image: string }[] = []
        for (const id of favorites) {
          try {
            const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const d = await r.json()
            out.push({
              id,
              name: d.name,
              image: d.sprites?.other?.['official-artwork']?.front_default,
            })
          } catch {}
        }
        setItems(out)
      }
      load()
    }, [favorites, reloadFavorites])
  )

  const openDetail = (id: string) => {
    navigation.navigate('Browse', { screen: 'PokemonDetail', params: { id } })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Pressable onPress={() => openDetail(item.id)} style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
  },
  listContainer: { alignItems: 'center', paddingBottom: 16 },
  row: { justifyContent: 'center', width: '100%' },
  item: { margin: 6, alignItems: 'center' },
  image: { width: 100, height: 100 },
  name: { textAlign: 'center', marginTop: 6, textTransform: 'capitalize' },
})
