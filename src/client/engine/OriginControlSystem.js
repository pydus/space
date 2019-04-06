import { getAngle, getDistance } from './tools'

export default ({
  origin,
  maxVel = 10,
  acc = 2.5,
  dec = 2.5,
  vertical = false
}) => ({
  type: 'origin',
  origin,
  angVel: 0,
  downVel: 0,
  maxVel,
  acc,
  dec,
  vertical,
  angle: null,
  pos: {},
  vel: {},
  isEnabled: true,

  isMoving: { up: false, down: false, left: false, right: false },

  setOrigin(origin) {
    this.origin = origin
  },

  setMoving(direction, bool) {
    this.isMoving[direction] = bool
  },

  setVertical(vertical) {
    this.vertical = vertical
  },

  enable() {
    this.isEnabled = true
  },

  disable() {
    this.isEnabled = false
  },

  updateAngVel() {
    if (this.isMoving.left) {
      this.angVel -= this.acc
      if (this.angVel < -this.maxVel) {
        this.angVel = -this.maxVel
      }
    } else if (this.angVel <= -this.dec) {
      this.angVel += this.dec
    }

    if (this.isMoving.right) {
      this.angVel += this.acc
      if (this.angVel > this.maxVel) {
        this.angVel = this.maxVel
      }
    } else if (this.angVel >= this.dec) {
      this.angVel -= this.dec
    }

    if (
      !this.isMoving.left &&
      !this.isMoving.right &&
      Math.abs(this.angVel) < this.dec
    ) {
      this.angVel = 0
    }
  },

  updateAngle() {
    const distance = getDistance({ pos: this.origin }, this)
    this.angle = getAngle({ pos: this.origin }, this)
    this.angle += this.angVel / distance
  },

  updateVerticalMovement() {
    if (!this.vertical) {
      this.downVel = 0
      return
    }

    if (this.isMoving.down) {
      this.downVel += this.acc
      if (this.downVel > this.maxVel) {
        this.downVel = this.maxVel
      }
    } else if (this.downVel >= this.dec) {
      this.downVel -= this.dec
    }

    if (this.isMoving.up) {
      this.downVel -= this.acc
      if (this.downVel < -this.maxVel) {
        this.downVel = -this.maxVel
      }
    } else if (this.downVel <= -this.dec) {
      this.downVel += this.dec
    }

    if (
      !this.isMoving.up &&
      !this.isMoving.down &&
      Math.abs(this.downVel) < this.dec
    ) {
      this.downVel = 0
    }
  },

  updatePosition() {
    const distance = getDistance({ pos: this.origin }, this)
    this.pos.x = this.origin.x + (distance - this.downVel) * Math.cos(this.angle)
    this.pos.y = this.origin.y + (distance - this.downVel) * Math.sin(this.angle)
  },

  setNewProps(pos, vel) {
    this.pos = Object.assign({}, pos)
    this.vel = Object.assign({}, vel)
  },

  update({ pos, vel }) {
    this.setNewProps(pos, vel)

    if (this.origin) {
      if (this.isEnabled) {
        this.updateAngVel()
        this.updateAngle()
        this.updateVerticalMovement()
      }
      this.updatePosition()
    }

    return { pos: this.pos, vel: this.vel }
  }
})
