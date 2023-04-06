import PokeAPI from 'pokedex-promise-v2'
import Team, { basic, getPokemon } from 'poketeam'

// Initialization
const options = {
  name: 'Team Rocket', // Team name
  pokemon: [], // Initial list of Pokemon
  capacity: 3 // Team capacity
}
const team = new Team(options)

// Add a Pokemon to your team (async via PokeAPI)
const bulbasaur: PokeAPI.Pokemon = await team.push('bulbasaur')

// Set a new team
await team.set(['bulbasaur', 'charmander', 'squirtle'])

// Get the Pokemon at a specified index
team.get(0)

// Get all Pokemon in your team
team.getAll()

// Find pokemon by name, id, or Pokemon
team.find('bulbasaur')
team.find(1)
team.find(bulbasaur)

// View and edit your team with methods
team.has('bulbasaur')
team.indexOf('bulbasaur')
team.isFull()
team.delete('bulbasaur')
await team.fill('bulbasaur')
team.clear()
// And more!

// Use utility functions for further logic
const mudkip = await getPokemon('mudkip')
console.log(basic(mudkip))

// Display your team formatted as a string
console.log(`${team}`)
