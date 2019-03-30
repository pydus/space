import Loop from './Loop'

export default ({ loop, view }) => {
  const game = {
    loop,
    view,
    isRunning: false,
    children: [],
    updatable: [],

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

    addUpdatable: function(updatable) {
      this.updatable.push(updatable)
    },

    update: function() {
      this.children.forEach(child => child.update())
      this.updatable.forEach(updatable => updatable.update())
    },

    render: function() {
      this.view.clear()
      this.children.forEach(child => child.render(this.view))
    }
  }

  game.init()

  return game
}
