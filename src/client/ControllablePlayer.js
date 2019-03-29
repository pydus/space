import Player from './Player'
import Controller from './Controller'
import Velocity from './Velocity'
import Physics from './Physics'
import keys from './keys'

export default args => {
  const velocity = Velocity({ acc: 0.1, dec: 0.1 })
  const physics = Physics({ velocity })
  const player = Player({ physics, ...args })

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
