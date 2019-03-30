import ListenerService from './engine/ListenerService'
import { getDistance } from './engine/tools'
import { getGravitationalForce } from './space-tools'

export default () => {
  const listenerService = ListenerService()

  function getClosest(physicsObjects) {
    return physicsObjects.reduce((cur, p) => (
      getDistance(this, p) < getDistance(this, cur) ? p : cur
    ))
  }

  function getMostAttractive(physicsObjects) {
    return physicsObjects.reduce((cur, p) => (
      getGravitationalForce(this, p) > getGravitationalForce(this, cur)
        ? p : cur
    ))
  }

  const originFinder = {
    listen: listenerService.listen.bind(listenerService),

    stopListening: listenerService.stopListening.bind(listenerService),

    run: function(physicsObjects) {
      const closest = getMostAttractive.call(this, physicsObjects)
      const distance = getDistance(this, closest)
      listenerService.notifyListeners(closest)
    }
  }

  return originFinder
}
