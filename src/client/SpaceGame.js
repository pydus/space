import Loop from './engine/Loop'
import Game from './engine/Game'
import View from './engine/View'

const canvas = document.getElementById('canvas')

function SpaceGame({ camera }) {
  const loop = Loop({ updatesPerSecond: 60 })
  const view = View({ canvas, camera })
  return Game({ loop, view })
}

export default SpaceGame
