export default ({ updatesPerSecond, renders = true }) => ({
  updatesPerSecond,
  renders,
  msBetweenUpdates: 1000 / updatesPerSecond,
  isRunning: false,
  children: [],
  canvas: null,

  start() {
    this.isRunning = true
    this.loop()
  },

  stop() {
    this.isRunning = false
  },

  add(child) {
    this.children.push(child)
  },

  loop() {
    this.tick()
    if (this.renders) {
      this.requestFrame()
    }
  },

  queueNextTick() {
    setTimeout(() => {
      if (this.isRunning) {
        this.tick()
      }
    }, this.msBetweenUpdates)
  },

  tick() {
    this.update()
    this.queueNextTick()
  },

  renderTick() {
    this.render()

    if (this.isRunning) {
      this.requestFrame()
    }
  },

  requestFrame() {
    requestAnimationFrame(this.renderTick.bind(this))
  },

  update() {
    this.children.forEach(child => child.update())
  },

  render() {
    this.children.forEach(child => child.render())
  }
})
