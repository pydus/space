const UPDATES_PER_SECOND = 60
const MS_BETWEEN_UPDATES = 1000 / UPDATES_PER_SECOND

export default class Game {
  constructor() {
    this.isRunning = false
  }

  start() {
    this.isRunning = true
    this.tick()
  }

  stop() {
    this.isRunning = false
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
    this.requestFrame()
    this.queueNextTick()
  }

  requestFrame() {
    requestAnimationFrame(this.draw)
  }

  update() {

  }

  draw() {

  }
}
