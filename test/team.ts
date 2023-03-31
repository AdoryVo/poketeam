import test from 'ava'
import Team from '../src/index.js'
import bulbasaur from './data/bulbasaur.json' assert { type: 'json' }

test('name is set correctly', t => {
  const name = 'Team 10'
  const team = new Team({ name })
    
  t.is(team.name, name)
})

test('pokemon are set correctly', async t => {
  const pokemon = [bulbasaur]
  const team = new Team({ pokemon })
  
  t.is(team.pokemon, pokemon)
})

test('capacity is set correctly', async t => {
  const capacity = 3
  const team = new Team({ capacity })
    
  t.is(team.capacity, capacity)
})