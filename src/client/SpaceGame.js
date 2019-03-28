import Loop from './Loop'
import Game from './Game'
import View from './View'

const canvas = document.getElementById('canvas')

function SpaceGame() {
  const loop = new Loop()
  const view = new View(canvas)
  return new Game(loop, view)
}

export default SpaceGame
