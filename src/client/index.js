import SpaceGame from './SpaceGame'
import Space from './Space'
import Planet from './Planet'
import Player from './Player'

function run() {
  const game = new SpaceGame(1024, 720)
  const space = new Space()

  const planet = new Planet(1024/2, 720/2, 100)
  space.addPlanet(planet)

  const player = new Player(700, 350)
  space.addPlayer(player)

  game.add(space)
  game.start()
}

run()
