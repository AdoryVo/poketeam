import test from 'ava'

import Team from '../src/index.js'

import bulbasaur from './data/bulbasaur.js'

test('defaults are set correctly', (t) => {
  const team = new Team()

  t.is(team.name, '')
  t.deepEqual(team.pokemon, [null, null, null, null, null, null])
  t.is(team.capacity, Team.DEFAULT_TEAM_SIZE)
})

test('name is set correctly', (t) => {
  const name = 'Team 10'
  const team = new Team({ name })

  t.is(team.name, name)
})

test('pokemon are set correctly', (t) => {
  const pokemon = [bulbasaur]
  const team = new Team({ pokemon })

  t.deepEqual(team.pokemon, [bulbasaur, null, null, null, null, null])
})

test('capacity is set correctly', (t) => {
  const capacities = [3, 7]
  capacities.forEach((capacity) => {
    const team = new Team({ capacity })

    t.is(team.capacity, capacity)
  })
})

test('capacity must be a positive integer', (t) => {
  const capacity = 0

  const error = t.throws(() => {
    new Team({ capacity })
  })

  t.assert(error)
})

test('capacity cannot be less than size of specified team', (t) => {
  const capacity = 1
  const pokemon = [bulbasaur, bulbasaur]

  const error = t.throws(() => {
    new Team({ pokemon, capacity })
  })

  t.assert(error)
})
