// Ava
// https://github.com/avajs/ava/blob/main/docs/01-writing-tests.md
// https://github.com/avajs/ava/blob/main/docs/03-assertions.md

import test from 'ava'
import Team from '../src/index.js'
import bulbasaur from './data/bulbasaur.json' assert { type: 'json' }

test('get()', (t) => {
  const pokemon = [bulbasaur]
  const team = new Team({ pokemon })

  t.deepEqual(team.get(), pokemon)
})

test('toString()', (t) => {
  const pokemon = [bulbasaur]
  const team = new Team({ pokemon })

  console.log(team.toString())

  t.assert(team.toString())
})
