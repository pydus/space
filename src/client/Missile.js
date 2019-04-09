import Physics from './engine/Physics'
import MineralCarrier from './MineralCarrier'

export default ({
  x,
  y,
  angle,
  speed,
  range,
  rad,
  color = '#4e8',
  time = 60
}) => ({
  angle,
  speed,
  range,
  color,
  time,

  physics: Physics({
    pos: { x, y },
    angle,
    rad,
    vel: {
      x: speed * Math.cos(angle),
      y: speed * Math.sin(angle)
    }
  }),

  done: false,

  mineralCarrier: MineralCarrier({ x, y, rad, angle }),

  destroy() {
    this.done = true
  },

  update() {
    if (this.time <= 0) {
      this.destroy()
    } else {
      this.time--
      this.physics.update()
      this.mineralCarrier.physics.setPos(this.physics.pos)
      this.mineralCarrier.physics.setAngle(this.physics.angle)
      this.mineralCarrier.update()
    }
  },

  render(view) {
    const { setLine, drawCircle } = view
    const { x, y } = this.physics.pos
    const rad = this.physics.rad
    this.mineralCarrier.render(view)
    setLine(this.color, this.physics.width)
    drawCircle(x, y, rad)
  }
})
