import SpaceGame from './SpaceGame'
import Space from './Space'
import Planet from './Planet'
import Player from './ControllablePlayer'
import CollisionHandler from './CollisionHandler'

function run() {
  const game = SpaceGame(1024, 720)
  const space = Space()
  const collisionHandler = CollisionHandler({ world: space })
  const planet = Planet({ x: 1024/2, y: 720/2, rad: 150 })
  const player = Player({ x: 700, y: 550 })

  space.addPlanet(planet)
  space.addPlayer(player)
  game.setCollisionHandler(collisionHandler)
  game.add(space)
  game.start()
}

run()
