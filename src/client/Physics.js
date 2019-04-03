import Physics from './engine/Physics'
import OriginControlSystem from './engine/OriginControlSystem'
import RotationalControlSystem from './engine/RotationalControlSystem'

export function PlayerPhysics({ x, y, rad, mass }) {
  return Physics({
    pos: { x, y },
    rad,
    mass,
    smoothness: 0.9,
    controlSystem: OriginControlSystem({ origin: null })
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
