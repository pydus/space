import SpaceGameServer from '../space-game/SpaceGameServer'
import Space from '../space-game/Space'
import CollisionHandler from '../space-game/CollisionHandler'

function run() {
  const space = Space({ width: 25000, height: 25000 })
  const collisionHandler = CollisionHandler({ world: space })
  const game = SpaceGameServer()

  space.generatePlanets(250, 2000)

  game.addUpdatable(collisionHandler)
  game.add(space)
  game.start()
}

run()
