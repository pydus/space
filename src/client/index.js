import SpaceGame from './SpaceGame'
import Space from './Space'
import Planet from './Planet'
import Player from './Player'
import ControllablePlayer from './ControllablePlayer'
import CollisionHandler from './CollisionHandler'
import Camera from './engine/Camera'
import CameraController from './CameraController'
import Spaceship from './Spaceship'

function run() {
  const space = Space({ width: 10000, height: 10000 })
  const collisionHandler = CollisionHandler({ world: space })

  const planet = Planet({ x: 1350, y: 4200, rad: 1500 })
  const planet2 = Planet({ x: 4000, y: 1500, rad: 400 })
  const player = ControllablePlayer({ x: 3000, y: 2000 })

  const spaceship = Spaceship({ x: 3000, y: 2000 })
  const spaceship2 = Spaceship({ x: 3100, y: 2000 })

  const pla = Player({ x: 1600, y: 1100, rad: 20 })
  const pla2 = Player({ x: 1600, y: 1100, rad: 20 })
  const pla3 = Player({ x: 1600, y: 1100, rad: 20 })
  const pla4 = Player({ x: 1600, y: 1100, rad: 20 })

  const camera = Camera({ height: 1000 })
  const cameraController = CameraController({ p: player.physics, camera })

  const game = SpaceGame({ camera })

  spaceship.addPassenger(pla)
  spaceship.addPassenger(pla2)
  spaceship.addPassenger(pla3)
  spaceship.addPassenger(pla4)

  space.addPlanet(planet)
  space.addPlanet(planet2)

  space.addPlayer(player)
  space.addPlayer(pla)
  space.addPlayer(pla2)
  space.addPlayer(pla3)
  space.addPlayer(pla4)

  space.addSpaceship(spaceship)
  space.addSpaceship(spaceship2)

  game.addUpdatable(collisionHandler)
  game.addUpdatable(cameraController)
  game.add(space)
  game.start()
}

run()
