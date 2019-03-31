import Physics from './Physics'
import Controller from './engine/Controller'
import Drivable from './Drivable'
import Engine from './Engine'
import { SpaceshipPhysics } from './Physics'

const e = Engine({
  maxVel: 8,
  acc: 0.04,
  angAcc: 0.006,
  angDec: 0.006,
  maxAngVel: 0.1
})

const keys = {
  'w': 'up',
  'a': 'left',
  'd': 'right',
  'arrowup': 'up',
  'arrowleft': 'left',
  'arrowright': 'right'
}

export default ({ x, y, rad = 100, mass = 150, angle = 0, color = '#e48', engine = e }) => {
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

    update: function() {
      this.physics.update()
      const p = this.physics
      const engineX = p.pos.x - p.rad * Math.cos(p.angle)
      const engineY = p.pos.y - p.rad * Math.sin(p.angle)
      this.engine.physics.setPos({ x: engineX, y: engineY })
      this.engine.physics.setAngle(p.angle - Math.PI)
      this.engine.update()
    },

    render: function(view) {
      const { setStrokeStyle, drawCircle } = view
      this.engine.render(view)
      setStrokeStyle(this.color)
      drawCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
    }
  }

  const mapFunction = (command, isKeyDown) => {
    switch (command) {
      case 'up':
        if (isKeyDown) {
          spaceship.engine.fire()
        } else {
          spaceship.engine.stopFiring()
        }
      case 'left':
      case 'right':
        spaceship.controlMovement(command, isKeyDown)
        break
      default:
    }
  }

  const controller = Controller({ keys, mapFunction })

  const distance = spaceship.physics.rad - 20

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
