import Team from '../src/index.js'
import Pokedex from 'pokedex-promise-v2'

const P = new Pokedex()

const bulbasaur = await P.getPokemonByName('bulbasaur')
const pokemon = [bulbasaur]
const team = new Team({ pokemon })

console.log(team)