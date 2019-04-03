import Controller from './engine/Controller'
import Drivable from './Drivable'
import Engine from './Engine'
import { SpaceshipPhysics } from './physics'

const e = Engine({
  maxVel: 8,
  acc: 0.2,
  angAcc: 0.006,
  angDec: 0.006,
  maxAngVel: 0.1
})

export default ({
  x,
  y,
  rad = 100,
  mass,
  angle = 0,
  color = '#30baa7',
  engine = e
}) => {
  const spaceship = {
    color,
    engine,

    physics: SpaceshipPhysics({
      x,
      y,
      mass,
      rad,
      angle,
      engine
    }),

    controlMovement: function(direction, isKeyDown) {
      this.physics.setMoving(direction, isKeyDown)
    },

    handleEngine: function() {
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

    update: function() {
      this.physics.update()
      const p = this.physics
      const engineX = p.pos.x - p.rad * Math.cos(p.angle)
      const engineY = p.pos.y - p.rad * Math.sin(p.angle)
      this.engine.physics.setPos({ x: engineX, y: engineY })
      this.engine.physics.setAngle(p.angle - Math.PI)
      this.handleEngine()
      this.engine.update()
    },

    render: function(view) {
      const { setLine, drawCircle } = view
      this.engine.render(view)
      setLine(this.color)
      drawCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
    }
  }

  const getCommand = key => {
    switch (key) {
      case 'w':
      case 'arrowup':
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
      default:
    }
  }

  const controller = Controller({ getCommand, runCommand })

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
