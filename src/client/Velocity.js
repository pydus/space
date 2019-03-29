export default ({
  x = 0,
  y = 0,
  acc = 0.05,
  dec = 0.05
}) => ({
  x,
  y,
  acc,
  dec,
  isMoving: { up: false, down: false, left: false, right: false },

  updateVelocities: function() {
    if (this.isMoving.up) {
      this.y -= this.acc
    } else if (this.y < 0) {
      this.y += this.dec
    }

    if (this.isMoving.down) {
      this.y += this.acc
    } else if (this.y > 0) {
      this.y -= this.dec
    }

    if (this.isMoving.left) {
      this.x -= this.acc
    } else if (this.x < 0) {
      this.x += this.dec
    }

    if (this.isMoving.right) {
      this.x += this.acc
    } else if (this.x > 0) {
      this.x -= this.dec
    }
  },

  putVelocitiesInBounds: function() {
    if (this.y < -this.maxVelocity) {
      this.y = -this.maxVelocity
    }

    if (this.y > this.maxVelocity) {
      this.y = this.maxVelocity
    }

    if (this.x < -this.maxVelocity) {
      this.x = -this.maxVelocity
    }

    if (this.x > this.maxVelocity) {
      this.x = this.maxVelocity
    }
  },

  update: function() {
    this.updateVelocities()
    this.putVelocitiesInBounds()
  },
})
