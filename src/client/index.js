import SpaceGame from './SpaceGame'
import Space from './Space'
import Planet from './Planet'
import Player from './Player'
import KeyHandler from './KeyHandler'
import keys from './keys'
import CollisionHandler from './CollisionHandler'

function run() {
  const game = new SpaceGame(1024, 720)
  const space = new Space()
  const collisionHandler = new CollisionHandler(space)
  const planet = new Planet(1024/2, 720/2, 150)
  const player = new Player(700, 550)
  const keyHandler = new KeyHandler(keys, player.runCommand)

  space.addPlanet(planet)
  space.addPlayer(player)
  game.setCollisionHandler(collisionHandler)
  game.add(space)
  game.start()
}

run()
