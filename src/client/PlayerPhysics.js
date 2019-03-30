import Physics from './Physics'
import XYControlSystem from './XYControlSystem'
import { hardCollide } from './collisions'

export default ({ x, y, rad }) => {
  function collide(...args) {
    return hardCollide.apply(this, args)
  }

  const controlSystem = XYControlSystem({ acc: 0.1, dec: 0.1 })
  const physics = Physics({ pos: { x, y }, rad, collide, controlSystem })

  return Object.assign({}, physics)
}
