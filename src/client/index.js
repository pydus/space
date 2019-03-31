import SpaceGame from './SpaceGame'
import Space from './Space'
import Planet from './Planet'
import Player from './ControllablePlayer'
import CollisionHandler from './CollisionHandler'
import Camera from './engine/Camera'
import CameraController from './CameraController'
import Spaceship from './Spaceship'

function run() {
  const space = Space()
  const collisionHandler = CollisionHandler({ world: space })

  const planet = Planet({ x: 500, y: 720, rad: 1000, mass: 1000 })
  const planet2 = Planet({ x: 4000, y: -800, rad: 400, mass: 400 })
  const player = Player({ x: 1700, y: 550 })
  const spaceship = Spaceship({ x: 1600, y: 400 })

  const camera = Camera({ width: 2000 })
  const cameraController = CameraController({ p: player.physics, camera })

  const game = SpaceGame({ width: 10000, height: 10000, camera })

  space.addPlanet(planet)
  space.addPlanet(planet2)
  space.addPlayer(player)
  space.addSpaceship(spaceship)

  game.addUpdatable(collisionHandler)
  game.addUpdatable(cameraController)
  game.add(space)
  game.start()
}

run()
