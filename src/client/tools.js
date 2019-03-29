export function getDistance(c1, c2) {
  return ((c1.y - c2.y) ** 2 + (c1.x - c2.x) ** 2) ** 0.5
}

export function getAngle(c1, c2) {
  return Math.atan2((c2.y - c1.y), (c2.x - c1.x))
}

export default {
  getDistance,
  getAngle
}
