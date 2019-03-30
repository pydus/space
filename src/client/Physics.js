import { getAngle, getDistance } from './tools'

export default ({
  pos,
  vel = {x: 0, y: 0},
  rad = 20,
  collide = () => {},
  controlSystem
}) => ({
  pos,
  vel,
  rad,
  collide,
  controlSystem,

  setMoving: function(direction, bool) {
    this.controlSystem.setMoving(direction, bool)
  },

  attract: function(other, mag) {
    const angle = getAngle(this, other)
    const distance = getDistance(this, other)
    other.pos.x -= mag * Math.cos(angle) / distance
    other.pos.y -= mag * Math.sin(angle) / distance
  },

  update: function() {
    const { pos, vel } = this.controlSystem.update(
      { pos: this.pos, vel: this.vel }
    )

    this.pos = pos
    this.vel = vel
  }
})
