import Player from './Player'
import Controller from './Controller'
import PlayerPhysics from './PlayerPhysics'
import keys from './keys'

export default args => {
  const { x, y, radius, ...rest } = args

  const physics = PlayerPhysics({ x, y, radius })
  const player = Player({ physics, ...rest })

  const mapFunction = (command, isKeyDown) => {
    switch (command) {
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        player.controlMovement(command, isKeyDown)
        break
      default:
    }
  }

  const controller = Controller({ keys, mapFunction })

  return Object.assign({}, player, controller)
}
