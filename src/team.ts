import { type Pokemon } from 'pokedex-promise-v2'

import type { PokemonIdentifier, TeamOptions } from './types.js'
import { basic, getPokemon } from './utils.js'

class Team {
  static DEFAULT_TEAM_SIZE = 6

  name: string
  pokemon: Array<Pokemon | null>

  constructor(options: TeamOptions = {}) {
    this.name = options.name ?? ''
    this.pokemon =
      options.pokemon?.slice(0) ?? new Array(Team.DEFAULT_TEAM_SIZE).fill(null)

    const capacity = options.capacity ?? Team.DEFAULT_TEAM_SIZE

    // Validate: Capacity must be a positive integer
    if (Number.isSafeInteger(capacity) && capacity > 0) {
      // Validate: Capacity cannot be less than size of specified team
      if (capacity < this.occupancy) {
        throw new Error('Capacity cannot be less than team size')
      }

      // Fill team slots to match capacity
      while (this.capacity < capacity) {
        this.pokemon.push(null)
      }

      // Shrink team slots to match capacity
      while (this.capacity > capacity) {
        this.pokemon.splice(this.pokemon.indexOf(null), 1)
      }
    } else {
      throw new Error('Capacity must be a positive integer')
    }
  }

  get occupancy() {
    let pokemonCount = 0
    const capacity = this.capacity
    for (let i = 0; i < capacity; i++) {
      if (this.pokemon[i] !== null) {
        pokemonCount++
      }
    }

    return pokemonCount
  }

  get capacity() {
    return this.pokemon.length
  }

  clear() {
    this.pokemon = this.pokemon.fill(null)
  }

  delete(identifier: PokemonIdentifier) {
    const indexOfPokemon = this.indexOf(identifier)

    if (indexOfPokemon === -1) {
      return false
    } else {
      this.pokemon[indexOfPokemon] = null
      return true
    }
  }

  async fill(identifier: PokemonIdentifier, start = 0, end = this.capacity) {
    const pokemon = await getPokemon(identifier)

    this.pokemon = this.pokemon.fill(pokemon, start, end)
  }

  find(identifier: PokemonIdentifier): Pokemon | null | undefined {
    return this.pokemon[this.indexOf(identifier)]
  }

  get(index: number): Pokemon | null | undefined {
    return this.pokemon[index]
  }

  getAll() {
    return this.pokemon.filter((slot) => slot !== null)
  }

  has(identifier: PokemonIdentifier) {
    return this.indexOf(identifier) !== -1
  }

  indexOf(identifier: PokemonIdentifier | null) {
    if (typeof identifier === 'string') {
      return this.pokemon.findIndex((pokemon) => pokemon?.name === identifier)
    } else if (typeof identifier === 'number') {
      return this.pokemon.findIndex((pokemon) => pokemon?.id === identifier)
    } else if (identifier?.name) {
      return this.pokemon.findIndex(
        (pokemon) => pokemon?.name === identifier.name
      )
    } else {
      return this.pokemon.findIndex((pokemon) => pokemon === identifier)
    }
  }

  isEmpty() {
    return this.pokemon.every((pokemon) => pokemon === null)
  }

  isFull() {
    return this.pokemon.indexOf(null) === -1
  }

  pop() {
    const lastPokemonSlot = this.pokemon.findLastIndex(
      (pokemon) => pokemon !== null
    )
    if (lastPokemonSlot === -1) {
      throw new Error('Cannot pop from an empty team')
    }

    const removed = this.pokemon[lastPokemonSlot]
    this.pokemon[lastPokemonSlot] = null
    return removed
  }

  async push(identifier: PokemonIdentifier) {
    const emptySlot = this.pokemon.indexOf(null)
    if (emptySlot === -1) {
      throw new Error('Cannot push to a full team')
    }

    const pokemon = await getPokemon(identifier)
    this.pokemon[emptySlot] = pokemon
    return pokemon
  }

  async set(identifiers: PokemonIdentifier[]): Promise<void>
  async set(index: number, identifier: PokemonIdentifier): Promise<void>
  async set(
    ...args: [PokemonIdentifier[]] | [number, PokemonIdentifier]
  ): Promise<void> {
    if (args.length === 1) {
      const [identifiers] = args

      this.pokemon = await Promise.all(
        identifiers.map(async (identifier) => await getPokemon(identifier))
      )
    } else {
      const [index, identifier] = args

      if (index < 0 || index >= this.pokemon.length) {
        throw new Error('Index out of bounds')
      }

      const pokemon = await getPokemon(identifier)
      this.pokemon[index] = pokemon
    }
  }

  toString() {
    let repr = `${this.name || 'Untitled Team'}\n`

    this.pokemon.forEach((slot, index) => {
      const entity = slot ? basic(slot) : '<empty>'
      repr += `(Slot ${index + 1}): ${entity}\n`
    })

    return repr
  }
}

export default Team
