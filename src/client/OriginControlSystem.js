import { getAngle, getDistance } from './tools'

export default ({ originFinder, maxVel = 0.015, acc = 0.005, dec = 0.005 }) => {
  const originControlSystem = {
    originFinder,
    maxVel,
    acc,
    dec,
    origin: null,
    pos: {},
    vel: 0,
    angle: 0,

    isMoving: { up: false, down: false, left: false, right: false },

    setMoving: function(direction, bool) {
      this.isMoving[direction] = bool
    },

    init: function() {
      this.originFinder.listen(origin => this.origin = origin)
    },

    updateAngVel: function() {
      if (this.isMoving.left) {
        this.vel -= this.acc
        if (this.vel < -this.maxVel) {
          this.vel = -this.maxVel
        }
      } else if (this.vel <= -this.dec) {
        this.vel += this.dec
      }

      if (this.isMoving.right) {
        this.vel += this.acc
        if (this.vel > this.maxVel) {
          this.vel = this.maxVel
        }
      } else if (this.vel >= this.dec) {
        this.vel -= this.dec
      }

      if (
        !this.isMoving.left &&
        !this.isMoving.right &&
        Math.abs(this.vel) < this.dec
      ) {
        this.vel = 0
      }
    },

    updateAngle: function() {
      this.angle += this.vel
    },

    updatePosition: function() {
      if (!this.origin) return
      const distance = getDistance(this.origin, this)
      this.pos.x = this.origin.pos.x + distance * Math.cos(this.angle)
      this.pos.y = this.origin.pos.y + distance * Math.sin(this.angle)
    },

    setNewProps: function(pos) {
      this.pos = Object.assign({}, pos)
    },

    update: function({ pos }) {
      this.setNewProps(pos)
      this.updateAngVel()
      this.updateAngle()
      this.updatePosition()
      return { pos: this.pos }
    }
  }

  originControlSystem.init()

  return originControlSystem
}
