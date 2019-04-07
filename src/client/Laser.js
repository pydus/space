import Physics from './engine/Physics'

export default ({ x, y, angle, range, width, color = '#4e8', time = 60 }) => ({
  range,
  width,
  color,
  time,

  physics: Physics({ pos: { x, y }, angle }),
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
    const { x, y } = this.physics.pos
    const destX = this.physics.pos.x + this.range * Math.cos(this.physics.angle)
    const destY = this.physics.pos.y + this.range * Math.sin(this.physics.angle)
    drawLine(x, y, destX, destY)
  }
})
