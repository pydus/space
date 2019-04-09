import Controller from './engine/Controller'
import Drivable from './Drivable'
import Engine from './Engine'
import { SpaceshipPhysics } from './physics'
import MissileLauncher from './MissileLauncher'
import MineralCarrier from './MineralCarrier'

export default ({
  x,
  y,
  rad = 100,
  mass,
  angle = 0,
  color = '#30baa7',
  engine = Engine({
    maxVel: 8,
    acc: 0.2,
    angAcc: 0.006,
    angDec: 0.006,
    maxAngVel: 0.1
  })
}) => {
  const spaceship = {
    color,
    engine,

    mineralCarrier: MineralCarrier({ x, y, rad, angle }),

    loadCounter: 0,
    updatesBetweenLoads: 20,
    missileLauncher: MissileLauncher({ pos: { x, y }, crosshairColor: color }),

    physics: SpaceshipPhysics({
      x,
      y,
      mass,
      rad,
      angle,
      engine
    }),

    setController(controller) {
      this.controller = controller
    },

    controlMovement(direction, isKeyDown) {
      this.physics.setMoving(direction, isKeyDown)
    },

    setLoading(loading) {
      this.loading = loading
    },

    loadNext() {
      const mineral = this.mineralCarrier.minerals.pop()
      if (mineral) {
        this.missileLauncher.load(mineral)
        return true
      }
      return false
    },

    updateLoader() {
      if (this.loading) {
        if (this.loadCounter <= 0) {
          const didLoad = this.loadNext()
          if (didLoad) {
            this.loadCounter = this.updatesBetweenLoads
          } else {
            this.setLoading(false)
          }
        } else {
          this.loadCounter--
        }
      }
    },

    handleEngine() {
      const controlSystem = this.physics.controlSystem

      if (controlSystem.isEnabled) {
        if (this.engine.isFiring) {
          if (!controlSystem.isMoving.up) {
            this.engine.stopFiring()
          }
        } else if (controlSystem.isMoving.up) {
          this.engine.fire()
        }
      } else {
        this.engine.stopFiring()
      }
    },

    updateEnginePosition() {
      const p = this.physics
      const engineX = p.pos.x - p.rad * Math.cos(p.angle)
      const engineY = p.pos.y - p.rad * Math.sin(p.angle)
      this.engine.physics.setPos({ x: engineX, y: engineY })
      this.engine.physics.setAngle(p.angle - Math.PI)
    },

    updateMissileLauncherPosition() {
      const { pos, angle, rad } = this.physics
      const x = pos.x + rad * Math.cos(angle)
      const y = pos.y + rad * Math.sin(angle)
      this.missileLauncher.physics.setPos({ x, y })
      this.missileLauncher.physics.setAngle(angle)
    },

    update() {
      this.updateLoader()
      this.missileLauncher.update()
      this.physics.update()
      this.updateMissileLauncherPosition()
      this.updateEnginePosition()
      this.handleEngine()
      this.engine.update()
      this.mineralCarrier.physics.setPos(this.physics.pos)
      this.mineralCarrier.physics.setAngle(this.physics.angle)
      this.mineralCarrier.update()
    },

    render(view) {
      const { setLine, drawCircle } = view
      setLine(this.color)
      drawCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
      this.mineralCarrier.render(view)
      this.engine.render(view)
      this.missileLauncher.render(view)
    }
  }

  const getCommand = key => {
    switch (key) {
      case 'arrowup':
        return 'missile launcher'
      case 'w':
        return 'up'
      case 'a':
      case 'arrowleft':
        return 'left'
      case 'd':
      case 'arrowright':
        return 'right'
      default:
        return ''
    }
  }

  const runCommand = (command, isKeyDown) => {
    switch (command) {
      case 'up':
      case 'left':
      case 'right':
        spaceship.controlMovement(command, isKeyDown)
        break
      case 'load':
        spaceship.setLoading(isKeyDown)
        break
      case 'missile launcher':
        spaceship.setLoading(isKeyDown)
        if (!isKeyDown) {
          spaceship.missileLauncher.fire()
        }
        break
      default:
    }
  }

  const controller = Controller({ getCommand, runCommand, isEnabled: false })

  spaceship.setController(controller)

  const distance = spaceship.physics.rad * 0.65

  const driverSeat = { distance, angle: Math.PI }

  const passengerSeats = [
    { distance: 0, angle: 0 },
    { distance, angle: Math.PI / 2 },
    { distance, angle: -Math.PI / 2 }
  ]

  const drivable = Drivable({
    vehicle: spaceship,
    driverSeat,
    passengerSeats,
    enterDistance: rad + 20
  })

  return Object.assign({}, spaceship, drivable)
}
