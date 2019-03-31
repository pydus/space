import Physics from './Physics'
import XYControlSystem from './XYControlSystem'
import OriginControlSystem from './OriginControlSystem'
import OriginFinder from './OriginFinder'
import { hardCollide } from './engine/collisions'

export default ({ x, y, rad = 20, mass = 100 }) => {
  function collide(...args) {
    return hardCollide.apply(this, args)
  }

  const originFinder = OriginFinder()
  const controlSystem = OriginControlSystem({ originFinder })
  const physics = Physics({ pos: { x, y }, rad, mass, collide, controlSystem })

  return Object.assign({}, physics)
}
