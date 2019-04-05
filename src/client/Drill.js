import { DrillPhysics } from './physics'
import Controller from './engine/Controller'
import Drivable from './Drivable'

export default ({ acc, maxVel, origin }) => {
  const drill = {
    physics: DrillPhysics({ acc, maxVel, origin }),

    controller: null,

    setController: function(controller) {
      this.controller = controller
    },

    controlMovement: function(direction, isKeyDown) {
      this.physics.setMoving(direction, isKeyDown)
    },

    addPower: function(amount) {
      this.power += amount
    },

    update: function() {
      this.physics.update()
    }
  }

  const getCommand = key => {
    switch (key) {
      case 's':
      case 'arrowdown':
        return 'drill down'
      case 'w':
      case 'arrowup':
        return 'drill up'
      default:
        return ''
    }
  }

  const runCommand = (command, isKeyDown) => {
    switch (command) {
      case 'drill up':
        drill.controlMovement('up', isKeyDown)
        break
      case 'drill down':
        drill.controlMovement('down', isKeyDown)
        break
      default:
    }
  }

  const controller = Controller({ getCommand, runCommand, isEnabled: false })

  drill.setController(controller)

  const drivable = Drivable({
    vehicle: drill
  })

  return Object.assign({}, drill, drivable)
}
