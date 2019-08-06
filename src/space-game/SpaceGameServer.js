import Loop from '../engine/Loop'
import Game from '../engine/Game'

function SpaceGameServer() {
  const loop = Loop({ updatesPerSecond: 60, renders: false })
  return Game({ loop })
}

export default SpaceGameServer
