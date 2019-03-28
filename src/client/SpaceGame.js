import Loop from './Loop'
import Game from './Game'

function SpaceGame() {
  const loop = new Loop()
  return new Game(loop)
}

export default SpaceGame
