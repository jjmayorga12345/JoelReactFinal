import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState, useCallback } from 'react'

const KEY = 'favorites'

export default function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  const load = useCallback(async () => {
    const raw = await AsyncStorage.getItem(KEY)
    setFavorites(raw ? JSON.parse(raw) : [])
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function toggleFavorite(id: string) {
    const exists = favorites.includes(id)
    const updated = exists ? favorites.filter(x => x !== id) : [...favorites, id]
    setFavorites(updated)
    await AsyncStorage.setItem(KEY, JSON.stringify(updated))
  }

  function isFavorite(id: string) {
    return favorites.includes(id)
  }

  return { favorites, toggleFavorite, isFavorite, reloadFavorites: load }
}
