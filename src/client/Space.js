import { getDistance } from './engine/tools'
import { getGravitationalForce } from './space-tools'

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
        for (const spaceship of this.spaceships) {
          if (getDistance(p, spaceship.physics) < spaceship.enterDistance) {
            if (!player.isInside && spaceship.enter(p)) {
              player.enter()
              break
            } else if (player.isInside && spaceship.exit(p)) {
              player.exit()
              break
            }
          }
        }
      }
    })
  },

  handleGravity: function() {
    this.planets.forEach(planet => {
      this.players.forEach(player => {
        const force = -1 * getGravitationalForce(planet.physics, player.physics)
        planet.physics.applyForceTo(player.physics, force)
      })
      this.spaceships.forEach(spaceship => {
        const force = -1 * getGravitationalForce(planet.physics, spaceship.physics)
        planet.physics.applyForceTo(spaceship.physics, force)
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

  keepInBounds: function(p) {
    const rad = p.physics.rad
    let { x, y } = p.physics.pos

    if (x < rad) {
      x = rad
    } else if (x > this.width - rad) {
      x = this.width - rad
    }

    if (y < rad) {
      y = rad
    } else if (y > this.height - rad) {
      y = this.height - rad
    }

    p.physics.setPos({ x, y })
  },

  bounceOffEdges: function(p) {
    const rad = p.physics.rad
    let { x, y } = p.physics.pos
    let vx = p.physics.vel.x
    let vy = p.physics.vel.y

    if (x <= rad && vx < 0 || x >= this.width - rad && vx > 0) {
      vx *= -1
    }

    if (y <= rad && vy < 0 || y >= this.height - rad && vy > 0) {
      vy *= -1
    }

    p.physics.setVel({ x: vx, y: vy })
  },

  handleBoundsFor: function(physicsObjects) {
    physicsObjects.forEach(p => {
      this.keepInBounds(p)
      this.bounceOffEdges(p)
    })
  },

  handleBounds: function() {
    this.handleBoundsFor(this.players)
    this.handleBoundsFor(this.spaceships)
  },

  update: function() {
    this.planets.forEach(planet => planet.update())
    this.players.forEach(player => player.update())
    this.spaceships.forEach(spaceship => spaceship.update())
    this.handleEntries()
    this.handleGravity()
    this.runOriginFinders()
    this.handleBounds()
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
