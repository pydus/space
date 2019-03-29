import Loop from './Loop'

export default ({ loop, view }) => {
  const loop = {
    loop,
    view,
    isRunning: false,
    children: [],

    init: function() {
      this.loop.add(this)
    },

    start: function() {
      this.loop.start()
    },

    stop: function() {
      this.loop.stop()
    },

    add: function(child) {
      this.children.push(child)
    },

    setCollisionHandler: function(collisionHandler) {
      this.collisionHandler = collisionHandler
    },

    update: function() {
      this.children.forEach(child => child.update())

      if (this.collisionHandler) {
        this.collisionHandler.update()
      }
    },

    render: function() {
      this.view.clear()
      this.children.forEach(child => child.render(this.view))
    }
  }

  loop.init()

  return loop
}
