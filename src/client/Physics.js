import XYControlSystem from './XYControlSystem'
import OriginControlSystem from './OriginControlSystem'
import RotationalControlSystem from './RotationalControlSystem'
import OriginFinder from './OriginFinder'
import { getAngle, getDistance } from './engine/tools'
import { getGravitationalForce } from './space-tools'

const Physics = ({
  pos,
  vel = { x: 0, y: 0 },
  rad,
  mass = rad,
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

  setMoving: function(direction, bool) {
    this.controlSystem.setMoving(direction, bool)
  },

  setPos: function(pos) {
    this.pos = pos
  },

  setVel: function(vel) {
    this.vel = vel
  },

  setAngle: function(angle) {
    this.angle = angle
  },

  collideWith: function(p) {
    if (!this.mobile) return

    const angle = getAngle(p, this)

    this.setPos({
      x: p.pos.x + (p.rad + this.rad) * Math.cos(angle),
      y: p.pos.y + (p.rad + this.rad) * Math.sin(angle)
    })

    this.applyFrictionFrom(p)
  },

  applyFrictionFrom: function(p) {
    const factor = Math.min(
      1,
      (this.smoothness + p.smoothness) / 2
    )

    this.vel.x *= factor
    this.vel.y *= factor
  },

  applyForce: function(force, angle) {
    this.vel.x += force * Math.cos(angle)
    this.vel.y += force * Math.sin(angle)
  },

  applyForceTo: function(other, force) {
    const angle = getAngle(this, other)
    other.applyForce(force, angle)
  },

  attract: function(other) {
    const force = -1 * getGravitationalForce(this, other)
    this.applyForceTo(other, force)
  },

  repel: function(other) {
    const force = getGravitationalForce(this, other)
    this.applyForceTo(other, force)
  },

  updatePosition: function() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  },

  update: function() {
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

export function PlayerPhysics({ x, y, rad, mass }) {
  return Physics({
    pos: { x, y },
    rad,
    mass,
    smoothness: 0.9,
    controlSystem: OriginControlSystem({
      originFinder: OriginFinder()
    })
  })
}

export function PlanetPhysics({ x, y, rad, mass }) {
  return Physics({
    pos: { x, y },
    rad,
    mass,
    mobile: false,
    smoothness: 1
  })
}

export function SpaceshipPhysics({ x, y, rad, mass, angle, engine }) {
  return Physics({
    pos: { x, y },
    mass,
    rad,
    angle,
    smoothness: 0.8,
    controlSystem: RotationalControlSystem(engine)
  })
}

export function FlameParticlePhysics({ pos, rad, vel, angle }) {
  return Physics({ pos, rad, vel, angle, smoothness: 1 })
}

export default Physics
