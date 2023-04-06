# 🏗️ poketeam

Poketeam helps you with logic for building Pokémon teams in your projects & applications.  
> Poketeam uses [PokeAPI](https://pokeapi.co/) via
[`pokedex-promise-v2`](https://github.com/PokeAPI/pokedex-promise-v2) as a dependency for fetching data.

🚧 _Poketeam is currently in development!_

## Install

```bash
> npm install poketeam
```

##### CDN (not yet browser compatible)
- [jsdelivr](https://cdn.jsdelivr.net/npm/poketeam/dist/index.js)
- [jsdelivr (minified)](https://cdn.jsdelivr.net/npm/poketeam/dist/index.min.js)
- [unpkg](https://www.unpkg.com/poketeam)
- [esm.sh](https://esm.sh/poketeam)

## Usage

```js
import Team from 'poketeam'

// Initialization
const options = {
  name: 'Team Rocket', // Team name
  pokemon: [],         // Initial list of Pokemon
  capacity: 3,         // Team capacity
}
const team = new Team(options)

// Add a Pokemon to your team (async via PokeAPI)
const bulbasaur = await team.push('bulbasaur')

// Set a new team
await team.set(['bulbasaur', 'charmander', 'squirtle'])

// Get the Pokemon at a specified index
team.get(0)

// Get all Pokemon in your team
team.getAll()

// Display your team formatted as a string
console.log(`${team}`)
```

## Coming Soon
- API documentation & sufficient JSDoc 
- Learnset & moveset interactivity
- Stats, levels, abilities, etc.
- Data & image getters for easy frontend integration
- Build optimization
- Custom usage support w/ warnings
- Browser support
  - Idea 1: Via removing dependencies

## Author
Adory Vo ([GitHub](https://github.com/AdoryVo))