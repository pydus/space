import Spaceship from './Spaceship'
import { getDistance, areOverlapping } from './engine/tools'
import {
  getGravitationalForce,
  getMostAttractive,
  getNearest
} from './space-tools'

export default ({ width, height }) => ({
  width,
  height,

  gridColor: '#222',
  gridLineSpacing: 1000,

  spaceshipBuildCost: 3,
  spaceshipBuildRadius: 200,

  planets: [],
  players: [],
  spaceships: [],
  minerals: [],

  addPlanet(planet) {
    this.planets.push(planet)
  },

  addPlayer(player) {
    this.players.push(player)
  },

  addSpaceship(spaceship) {
    this.spaceships.push(spaceship)
  },

  addMineral(mineral) {
    this.minerals.push(mineral)
  },

  removeMineral(mineral) {
    const i = this.minerals.indexOf(mineral)
    if (i === -1) return false
    this.minerals.splice(i, 1)
    return true
  },

  handleMissiles() {
    this.spaceships.forEach(spaceship => {
      const missile = spaceship.missileLauncher.missile

      if (missile) {
        this.spaceships.forEach(otherSpaceship => {
          if (spaceship === otherSpaceship) return
          const minerals = otherSpaceship.mineralCarrier.minerals

          for (let i = minerals.length - 1; i >= 0; i--) {
            const mineral = minerals[i]
            if (areOverlapping(missile.physics, mineral.physics)) {
              const didSteal = missile.mineralCarrier.add(mineral)
              if (didSteal) {
                otherSpaceship.mineralCarrier.remove(mineral)
              }
            }
          }
        })

        // drop minerals into space or planet
        if (missile.done && missile.mineralCarrier.minerals.length === 0) {
          spaceship.missileLauncher.loaded.forEach(mineral => {
            for (const planet of this.planets) {
              if (areOverlapping(planet.physics, mineral.physics)) {
                return planet.mineralCarrier.add(mineral)
              }
            }
            this.addMineral(mineral)
          })
        }
      }
    })
  },

  handleMineralPickups() {
    this.players.forEach(player => {
      this.planets.forEach(planet => {
        const playerDistance = getDistance(player.physics, planet.physics)
        if (playerDistance > planet.physics.rad) return

        for (let i = planet.mineralCarrier.minerals.length - 1; i >= 0; i--) {
          const mineral = planet.mineralCarrier.minerals[i]
          const mineralDistance = getDistance(player.physics, mineral.physics)
          if (mineralDistance <= player.physics.rad + mineral.pickupDistance) {
            const pickedUp = player.mineralCarrier.add(mineral)
            if (pickedUp) {
              planet.mineralCarrier.minerals.splice(i, 1)
            }
          }
        }
      })
    })

    this.spaceships.forEach(spaceship => {
      for (let i = this.minerals.length - 1; i >= 0; i--) {
        const mineral = this.minerals[i]
        const mineralDistance = getDistance(spaceship.physics, mineral.physics)
        if (mineralDistance <= spaceship.physics.rad + mineral.pickupDistance) {
          const pickedUp = spaceship.mineralCarrier.add(mineral)
          if (pickedUp) {
            this.removeMineral(mineral)
          }
        }
      }
    })
  },

  handleVisibleMinerals() {
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

        for (let i = planet.mineralCarrier.minerals.length - 1; i >= 0; i--) {
          const mineral = planet.mineralCarrier.minerals[i]
          const mineralDistance = getDistance(player.physics, mineral.physics)
          if (mineralDistance <= mineral.visibleDistance) {
            visibleMinerals.push(mineral)
          }
        }
      })

      planet.setVisibleMinerals(visibleMinerals)
    })
  },

  handleMinerals() {
    this.handleMineralPickups()
    this.handleVisibleMinerals()
  },

  handleEntries() {
    this.players.forEach(player => {
      if (player.isEntering) {
        for (const spaceship of this.spaceships) {
          if (getDistance(player.physics, spaceship.physics) < spaceship.enterDistance) {
            if (!player.isInside && spaceship.enter(player)) {
              player.mineralCarrier.minerals.forEach(mineral =>
                spaceship.mineralCarrier.add(mineral)
              )
              player.mineralCarrier.minerals = []
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

  handleBuilds() {
    this.players.forEach(player => {
      const spaceships = this.spaceships.map(spaceship => spaceship.physics)
      const nearestSpaceship = getNearest.call(player.physics, spaceships)
      const distanceToNearestSpaceship = getDistance(player.physics, nearestSpaceship)

      player.hasRoomToBuildSpaceship =
        distanceToNearestSpaceship > this.spaceshipBuildRadius

      const playerMinerals = player.mineralCarrier.minerals

      if (
        player.wantsToBuildSpaceship &&
        player.hasRoomToBuildSpaceship &&
        playerMinerals.length >= this.spaceshipBuildCost
      ) {
        const { x, y } = player.physics.pos
        const spaceship = Spaceship({ x, y })
        this.addSpaceship(spaceship)
        player.setWantsToBuildSpaceship(false)
        const newPlayerMinerals = playerMinerals.slice(this.spaceshipBuildCost)
        player.mineralCarrier.minerals = newPlayerMinerals
      }
    })
  },

  handleGravity() {
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

  findOrigins() {
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

  keepInBounds(p) {
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

  bounceOffEdges(p) {
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

  handleBoundsFor(physicsObjects) {
    physicsObjects.forEach(p => {
      this.keepInBounds(p)
      this.bounceOffEdges(p)
    })
  },

  handleBounds() {
    this.handleBoundsFor(this.players)
    this.handleBoundsFor(this.spaceships)
  },

  update() {
    this.planets.forEach(planet => planet.update())
    this.players.forEach(player => player.update())
    this.spaceships.forEach(spaceship => spaceship.update())
    this.handleMissiles()
    this.handleMinerals()
    this.handleEntries()
    this.handleBuilds()
    this.handleGravity()
    this.findOrigins()
    this.handleBounds()
  },

  renderBackground({ setLine, drawLine }) {
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

  render(view) {
    this.renderBackground(view)
    this.minerals.forEach(mineral => mineral.render(view))
    this.planets.forEach(planet => planet.render(view))
    this.spaceships.forEach(spaceship => spaceship.render(view))
    this.players.forEach(player => player.render(view))
  }
})
