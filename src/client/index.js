import SpaceGame from './SpaceGame'
import Space from './Space'
import Planet from './Planet'
import Player from './ControllablePlayer'
import CollisionHandler from './CollisionHandler'
import Camera from './engine/Camera'
import CameraController from './CameraController'

function run() {
  const space = Space()
  const collisionHandler = CollisionHandler({ world: space })

  const planet = Planet({ x: 1024/2, y: 720/2, rad: 300 })
  const planet2 = Planet({ x: 1100, y: 400, rad: 100, mass: 200 })
  const player = Player({ x: 700, y: 550 })

  const camera = Camera({ width: 1500 })
  const cameraController = CameraController({ p: player.physics, camera })

  const game = SpaceGame({ width: 5000, height: 5000, camera })

  space.addPlanet(planet)
  space.addPlanet(planet2)
  space.addPlayer(player)

  game.addUpdatable(collisionHandler)
  game.addUpdatable(cameraController)
  game.add(space)
  game.start()
}

run()
