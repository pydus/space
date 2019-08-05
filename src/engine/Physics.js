import { getAngle, getDistance } from './tools'

export default ({
  pos,
  vel = { x: 0, y: 0 },
  rad,
  mass = Math.max(3, 0.001 * rad ** 2),
  angle = 0,
  mobile = true,
  smoothness = 1,
  controlSystem
}) => ({
  pos,
  vel,
  rad,
  mass,
  angle,
  mobile,
  smoothness,
  controlSystem,

  setMoving(direction, bool) {
    this.controlSystem.setMoving(direction, bool)
  },

  setPos(pos) {
    this.pos = pos
  },

  setVel(vel) {
    this.vel = vel
  },

  setAngle(angle) {
    this.angle = angle
  },

  collideWith(p) {
    if (!this.mobile) return

    const angle = getAngle(p, this)

    this.setPos({
      x: p.pos.x + (p.rad + this.rad) * Math.cos(angle),
      y: p.pos.y + (p.rad + this.rad) * Math.sin(angle)
    })

    this.applyFrictionFrom(p)
  },

  applyFrictionFrom(p) {
    const factor = Math.min(
      1,
      (this.smoothness + p.smoothness) / 2
    )

    this.vel.x *= factor
    this.vel.y *= factor
  },

  applyForce(force, angle) {
    this.vel.x += force * Math.cos(angle)
    this.vel.y += force * Math.sin(angle)
  },

  applyForceTo(other, force) {
    const angle = getAngle(this, other)
    other.applyForce(force, angle)
  },

  updatePosition() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  },

  update() {
    if (this.controlSystem) {
      const { pos, vel, angle } = this.controlSystem.update(
        { pos: this.pos, vel: this.vel, angle: this.angle }
      )

      this.pos = pos
      this.vel = vel
      this.angle = angle
    }

    this.updatePosition()
  }
})
