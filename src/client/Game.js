const UPDATES_PER_SECOND = 60
const MS_BETWEEN_UPDATES = 1000 / UPDATES_PER_SECOND

export default class Game {
  constructor() {
    this.isRunning = false
    this.render = this.render.bind(this)
  }

  start() {
    this.isRunning = true
    this.loop()
  }

  stop() {
    this.isRunning = false
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

  requestFrame() {
    requestAnimationFrame(this.render)
  }

  update() {

  }

  render() {

    this.requestFrame()
  }
}
