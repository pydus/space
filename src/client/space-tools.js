import { getDistance } from './engine/tools'

export const G = 20

export function getGravitationalForce(p1, p2) {
  const distance = getDistance(p1, p2)
  return G * p1.mass * p2.mass / (distance ** 2)
}

export function getMostAttractive(physicsObjects) {
  return physicsObjects.reduce((cur, p) => (
    getGravitationalForce(this, p) > getGravitationalForce(this, cur)
      ? p : cur
  ))
}

export function getRandomPosition(p) {
  const angle = 2 * Math.PI * Math.random()
  const distance = p.rad * Math.random()
  const x = p.pos.x + distance * Math.cos(angle)
  const y = p.pos.y + distance * Math.sin(angle)
  return { x, y }
}
