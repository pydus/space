export default ({ maxVel = 2, acc = 0.1, dec = 0.1 }) => ({
  acc,
  dec,
  maxVel,
  pos: {},
  vel: {},
  isEnabled: true,
  isMoving: { up: false, down: false, left: false, right: false },

  setMoving: function(direction, bool) {
    this.isMoving[direction] = bool
  },

  enable: function() {
    this.isEnabled = true
  },

  disable: function() {
    this.isEnabled = false
  },

  updateVelocities: function() {
    if (this.isMoving.up) {
      this.vel.y -= this.acc
    } else if (this.vel.y < 0) {
      this.vel.y += this.dec
    }

    if (this.isMoving.down) {
      this.vel.y += this.acc
    } else if (this.vel.y > 0) {
      this.vel.y -= this.dec
    }

    if (this.isMoving.left) {
      this.vel.x -= this.acc
    } else if (this.vel.x < 0) {
      this.vel.x += this.dec
    }

    if (this.isMoving.right) {
      this.vel.x += this.acc
    } else if (this.vel.x > 0) {
      this.vel.x -= this.dec
    }
  },

  putVelocitiesInBounds: function() {
    if (this.vel.y < -this.maxVel) {
      this.vel.y = -this.maxVel
    }

    if (this.vel.y > this.maxVel) {
      this.vel.y = this.maxVel
    }

    if (this.vel.x < -this.maxVel) {
      this.vel.x = -this.maxVel
    }

    if (this.vel.x > this.maxVel) {
      this.vel.x = this.maxVel
    }
  },

  setNewProps: function(pos, vel) {
    this.pos = Object.assign({}, pos)
    this.vel = Object.assign({}, vel)
  },

  update: function({ pos, vel }) {
    this.setNewProps(pos, vel)
    if (this.isEnabled) {
      this.updateVelocities()
      this.putVelocitiesInBounds()
    }
    return { pos: this.pos, vel: this.vel }
  }
})
