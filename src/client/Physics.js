import { getAngle, getDistance } from './engine/tools'
import { getGravitationalForce } from './space-tools'

export default ({
  pos,
  vel = { x: 0, y: 0 },
  rad,
  mass = rad,
  angle = 0,
  collide = () => {},
  controlSystem
}) => ({
  pos,
  vel,
  rad,
  mass,
  angle,
  collide,
  controlSystem,

  setMoving: function(direction, bool) {
    this.controlSystem.setMoving(direction, bool)
  },

  setPos: function(pos) {
    this.pos = pos
  },

  attract: function(other) {
    const angle = getAngle(this, other)
    const force = getGravitationalForce(this, other)
    other.pos.x -= force * Math.cos(angle)
    other.pos.y -= force * Math.sin(angle)
  },

  update: function() {
    const { pos, vel, angle } = this.controlSystem.update(
      { pos: this.pos, vel: this.vel, angle: this.angle }
    )

    this.pos = pos
    this.vel = vel
    this.angle = angle
  }
})
