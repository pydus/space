import { getAngle, getDistance } from './engine/tools'
import { getGravitationalForce } from './space-tools'

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
    const force = getGravitationalForce(this, other)
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
