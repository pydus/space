const UPDATES_PER_SECOND = 60
const MS_BETWEEN_UPDATES = 1000 / UPDATES_PER_SECOND

export default () => ({
  isRunning: false,
  children: [],
  canvas: null,

  start: function() {
    this.isRunning = true
    this.loop()
  },

  stop: function() {
    this.isRunning = false
  },

  add: function(child) {
    this.children.push(child)
  },

  loop: function() {
    this.tick()
    this.requestFrame()
  },

  queueNextTick: function() {
    setTimeout(() => {
      if (this.isRunning) {
        this.tick()
      }
    }, MS_BETWEEN_UPDATES)
  },

  tick: function() {
    this.update()
    this.queueNextTick()
  },

  renderTick: function() {
    this.render()

    if (this.isRunning) {
      this.requestFrame()
    }
  },

  requestFrame: function() {
    requestAnimationFrame(this.renderTick.bind(this))
  },

  update: function() {
    this.children.forEach(child => child.update())
  },

  render: function() {
    this.children.forEach(child => child.render())
  }
})
