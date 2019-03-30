import { getAngle, getDistance } from './engine/tools'

const G = 20

export default ({
  pos,
  vel = {x: 0, y: 0},
  rad = 20,
  mass = rad,
  collide = () => {},
  controlSystem
}) => ({
  pos,
  vel,
  rad,
  mass,
  collide,
  controlSystem,

  setMoving: function(direction, bool) {
    this.controlSystem.setMoving(direction, bool)
  },

  attract: function(other) {
    const angle = getAngle(this, other)
    const distance = getDistance(this, other)
    const force = G * this.mass * other.mass / (distance ** 2)
    other.pos.x -= force * Math.cos(angle)
    other.pos.y -= force * Math.sin(angle)
  },

  update: function() {
    const { pos, vel } = this.controlSystem.update(
      { pos: this.pos, vel: this.vel }
    )

    this.pos = pos
    this.vel = vel
  }
})
