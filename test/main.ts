// AVA
// https://github.com/avajs/ava/blob/main/docs/01-writing-tests.md
// https://github.com/avajs/ava/blob/main/docs/03-assertions.md

import test from 'ava'

import Team from '../src/index.js'

import bulbasaur from './data/bulbasaur.js'

const pokemon = [bulbasaur]

test('clear()', (t) => {
  const team = new Team({ pokemon })

  team.clear()

  t.true(team.isEmpty())
})

test('delete()', (t) => {
  const team = new Team({ pokemon })

  t.true(team.delete('bulbasaur'))
})

test('delete(): pokemon not in team', (t) => {
  const team = new Team()

  t.false(team.delete('bulbasaur'))
})

test('fill()', async (t) => {
  const team = new Team()

  await team.fill(bulbasaur)

  t.deepEqual(team.pokemon, new Array(Team.DEFAULT_TEAM_SIZE).fill(bulbasaur))
})

test('find()', (t) => {
  const team = new Team({ pokemon })

  const bulbasaur = team.find('bulbasaur')

  t.assert(bulbasaur?.name, 'bulbasaur')
})

test('find(): pokemon not in team', (t) => {
  const team = new Team()

  t.is(team.find('bulbasaur'), undefined)
})

test('has()', (t) => {
  const team = new Team({ pokemon })

  t.true(team.has('bulbasaur'))
})

test('has(): pokemon not in team', (t) => {
  const team = new Team()

  t.false(team.has('bulbasaur'))
})

test('get()', (t) => {
  const team = new Team({ pokemon })

  t.is(team.get(0)?.name, 'bulbasaur')
})

test('getAll()', (t) => {
  const team = new Team({ pokemon })

  t.deepEqual(team.getAll(), pokemon)
})

test('indexOf(): string', (t) => {
  const team = new Team({ pokemon })

  t.is(team.indexOf('bulbasaur'), 0)
})

test('indexOf(): number', (t) => {
  const team = new Team({ pokemon })

  t.is(team.indexOf(1), 0)
})

test('indexOf(): pokemon', (t) => {
  const team = new Team({ pokemon })

  t.is(team.indexOf(bulbasaur), 0)
})

test('indexOf(): custom identifier / null', (t) => {
  const team = new Team()

  t.is(team.indexOf(null), 0)
})

test('indexOf(): pokemon not in team', (t) => {
  const team = new Team()

  t.is(team.indexOf('bulbasaur'), -1)
})

test('isFull()', (t) => {
  const options = {
    pokemon,
    capacity: 1
  }
  const team = new Team(options)

  t.true(team.isFull())
})

test('isFull(): team not full', (t) => {
  const team = new Team({ pokemon })

  t.false(team.isFull())
})

test('pop()', (t) => {
  const team = new Team({ pokemon })

  const bulbasaur = team.pop()

  t.is(bulbasaur?.name, 'bulbasaur')
})

test('pop(): cannot pop from an empty team', (t) => {
  const team = new Team()

  const error = t.throws(() => {
    team.pop()
  })

  t.assert(error)
})

test('push()', async (t) => {
  const team = new Team()

  await team.push(bulbasaur)

  t.is(team.get(0)?.name, 'bulbasaur')
})

test('push(): cannot push to a full team', async (t) => {
  const options = {
    pokemon,
    capacity: 1
  }
  const team = new Team(options)

  const error = await t.throwsAsync(team.push('bulbasaur'))

  t.assert(error)
})

test('set(): by identifiers', async (t) => {
  const team = new Team()

  await team.set(pokemon)

  t.is(team.get(0)?.name, 'bulbasaur')
  t.is(team.capacity, 1)
})

test('set(): by index', async (t) => {
  const team = new Team()

  await team.set(0, bulbasaur)

  t.is(team.get(0)?.name, 'bulbasaur')
})

test('set(): index out of bounds', async (t) => {
  const indices = [-1, Team.DEFAULT_TEAM_SIZE]
  for (const index of indices) {
    const team = new Team()

    const error = await t.throwsAsync(team.set(index, bulbasaur))

    t.assert(error)
  }
})

test('toString()', (t) => {
  const team = new Team({ pokemon })

  t.assert(team.toString())
})
