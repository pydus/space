import SpaceGame from './SpaceGame'
import Space from './Space'
import Planet from './Planet'
import Player from './Player'
import KeyHandler from './KeyHandler'
import keys from './keys'

function run() {
  const game = new SpaceGame(1024, 720)
  const space = new Space()
  const planet = new Planet(1024/2, 720/2, 100)
  const player = new Player(700, 350)
  const keyHandler = new KeyHandler(keys, player.runCommand)

  space.addPlanet(planet)
  space.addPlayer(player)
  game.add(space)
  game.start()
}

run()
