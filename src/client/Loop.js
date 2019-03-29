const UPDATES_PER_SECOND = 60
const MS_BETWEEN_UPDATES = 1000 / UPDATES_PER_SECOND

export default class Loop {
  constructor() {
    this.isRunning = false
    this.children = []
    this.canvas = null
    this.renderTick = this.renderTick.bind(this)
  }

  start() {
    this.isRunning = true
    this.loop()
  }

  stop() {
    this.isRunning = false
  }

  add(child) {
    this.children.push(child)
  }

  loop() {
    this.tick()
    this.requestFrame()
  }

  queueNextTick() {
    setTimeout(() => {
      if (this.isRunning) {
        this.tick()
      }
    }, MS_BETWEEN_UPDATES)
  }

  tick() {
    this.update()
    this.queueNextTick()
  }

  renderTick() {
    this.render()

    if (this.isRunning) {
      this.requestFrame()
    }
  }

  requestFrame() {
    requestAnimationFrame(this.renderTick)
  }

  update() {
    this.children.forEach(child => child.update())
  }

  render() {
    this.children.forEach(child => child.render())
  }
}
