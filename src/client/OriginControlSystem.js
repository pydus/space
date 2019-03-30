import { getAngle, getDistance } from './tools'

export default ({
  originFinder,
  vel = 0,
  maxVel = 0.015,
  acc = 0.005,
  dec = 0.005
}) => {
  const originControlSystem = {
    originFinder,
    vel,
    maxVel,
    acc,
    dec,
    origin: null,
    angle: null,
    pos: {},

    isMoving: { up: false, down: false, left: false, right: false },

    setMoving: function(direction, bool) {
      this.isMoving[direction] = bool
    },

    init: function() {
      this.originFinder.listen(origin => {
        if (this.origin !== origin) {
          this.origin = origin
          this.angle = getAngle(origin, this)
        }
      })
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
      const distance = getDistance(this.origin, this)
      this.pos.x = this.origin.pos.x + distance * Math.cos(this.angle)
      this.pos.y = this.origin.pos.y + distance * Math.sin(this.angle)
    },

    setNewProps: function(pos) {
      this.pos = Object.assign({}, pos)
    },

    update: function({ pos }) {
      this.setNewProps(pos)
      if (this.origin && this.angle !== null) {
        this.updateAngVel()
        this.updateAngle()
        this.updatePosition()
      }
      return { pos: this.pos }
    }
  }

  originControlSystem.init()

  return originControlSystem
}
