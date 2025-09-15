import { useEffect, useState } from 'react'
import axios from 'axios'
import { PokemonBasic } from '../types/Pokemon'

export default function usePokemonList() {
  const [data, setData] = useState<PokemonBasic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=120&offset=0')
      .then((res) => setData(res.data.results))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}
