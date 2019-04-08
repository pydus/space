import Physics from './engine/Physics'

export default ({ x, y, angle, speed, range, rad, color = '#4e8', time = 60 }) => ({
  angle,
  speed,
  range,
  color,
  time,

  physics: Physics({
    pos: {
      x,
      y
    },
    angle,
    rad,
    vel: {
      x: speed * Math.cos(angle),
      y: speed * Math.sin(angle)
    }
  }),

  done: false,

  destroy() {
    this.done = true
  },

  update() {
    if (this.time <= 0) {
      this.destroy()
    } else {
      this.time--
      this.physics.update()
    }
  },

  render({ setLine, drawCircle }) {
    const { x, y } = this.physics.pos
    const rad = this.physics.rad
    setLine(this.color, this.physics.width)
    const destX = x + rad * Math.cos(this.angle)
    const destY = y + rad * Math.sin(this.angle)
    drawCircle(destX, destY, rad)
  }
})
