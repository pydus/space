import Physics from './Physics'
import RotationalControlSystem from './RotationalControlSystem'
import Controller from './engine/Controller'
import Drivable from './Drivable'
import Engine from './Engine'
import { hardCollide } from './engine/collisions'

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
  'arrowdown': 'down',
  'arrowleft': 'left',
  'arrowright': 'right'
}

export default ({ x, y, rad = 100, mass = 150, color = '#e48', engine = e }) => {
  const spaceship = {
    color,
    engine,

    physics: Physics({
      pos: { x, y },
      mass,
      rad,
      collide: hardCollide,
      angle: 0,
      controlSystem: RotationalControlSystem(engine)
    }),

    controlMovement: function(direction, isKeyDown) {
      this.physics.setMoving(direction, isKeyDown)
    },

    update: function() {
      this.physics.update()
    },

    render: function({ setStrokeStyle, drawCircle }) {
      setStrokeStyle(this.color)
      drawCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
    }
  }

  const mapFunction = (command, isKeyDown) => {
    switch (command) {
      case 'up':
      case 'left':
      case 'right':
        spaceship.controlMovement(command, isKeyDown)
        break
      default:
    }
  }

  const controller = Controller({ keys, mapFunction })

  const driverPos = { distance: spaceship.physics.rad - 20, angle: 0 }

  const drivable = Drivable({
    vehicle: spaceship,
    driverPos,
    enterDistance: rad + 20
  })

  return Object.assign({}, spaceship, drivable)
}
