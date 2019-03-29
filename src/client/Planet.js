import { getAngle, getDistance } from './tools'

export default ({ x, y, radius, color='#e48' }) => ({
  x,
  y,
  radius,
  color,

  attract: function(thing, mag) {
    const angle = getAngle(this, thing)
    const distance = getDistance(this, thing)
    thing.x -= mag * Math.cos(angle) / distance
    thing.y -= mag * Math.sin(angle) / distance
  },

  collide: function() {

  },

  update: function() {

  },

  render: function({ fillCircle, setFillStyle }) {
    setFillStyle(this.color)
    fillCircle(this.x, this.y, this.radius)
  }
})
