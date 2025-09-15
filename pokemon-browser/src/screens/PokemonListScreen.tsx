import React, { useState } from 'react'
import { TextInput, View } from 'react-native'
import usePokemonList from '../hooks/usePokemonList'
import PokemonGridItem from '../components/PokemonGridItem'
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated'

export default function PokemonListScreen() {
  const { data } = usePokemonList()
  const [query, setQuery] = useState('')

  const filtered = data.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  const scrollY = useSharedValue(0)
  const isScrolling = useSharedValue(0)

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y
    },
    onBeginDrag: () => {
      isScrolling.value = 1
    },
    onEndDrag: () => {
      isScrolling.value = 0
    },
    onMomentumBegin: () => {
      isScrolling.value = 1
    },
    onMomentumEnd: () => {
      isScrolling.value = 0
    },
  })

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Search Pokémon..."
        value={query}
        onChangeText={setQuery}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 8,
          marginBottom: 10,
        }}
      />

      <Animated.FlatList
        data={filtered}
        keyExtractor={(item) => item.name}
        numColumns={3}
        contentContainerStyle={{ alignItems: 'center' }}
        columnWrapperStyle={{ justifyContent: 'center' }}
        renderItem={({ item, index }) => {
          const id = item.url.split('/')[6]
          return (
            <PokemonGridItem
              id={id}
              name={item.name}
              index={index}
              scrollY={scrollY}
              isScrolling={isScrolling}
            />
          )
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
