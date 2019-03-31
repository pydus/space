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
    angVel: vel,
    maxVel,
    acc,
    dec,
    origin: null,
    angle: null,
    pos: {},
    vel: {},
    isEnabled: true,
    minDerivedVel: 0.1,
    derivedVelUpdateRatio: 0.99,

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

    init: function() {
      this.originFinder.listen(origin => {
        if (this.origin !== origin) {
          this.origin = origin
        }
      })
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
      const distance = getDistance(this.origin, this)
      this.angle = getAngle(this.origin, this)
      this.angle += this.angVel / (distance ** 2)
    },

    updatePosition: function() {
      const distance = getDistance(this.origin, this)
      this.pos.x = this.origin.pos.x + distance * Math.cos(this.angle)
      this.pos.y = this.origin.pos.y + distance * Math.sin(this.angle)
    },

    updateDerivedVelocity: function() {
      if (Math.abs(this.vel.x) > this.minDerivedVel) {
        this.vel.x *= this.derivedVelUpdateRatio
      } else {
        this.vel.x = 0
      }

      if (Math.abs(this.vel.y) > this.minDerivedVel) {
        this.vel.y *= this.derivedVelUpdateRatio
      } else {
        this.vel.y = 0
      }
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
        this.updateDerivedVelocity()
      }

      return { pos: this.pos, vel: this.vel }
    }
  }

  originControlSystem.init()

  return originControlSystem
}
