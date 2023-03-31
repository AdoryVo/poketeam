import {describe, expect, test} from '@jest/globals'
import Team from '../src/index'

describe('team constructor', () => {
  test('name is set correctly', () => {
    const name = 'Team 10'
    const team = new Team(name)
    
    expect(team.name).toBe(name)
  })
})