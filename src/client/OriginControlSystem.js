import { getAngle, getDistance } from './engine/tools'

export default ({
  originFinder,
  vel = 0,
  maxVel = 5000,
  acc = 2500,
  dec = 2500
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
      const distance = getDistance(this.origin, this)
      this.angle = getAngle(this.origin, this)
      this.angle += this.vel / (distance ** 2)
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
      if (this.origin) {
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
