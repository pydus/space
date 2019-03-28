import Loop from './Loop'
import Game from './Game'

const canvas = document.getElementById('canvas')

function SpaceGame() {
  const loop = new Loop()
  return new Game(loop, canvas)
}

export default SpaceGame
