import Player from './Player'
import Controller from './engine/Controller'
import PlayerPhysics from './PlayerPhysics'

const keys = {
  'w': 'up',
  's': 'down',
  'a': 'left',
  'd': 'right',
  'arrowup': 'up',
  'arrowdown': 'down',
  'arrowleft': 'left',
  'arrowright': 'right',
  ' ': 'enter'
}

export default args => {
  const { x, y, rad, mass, ...rest } = args

  const physics = PlayerPhysics({ x, y, rad, mass })
  const player = Player({ physics, ...rest })

  const mapFunction = (command, isKeyDown) => {
    switch (command) {
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        player.controlMovement(command, isKeyDown)
        break
      case 'enter':
        player.setIsEntering(isKeyDown)
      default:
    }
  }

  const controller = Controller({ keys, mapFunction })

  return Object.assign(player, controller)
}
