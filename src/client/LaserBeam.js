export default ({ x, y, angle, range, width, color = '#4e8', time = 60 }) => ({
  x,
  y,
  angle,
  range,
  width,
  color,
  time,

  done: false,

  destroy() {
    this.done = true
  },

  update() {
    if (this.time <= 0) {
      this.destroy()
    } else {
      this.time--
    }
  },

  render({ setLine, drawLine }) {
    setLine(this.color, this.width)
    const destX = this.x + this.range * Math.cos(this.angle)
    const destY = this.y + this.range * Math.sin(this.angle)
    drawLine(x, y, destX, destY)
  }
})
