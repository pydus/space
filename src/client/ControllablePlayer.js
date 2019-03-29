import Player from './Player'
import Controller from './Controller'
import VelocityHandler from './VelocityHandler'
import keys from './keys'

export default args => {
  const velocityHandler = VelocityHandler({ acc: 0.1, dec: 0.1 })
  const player = Player({ velocityHandler, ...args })

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

  return Object.assign(player, controller)
}
