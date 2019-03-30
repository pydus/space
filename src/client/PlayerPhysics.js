import Physics from './Physics'
import XYControlSystem from './XYControlSystem'
import OriginControlSystem from './OriginControlSystem'
import OriginFinder from './OriginFinder'
import { hardCollide } from './collisions'

export default ({ x, y, rad }) => {
  function collide(...args) {
    return hardCollide.apply(this, args)
  }

  const originFinder = OriginFinder()
  const controlSystem = OriginControlSystem({ originFinder, acc: 0.1, dec: 0.1 })
  const physics = Physics({ pos: { x, y }, rad, collide, controlSystem })

  return Object.assign({}, physics)
}
