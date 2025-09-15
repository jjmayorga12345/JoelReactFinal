import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import * as Haptics from 'expo-haptics'
import useFavorites from '../hooks/useFavorites'

type Poke = {
  id: number
  name: string
  sprites: { other: { ['official-artwork']: { front_default: string } } }
  types: { type: { name: string } }[]
  stats: { base_stat: number; stat: { name: string } }[]
}

export default function PokemonDetailScreen({ route }: any) {
  const id: string = route.params.id
  const { isFavorite, toggleFavorite } = useFavorites()
  const [data, setData] = useState<Poke | null>(null)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null))
  }, [id])

  if (!data) return <View style={{ flex: 1 }} />

  const img = data.sprites.other['official-artwork'].front_default
  const fav = isFavorite(id)

  const onToggle = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    await toggleFavorite(id)
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Image source={{ uri: img }} style={{ width: 220, height: 220, alignSelf: 'center' }} />
      <Text style={{ fontSize: 28, fontWeight: '700', textAlign: 'center', marginVertical: 8 }}>
        {data.name}
      </Text>

      <Pressable
        onPress={onToggle}
        style={{
          alignSelf: 'center',
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 999,
          backgroundColor: fav ? '#ef5350' : '#e0e0e0',
          marginBottom: 16,
        }}
      >
        <Text style={{ color: fav ? 'white' : 'black', fontWeight: '700' }}>
          {fav ? 'Favorited' : 'Add to Favorites'}
        </Text>
      </Pressable>

      <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 6 }}>Types</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
        {data.types.map((t) => (
          <Text key={t.type.name} style={{ marginRight: 10 }}>
            {t.type.name}
          </Text>
        ))}
      </View>

      <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 6 }}>Base stats</Text>
      {data.stats.map((s) => (
        <View key={s.stat.name} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>{s.stat.name}</Text>
          <Text>{s.base_stat}</Text>
        </View>
      ))}
    </ScrollView>
  )
}
