import capitalize from 'lodash/capitalize.js'
import Pokedex, { type Pokemon } from 'pokedex-promise-v2'

import type { PokemonIdentifier } from './types.js'

const P = new Pokedex()

export function basic(pokemon: Pokemon) {
  const { id, name } = pokemon

  return `${capitalize(name)} #${id}`
}

export async function getPokemon(identifier: PokemonIdentifier) {
  if (typeof identifier === 'string' || typeof identifier === 'number') {
    const pokemon = await P.getPokemonByName(identifier).catch((error) => {
      throw new Error('Error occurred getting Pokemon: ', error)
    })

    return pokemon
  } else {
    return identifier
  }
}
