import Player from './Player'
import Controller from './engine/Controller'

export default args => {
  const { x, y, rad, mass, ...rest } = args

  const player = Player({ x, y, rad, mass, color: '#eb5e28', ...rest })

  const getCommand = key => {
    switch (key) {
      case 's':
      case 'arrowdown':
        return 'enter drill'
      case 'a':
      case 'arrowleft':
        return 'left'
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
      case 'left':
      case 'right':
        player.controlMovement(command, isKeyDown)
        break
      case 'enter drill':
        player.enterDrill()
        break
      case 'enter':
        player.setIsEntering(isKeyDown)
        break
      default:
    }
  }

  const controller = Controller({ getCommand, runCommand })

  player.setController(controller)

  return Object.assign(player, controller)
}
