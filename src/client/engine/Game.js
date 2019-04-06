import Loop from './Loop'

export default ({ loop, view }) => {
  const game = {
    loop,
    view,
    isRunning: false,
    children: [],
    updatable: [],

    init() {
      this.loop.add(this)
    },

    start() {
      this.loop.start()
    },

    stop() {
      this.loop.stop()
    },

    add(child) {
      this.children.push(child)
    },

    addUpdatable(updatable) {
      this.updatable.push(updatable)
    },

    update() {
      this.children.forEach(child => child.update())
      this.updatable.forEach(updatable => updatable.update())
    },

    render() {
      this.view.clear()
      this.children.forEach(child => child.render(this.view))
    }
  }

  game.init()

  return game
}
