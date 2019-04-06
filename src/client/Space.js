import { getDistance } from './engine/tools'
import { getGravitationalForce, getMostAttractive } from './space-tools'

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

  handleMineralPickups: function() {
    this.players.forEach(player => {
      this.planets.forEach(planet => {
        const playerDistance = getDistance(player.physics, planet.physics)
        if (playerDistance > planet.physics.rad) return

        for (let i = planet.minerals.length - 1; i >= 0; i--) {
          const mineral = planet.minerals[i]
          const mineralDistance = getDistance(player.physics, mineral.physics)
          if (mineralDistance <= player.physics.rad + mineral.pickupDistance) {
            const pickedUp = player.addMineral(mineral)
            if (pickedUp) {
              planet.minerals.splice(i, 1)
            }
          }
        }
      })
    })
  },

  handleVisibleMinerals: function() {
    this.planets.forEach(planet => {
      const visibleMinerals = []

      this.players.forEach(player => {
        if (
          !player.controller ||
          !player.controller.isEnabled ||
          !player.isUnderGround
        ) return

        const playerDistance = getDistance(player.physics, planet.physics)
        if (playerDistance > planet.physics.rad) return

        for (let i = planet.minerals.length - 1; i >= 0; i--) {
          const mineral = planet.minerals[i]
          const mineralDistance = getDistance(player.physics, mineral.physics)
          if (mineralDistance <= mineral.visibleDistance) {
            visibleMinerals.push(mineral)
          }
        }
      })

      planet.setVisibleMinerals(visibleMinerals)
    })
  },

  handleMinerals: function() {
    this.handleMineralPickups()
    this.handleVisibleMinerals()
  },

  handleEntries: function() {
    this.players.forEach(player => {
      if (player.isEntering) {
        for (const spaceship of this.spaceships) {
          if (getDistance(player.physics, spaceship.physics) < spaceship.enterDistance) {
            if (!player.isInside && spaceship.enter(player)) {
              player.minerals.forEach(mineral => spaceship.addMineral(mineral))
              player.minerals = []
              player.enter()
              break
            } else if (player.isInside && spaceship.exit(player)) {
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
        if (!player.feelsGravity) return
        const force = -1 * getGravitationalForce(planet.physics, player.physics)
        planet.physics.applyForceTo(player.physics, force)
      })
      this.spaceships.forEach(spaceship => {
        const force = -1 * getGravitationalForce(planet.physics, spaceship.physics)
        planet.physics.applyForceTo(spaceship.physics, force)
      })
    })
  },

  findOrigins: function() {
    this.players.forEach(player => {
      const controlSystem = player.physics.controlSystem
      if (controlSystem && controlSystem.type === 'origin') {
        const planets = this.planets.map(planet => planet.physics)
        const mostAttractive = getMostAttractive.call(player.physics, planets)
        const origin = {
          ...mostAttractive.pos,
          rad: mostAttractive.rad
        }
        controlSystem.setOrigin(origin)
        player.drill.physics.controlSystem.setOrigin(origin)
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
    this.handleMinerals()
    this.handleEntries()
    this.handleGravity()
    this.findOrigins()
    this.handleBounds()
  },

  renderBackground: function({ setLine, drawLine }) {
    setLine(this.gridColor)

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
