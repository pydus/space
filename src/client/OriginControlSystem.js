export default ({ originFinder, maxVel = 2, acc = 0.1, dec = 0.1 }) => {
  const originControlSystem = {
    originFinder,
    maxVel,
    acc,
    dec,
    origin: null,
    pos: {},
    vel: {},
    isMoving: { up: false, down: false, left: false, right: false },

    setMoving: function(direction, bool) {
      this.isMoving[direction] = bool
    },

    init: function() {
      this.originFinder.listen(origin => this.origin = origin)
    },

    updateVelocities: function() {

    },

    putVelocitiesInBounds: function() {

    },

    updatePosition: function() {

    },

    setNewProps: function(pos, vel) {
      this.pos = Object.assign({}, pos)
      this.vel = Object.assign({}, vel)
    },

    update: function({ pos, vel }) {
      this.setNewProps(pos, vel)
      this.updateVelocities()
      this.putVelocitiesInBounds()
      this.updatePosition()
      return { pos: this.pos, vel: this.vel }
    }
  }

  originControlSystem.init()

  return originControlSystem
}
