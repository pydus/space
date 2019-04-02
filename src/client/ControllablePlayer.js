import Player from './Player'
import Controller from './engine/Controller'

export default args => {
  const { x, y, rad, mass, ...rest } = args

  const player = Player({ x, y, rad, mass, color: '#ea8', ...rest })

  const getCommand = key => {
    switch (key) {
      case 'w':
      case 'arrowup':
        return 'up'
      case 'a':
      case 'arrowleft':
        return 'left'
      case 's':
      case 'arrowdown':
        return 'down'
      case 'd':
      case 'arrowright':
        return 'right'
      case ' ':
        return 'enter'
      default:
        return ''
    }
  }

  const runCommand = (command, isKeyDown) => {
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

  const controller = Controller({ getCommand, runCommand })

  return Object.assign(player, controller)
}
