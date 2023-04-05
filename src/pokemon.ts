import capitalize from 'lodash/capitalize.js'
import type { Pokemon } from 'pokedex-promise-v2'

export function basic(pokemon: Pokemon) {
  const { id, name } = pokemon

  return `${capitalize(name)} #${id}`
}
