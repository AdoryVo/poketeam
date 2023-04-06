import test from 'ava'

import { getPokemon } from '../src/index.js'

import bulbasaur from './data/bulbasaur.js'

test('getPokemon(): name', async (t) => {
  const pokemon = await getPokemon('bulbasaur')
  t.is(pokemon.name, 'bulbasaur')
})

test('getPokemon(): id', async (t) => {
  const pokemon = await getPokemon(1)
  t.is(pokemon.name, 'bulbasaur')
})

test('getPokemon(): pokemon', async (t) => {
  const pokemon = await getPokemon(bulbasaur)
  t.is(pokemon.name, 'bulbasaur')
})

test('getPokemon(): invalid identifier', async (t) => {
  const error = await t.throwsAsync(getPokemon('missingno'))
  t.assert(error)
})
