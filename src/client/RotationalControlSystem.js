export default ({ maxVel, acc, angAcc, angDec, maxAngVel }) => ({
  maxVel,
  acc,
  angAcc,
  angDec,
  maxAngVel,
  angVel: 0,
  pos: {},
  vel: {},
  angle: null,
  enabled: true,
  isMoving: { up: false, down: false, left: false, right: false },

  setMoving: function(direction, bool) {
    this.isMoving[direction] = bool
  },

  enable: function() {
    this.enabled = true
  },

  disable: function() {
    this.enabled = false
  },

  updateVelocities: function() {
    if (this.isMoving.up) {
      this.vel.x += this.acc * Math.cos(this.angle)
      this.vel.y += this.acc * Math.sin(this.angle)
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

  updateAngVel: function() {
    if (this.isMoving.left) {
      this.angVel -= this.angAcc
      if (this.angVel < -this.maxAngVel) {
        this.angVel = -this.maxAngVel
      }
    } else if (this.angVel < -this.angDec) {
      this.angVel += this.angDec
    }

    if (this.isMoving.right) {
      this.angVel += this.angAcc
      if (this.angVel > this.maxAngVel) {
        this.angVel = this.maxAngVel
      }
    } else if (this.angVel > this.angDec){
      this.angVel -= this.angDec
    }

    if (
      !this.isMoving.left &&
      !this.isMoving.right &&
      Math.abs(this.angVel) < this.angDec
    ) {
      this.angVel = 0
    }
  },

  updateAngle: function() {
    this.angle += this.angVel
  },

  updatePosition: function() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  },

  setNewProps: function(pos, vel, angle) {
    this.pos = Object.assign({}, pos)
    this.vel = Object.assign({}, vel)
    this.angle = angle
  },

  update: function({ pos, vel, angle }) {
    this.setNewProps(pos, vel, angle)

    if (this.enabled) {
      this.updateVelocities()
      this.putVelocitiesInBounds()
      this.updateAngVel()
      this.updateAngle()
    }

    this.updatePosition()

    return { pos: this.pos, vel: this.vel, angle: this.angle }
  }
})
