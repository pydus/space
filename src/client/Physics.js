import XYControlSystem from './XYControlSystem'
import OriginControlSystem from './OriginControlSystem'
import RotationalControlSystem from './RotationalControlSystem'
import OriginFinder from './OriginFinder'
import { hardCollide } from './engine/collisions'
import { getAngle, getDistance } from './engine/tools'
import { getGravitationalForce } from './space-tools'

const Physics = ({
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
    if (!this.controlSystem) return

    const { pos, vel, angle } = this.controlSystem.update(
      { pos: this.pos, vel: this.vel, angle: this.angle }
    )

    this.pos = pos
    this.vel = vel
    this.angle = angle
  }
})

export function PlayerPhysics({ x, y, rad = 20, mass = 100 }) {
  return Physics({
    pos: { x, y },
    rad,
    mass,
    collide: hardCollide,
    controlSystem: OriginControlSystem({
      originFinder: OriginFinder()
    })
  })
}

export function SpaceshipPhysics({ x, y, rad, mass, angle, engine }) {
  return Physics({
    pos: { x, y },
    mass,
    rad,
    angle,
    collide: hardCollide,
    controlSystem: RotationalControlSystem(engine)
  })
}

export default Physics
