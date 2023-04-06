import { type Pokemon } from 'pokedex-promise-v2'

export interface TeamOptions {
  name?: string
  pokemon?: Array<Pokemon | null>
  capacity?: number
}

export type PokemonIdentifier = number | string | Pokemon
