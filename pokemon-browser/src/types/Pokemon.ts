export interface PokemonBasic {
  name: string
  url: string
}

export interface PokemonDetail {
  id: number
  name: string
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  types: { type: { name: string } }[]
  stats: { base_stat: number; stat: { name: string } }[]
}
