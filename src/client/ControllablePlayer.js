import Player from './Player'
import Controller from './Controller'
import keys from './keys'

export default args =>  {
  const player = Player(args)

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
