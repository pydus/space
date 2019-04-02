import ListenerService from './engine/ListenerService'

export default ({ findOrigin }) => {
  const listenerService = ListenerService()

  const originFinder = {
    findOrigin,

    listen: listenerService.listen.bind(listenerService),

    stopListening: listenerService.stopListening.bind(listenerService),

    run: function(physicsObjects) {
      const origin = originFinder.findOrigin.call(this, physicsObjects)
      listenerService.notifyListeners(origin)
    }
  }

  return originFinder
}
