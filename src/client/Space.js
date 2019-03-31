import { getDistance } from './engine/tools'

export default () => ({
  planets: [],
  players: [],
  spaceships: [],

  addPlanet: function(planet) {
    this.planets.push(planet)
  },

  addPlayer: function(player) {
    this.players.push(player)
  },

  addSpaceship: function(spaceship) {
    this.spaceships.push(spaceship)
  },

  handleEntries: function() {
    this.players.forEach(player => {
      if (player.isEntering) {
        const p = player.physics
        this.spaceships.forEach(spaceship => {
          if (getDistance(p, spaceship.physics) < spaceship.enterDistance) {
            if (!player.isInside && spaceship.addDriver(p)) {
              player.enter()
            } else if (player.isInside && spaceship.removeDriver(p)) {
              player.exit()
            }
          }
        })
      }
    })
  },

  handleGravity: function() {
    this.planets.forEach(planet => {
      this.players.forEach(player => {
        planet.physics.attract(player.physics)
      })
      this.spaceships.forEach(spaceship => {
        planet.physics.attract(spaceship.physics)
      })
    })
  },

  runOriginFinders: function() {
    this.players.forEach(player => {
      const originFinder = player.physics.controlSystem.originFinder
      if (originFinder) {
        const planets = this.planets.map(planet => planet.physics)
        originFinder.run.call(player.physics, planets)
      }
    })
  },

  update: function() {
    this.planets.forEach(planet => planet.update())
    this.players.forEach(player => player.update())
    this.spaceships.forEach(spaceship => spaceship.update())
    this.handleEntries()
    this.handleGravity()
    this.runOriginFinders()
  },

  render: function(view) {
    this.planets.forEach(planet => planet.render(view))
    this.players.forEach(player => player.render(view))
    this.spaceships.forEach(spaceship => spaceship.render(view))
  }
})
