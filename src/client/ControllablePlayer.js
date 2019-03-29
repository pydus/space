import Player from './Player'
import KeyHandler from './KeyHandler'
import keys from './keys'

export default args =>  {
  const player = Player(args)

  const keyHandler = KeyHandler({
    keys,
    listener: player.runCommand.bind(player)
  })

  return player
}
