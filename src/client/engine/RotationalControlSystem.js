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
  isEnabled: true,
  isMoving: { up: false, down: false, left: false, right: false },

  setMoving(direction, bool) {
    this.isMoving[direction] = bool
  },

  enable() {
    this.isEnabled = true
  },

  disable() {
    this.isEnabled = false
  },

  updateVelocities() {
    if (this.isMoving.up) {
      this.vel.x += this.acc * Math.cos(this.angle)
      this.vel.y += this.acc * Math.sin(this.angle)
    }
  },

  putVelocitiesInBounds() {
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

  updateAngVel() {
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

  updateAngle() {
    this.angle += this.angVel
  },

  setNewProps(pos, vel, angle) {
    this.pos = Object.assign({}, pos)
    this.vel = Object.assign({}, vel)
    this.angle = angle
  },

  update({ pos, vel, angle }) {
    this.setNewProps(pos, vel, angle)

    if (this.isEnabled) {
      this.updateVelocities()
      this.putVelocitiesInBounds()
      this.updateAngVel()
      this.updateAngle()
    }

    return { pos: this.pos, vel: this.vel, angle: this.angle }
  }
})
