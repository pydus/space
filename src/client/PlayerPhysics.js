import Physics from './Physics'
import Velocity from './Velocity'
import { hardCollide } from './collisions'

export default ({ x, y, radius }) => {
  function collide(...args) {
    return hardCollide.apply(this, args)
  }

  const velocity = Velocity({ acc: 0.1, dec: 0.1 })

  const physics = Physics({ pos: { x, y }, radius, velocity, collide })

  return physics
}
