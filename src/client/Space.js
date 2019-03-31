import { getDistance } from './engine/tools'

export default ({ width, height }) => ({
  width,
  height,

  gridColor: '#222',
  gridLineSpacing: 1000,

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
            if (!player.isInside && spaceship.enter(p)) {
              player.enter()
            } else if (player.isInside && spaceship.exit(p)) {
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
      const controlSystem = player.physics.controlSystem
      if (controlSystem) {
        const originFinder = controlSystem.originFinder
        if (originFinder) {
          const planets = this.planets.map(planet => planet.physics)
          originFinder.run.call(player.physics, planets)
        }
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

  renderBackground: function({ setStrokeStyle, drawLine }) {
    setStrokeStyle(this.gridColor)

    const ny = Math.floor(this.height / this.gridLineSpacing)
    const nx = Math.floor(this.width / this.gridLineSpacing)

    const xSpacing = this.width / nx
    const ySpacing = this.height / ny

    for (let y = 0; y < this.height + 1; y += ySpacing) {
      drawLine(0, y, this.width, y)
      for (let x = 0; x < this.width + 1; x += xSpacing) {
        drawLine(x, 0, x, this.height)
      }
    }
  },

  render: function(view) {
    this.renderBackground(view)
    this.planets.forEach(planet => planet.render(view))
    this.spaceships.forEach(spaceship => spaceship.render(view))
    this.players.forEach(player => player.render(view))
  }
})
