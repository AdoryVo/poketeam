import type { Pokemon } from 'pokedex-promise-v2'

const DEFAULT_TEAM_SIZE = 6

interface TeamOptions {
  name?: string
  pokemon?: Array<Pokemon|null>
  capacity?: number
}

class Team {
  name: string
  pokemon: Array<Pokemon|null>

  constructor(options?: TeamOptions) {
    this.name = options.name ?? ''
    this.pokemon = options.pokemon ?? new Array(DEFAULT_TEAM_SIZE).fill(null)

    if ('capacity' in options) {
      const { capacity } = options

      // Validate: Capacity must be a positive integer
      if (Number.isSafeInteger(capacity) && capacity > 0) {
        // Validate: Capacity cannot be less than size of specified team
        if (capacity < this.occupancy) {
          throw Error('Capacity cannot be less than team size')
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
        throw Error('Capacity must be a positive integer')
      }
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
}

export default Team