import Physics from './Physics'
import Velocity from './Velocity'

export default ({ x, y, radius }) => {
  function collide(other, distance, angle) {
    this.pos.x = other.pos.x + (other.radius + this.radius) * Math.cos(angle)
    this.pos.y = other.pos.y + (other.radius + this.radius) * Math.sin(angle)
  }

  const velocity = Velocity({ acc: 0.1, dec: 0.1 })

  const physics = Physics({ pos: { x, y }, radius, velocity, collide })

  return physics
}
