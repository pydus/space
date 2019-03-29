export default ({
  x = 0,
  y = 0,
  max = 2,
  acc = 0.05,
  dec = 0.05,
  controlSystem
}) => ({
  x,
  y,
  max,
  acc,
  dec,
  controlSystem,

  isMoving: { up: false, down: false, left: false, right: false },

  setMoving: function(direction, bool) {
    this.isMoving[direction] = bool
  },

  updateVelocities: function() {
    const { x, y, acc, dec, isMoving } = this

    const api = { x, y, acc, dec, isMoving }

    const [ newX, newY ] = this.controlSystem.update(api)

    this.x = newX
    this.y = newY
  },

  putVelocitiesInBounds: function() {
    if (this.y < -this.max) {
      this.y = -this.max
    }

    if (this.y > this.max) {
      this.y = this.max
    }

    if (this.x < -this.max) {
      this.x = -this.max
    }

    if (this.x > this.max) {
      this.x = this.max
    }
  },

  update: function() {
    this.updateVelocities()
    this.putVelocitiesInBounds()
  },
})
