import Loop from '../engine/Loop'
import Game from '../engine/Game'
import View from '../engine/View'

const canvas = document.getElementById('canvas')

function SpaceGameClient({ camera }) {
  const loop = Loop({ updatesPerSecond: 60, renders: true })
  const view = View({ canvas, camera, defaultLineWidth: 1.5 })
  return Game({ loop, view })
}

export default SpaceGameClient
