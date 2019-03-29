import Physics from './Physics'
import Velocity from './Velocity'
import XYControlSystem from './XYControlSystem'
import OriginControlSystem from './OriginControlSystem'
import OriginFinder from './OriginFinder'
import { hardCollide } from './collisions'

export default ({ x, y, radius }) => {
  function collide(...args) {
    return hardCollide.apply(this, args)
  }

  const pp = {
    origin: null
  }

  const controlSystem = OriginControlSystem()

  const onOriginChange = o => {
    pp.origin = o
    controlSystem.origin = o
  }

  const originFinder = OriginFinder({ onFind: onOriginChange })
  const velocity = Velocity({ acc: 0.1, dec: 0.1, controlSystem })
  const physics = Physics({ pos: { x, y }, radius, velocity, collide })

  return Object.assign({}, pp, physics, originFinder)
}
