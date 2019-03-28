import Game from './Game'
import Space from './Space'

function run() {
  const game = new Game()
  const space = new Space()

  game.add(space)
  game.start()
}

run()
