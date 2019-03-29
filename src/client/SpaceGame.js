import Loop from './Loop'
import Game from './Game'
import View from './View'

const canvas = document.getElementById('canvas')

function SpaceGame(width, height) {
  const loop = Loop({ updatesPerSecond: 60 })
  const view = View({ canvas, width, height })
  return Game({ loop, view })
}

export default SpaceGame
