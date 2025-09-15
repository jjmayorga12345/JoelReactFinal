import React, { useEffect } from 'react'
import { Image, Pressable, Text } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BrowseStackParamList } from '../navigation/types'

type Props = {
  id: string
  name: string
  index: number
  scrollY: any
  isScrolling: any
}

export default function PokemonGridItem({
  id,
  name,
  index,
  scrollY,
  isScrolling,
}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<BrowseStackParamList>>()

  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.9)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 })
    scale.value = withSpring(1, { damping: 10, stiffness: 120 })
  }, [])

  const anim = useAnimatedStyle(() => {
    const phase = index * 0.7
    const shakeDeg = Math.sin(scrollY.value / 24 + phase) * 2 * isScrolling.value
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }, { rotate: `${shakeDeg}deg` }],
    }
  })

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <Pressable
      onPress={() => {
        scale.value = withSpring(0.95, { damping: 10 }, () => {
          scale.value = withSpring(1)
        })
        navigation.navigate('PokemonDetail', { id })
      }}
      style={{ margin: 6 }}
    >
      <Animated.View style={[{ alignItems: 'center' }, anim]}>
        <Image source={{ uri: img }} style={{ width: 100, height: 100 }} />
        <Text style={{ textAlign: 'center', marginTop: 4 }}>{name}</Text>
      </Animated.View>
    </Pressable>
  )
}
