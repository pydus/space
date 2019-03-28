import Loop from './Loop'

export default class Game {
  constructor(loop, canvas) {
    this.loop = loop
    this.canvas = canvas
    this.isRunning = false
    this.children = []
    this.canvas = null
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

  getContext() {
    return this.canvas.getContext('2d')
  }

  update() {
    this.children.forEach(child => child.update())
  }

  render() {
    this.children.forEach(child => child.render())
  }
}
