import ListenerService from './ListenerService'

export default ({ originFinder, maxVel = 2, acc = 0.1, dec = 0.1 }) => {
  const originControlSystem = {
    originFinder,
    maxVel,
    acc,
    dec,
    pos: {},
    vel: {},
    listeners: [],
    isMoving: { up: false, down: false, left: false, right: false },

    setMoving: function(direction, bool) {
      this.isMoving[direction] = bool
    },

    updateVelocities: function() {

    },

    putVelocitiesInBounds: function() {

    },

    updatePosition: function() {

    },

    setNewProps: function(pos, vel) {
      this.pos = pos
      this.vel = vel
    },

    update: function({ pos, vel }) {
      this.setNewProps(pos, vel)
      this.updateVelocities()
      this.putVelocitiesInBounds()
      this.updatePosition()
      this.notifyListeners()
    }
  }

  const listenerService = ListenerService(() => (
    { pos: originControlSystem.pos, vel: originControlSystem.vel }
  ))

  return Object.assign({}, originControlSystem, listenerService)
}
