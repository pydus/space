import { getAngle, getDistance } from './tools'

export default ({
  origin,
  vel = 0,
  maxVel = 10,
  acc = 2.5,
  dec = 2.5
}) => ({
  type: 'origin',
  origin,
  angVel: vel,
  maxVel,
  acc,
  dec,
  angle: null,
  pos: {},
  vel: {},
  isEnabled: true,

  isMoving: { up: false, down: false, left: false, right: false },

  setOrigin: function(origin) {
    this.origin = origin
  },

  setMoving: function(direction, bool) {
    this.isMoving[direction] = bool
  },

  enable: function() {
    this.isEnabled = true
  },

  disable: function() {
    this.isEnabled = false
  },

  updateAngVel: function() {
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

  updateAngle: function() {
    const distance = getDistance({ pos: this.origin }, this)
    this.angle = getAngle({ pos: this.origin }, this)
    this.angle += this.angVel / distance
  },

  updatePosition: function() {
    const distance = getDistance({ pos: this.origin }, this)
    this.pos.x = this.origin.x + distance * Math.cos(this.angle)
    this.pos.y = this.origin.y + distance * Math.sin(this.angle)
  },

  setNewProps: function(pos, vel) {
    this.pos = Object.assign({}, pos)
    this.vel = Object.assign({}, vel)
  },

  update: function({ pos, vel }) {
    this.setNewProps(pos, vel)

    if (this.origin) {
      if (this.isEnabled) {
        this.updateAngVel()
        this.updateAngle()
      }
      this.updatePosition()
    }

    return { pos: this.pos, vel: this.vel }
  }
})
