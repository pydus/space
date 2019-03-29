import { getAngle, getDistance } from './tools'

export default ({ pos, velocity, radius = 20, collide = () => {} }) => ({
  pos,
  velocity,
  radius,
  collide,

  updatePosition: function(pos) {
    this.pos.x += this.velocity.x
    this.pos.y += this.velocity.y
  },

  attract: function(other, mag) {
    const angle = getAngle(this, other)
    const distance = getDistance(this, other)
    other.pos.x -= mag * Math.cos(angle) / distance
    other.pos.y -= mag * Math.sin(angle) / distance
  },

  update: function(pos) {
    this.velocity.update()
    this.updatePosition()
  }
})
