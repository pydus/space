import Loop from './engine/Loop'
import Game from './engine/Game'
import View from './engine/View'

const canvas = document.getElementById('canvas')

function SpaceGame(width, height) {
  const loop = Loop({ updatesPerSecond: 60 })
  const view = View({ canvas, width, height })
  return Game({ loop, view })
}

export default SpaceGame
