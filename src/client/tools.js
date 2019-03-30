export function getDistance(p1, p2) {
  return ((p1.pos.y - p2.pos.y) ** 2 + (p1.pos.x - p2.pos.x) ** 2) ** 0.5
}

export function getAngle(p1, p2) {
  return Math.atan2(p2.pos.y - p1.pos.y, p2.pos.x - p1.pos.x)
}

export default {
  getDistance,
  getAngle
}
