import ListenerService from './engine/ListenerService'
import { getDistance } from './engine/tools'

export default () => {
  const listenerService = ListenerService()

  function getClosest(physicsObjects) {
    return physicsObjects.reduce((cur, p) => (
      getDistance(this, p) < getDistance(this, cur) ? p : cur
    ))
  }

  const originFinder = {
    listen: listenerService.listen.bind(listenerService),

    stopListening: listenerService.stopListening.bind(listenerService),

    run: function(physicsObjects) {
      const closest = getClosest.call(this, physicsObjects)
      const distance = getDistance(this, closest)
      listenerService.notifyListeners(closest)
    }
  }

  return originFinder
}
