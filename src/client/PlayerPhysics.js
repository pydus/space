import Physics from './Physics'
import Velocity from './Velocity'
import XYControlSystem from './XYControlSystem'
import { hardCollide } from './collisions'

export default ({ x, y, radius }) => {
  function collide(...args) {
    return hardCollide.apply(this, args)
  }

  const playerPhysics = {
    origin: null
  }

  const controlSystem = XYControlSystem()

  const velocity = Velocity({ acc: 0.1, dec: 0.1, controlSystem })

  const physics = Physics({ pos: { x, y }, radius, velocity, collide })

  return Object.assign(playerPhysics, physics)
}
