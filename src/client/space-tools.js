import { getDistance } from './engine/tools'

export const G = 20

export function getGravitationalForce(p1, p2) {
  const distance = getDistance(p1, p2)
  return G * p1.mass * p2.mass / (distance ** 2)
}
