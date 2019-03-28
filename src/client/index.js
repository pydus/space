import SpaceGame from './SpaceGame'
import Space from './Space'
import Planet from './Planet'

function run() {
  const game = new SpaceGame()
  const space = new Space()

  const planet = new Planet(500, 500, 1000)

  space.add(planet)

  game.add(space)
  game.start()
}

run()
