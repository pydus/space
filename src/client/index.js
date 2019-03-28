import SpaceGame from './SpaceGame'
import Space from './Space'
import Planet from './Planet'

function run() {
  const game = new SpaceGame(1024, 720)
  const space = new Space()

  const planet = new Planet(1024/2, 720/2, 20)

  space.add(planet)

  game.add(space)
  game.start()
}

run()
