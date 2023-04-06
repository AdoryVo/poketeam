// Ava
// https://github.com/avajs/ava/blob/main/docs/01-writing-tests.md
// https://github.com/avajs/ava/blob/main/docs/03-assertions.md

import test from 'ava'
import Team from '../src/index.js'
import bulbasaur from './data/bulbasaur.json' assert { type: 'json' }

test('push()', async (t) => {
  const team = new Team()

  await team.push('bulbasaur')

  t.is(team.get(0)?.name, 'bulbasaur')
})

test('push(): cannot add a nonexistent Pokemon', async (t) => {
  const team = new Team()

  const error = await t.throwsAsync(team.push('missingno'))

  t.assert(error)
})

test('push(): cannot add to a full team', async (t) => {
  const options = {
    pokemon: [bulbasaur],
    capacity: 1
  }
  const team = new Team(options)

  const error = await t.throwsAsync(team.push('bulbasaur'))

  t.assert(error)
})

test('get()', (t) => {
  const pokemon = [bulbasaur]
  const team = new Team({ pokemon })

  t.is(team.get(0)?.name, 'bulbasaur')
})

test('getAll()', (t) => {
  const pokemon = [bulbasaur]
  const team = new Team({ pokemon })

  t.deepEqual(team.getAll(), pokemon)
})

test('toString()', (t) => {
  const pokemon = [bulbasaur]
  const team = new Team({ pokemon })

  t.assert(team.toString())
})
