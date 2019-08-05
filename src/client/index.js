import SpaceGameClient from '../space-game/SpaceGameClient'
import Space from '../space-game/Space'
import Player from '../space-game/Player'
import ControllablePlayer from '../space-game/ControllablePlayer'
import CollisionHandler from '../space-game/CollisionHandler'
import Camera from '../engine/Camera'
import CameraController from '../space-game/CameraController'
import Spaceship from '../space-game/Spaceship'
import Mineral from '../space-game/Mineral'

function run() {
  const space = Space({ width: 25000, height: 25000 })
  const collisionHandler = CollisionHandler({ world: space })

  const player = ControllablePlayer({ x: 10000, y: 7900 })

  const spaceship = Spaceship({ x: 3500, y: 1600 })
  const spaceship2 = Spaceship({ x: 3100, y: 2000 })

  const pla = Player({ x: 1600, y: 1100, rad: 20 })
  const pla2 = Player({ x: 1600, y: 1100, rad: 20 })
  const pla3 = Player({ x: 1600, y: 1100, rad: 20 })
  const pla4 = Player({ x: 1600, y: 1100, rad: 20 })

  const camera = Camera({ height: 1000 })
  const cameraController = CameraController({ p: player.physics, camera })

  const game = SpaceGameClient({ camera })

  spaceship.addPassenger(pla)
  spaceship.addPassenger(pla2)
  spaceship.addPassenger(pla3)
  spaceship.addPassenger(pla4)

  space.generatePlanets(250, 2000)

  space.addPlayer(player)
  space.addPlayer(pla)
  space.addPlayer(pla2)
  space.addPlayer(pla3)
  space.addPlayer(pla4)

  space.addSpaceship(spaceship)
  space.addSpaceship(spaceship2)

  for (let i = 0; i < 300; i++) spaceship.mineralCarrier.add(Mineral({}))
  for (let i = 0; i < 20; i++) spaceship2.mineralCarrier.add(Mineral({}))

  game.addUpdatable(collisionHandler)
  game.addUpdatable(cameraController)
  game.add(space)
  game.start()
}

run()
