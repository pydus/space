import Loop from './Loop'

export default class Game {
  constructor(loop, view) {
    this.loop = loop
    this.view = view
    this.isRunning = false
    this.children = []
    this.init()
  }

  init() {
    this.loop.add(this)
  }

  start() {
    this.loop.start()
  }

  stop() {
    this.loop.stop()
  }

  add(child) {
    this.children.push(child)
  }

  setCollisionHandler(collisionHandler) {
    this.collisionHandler = collisionHandler
  }

  update() {
    this.children.forEach(child => child.update())

    if (this.collisionHandler) {
      this.collisionHandler.update()
    }
  }

  render() {
    this.view.clear()
    this.children.forEach(child => child.render(this.view))
  }
}
