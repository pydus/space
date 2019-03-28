import Game from './Game'
import Space from './Space'
import Planet from './Planet'

function run() {
  const game = new Game()
  const space = new Space()

  const planet = new Planet(500, 500, 1000)

  space.add(planet)

  game.add(space)
  game.start()
}

run()
