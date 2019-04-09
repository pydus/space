import Physics from './engine/Physics'
import MineralCarrier from './MineralCarrier'
import { getDistance } from './engine/tools'

export default ({
  x,
  y,
  angle,
  speed,
  range,
  rad,
  maxMinerals,
  color = '#4e8',
  time = Infinity
}) => ({
  angle,
  speed,
  range,
  color,
  time,

  startPos: { x, y },

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

  mineralCarrier: MineralCarrier({ x, y, rad, angle, max: maxMinerals }),

  destroy() {
    this.done = true
  },

  getDistanceFromStart() {
    return getDistance(this.physics, { pos: this.startPos })
  },

  update() {
    if (this.time <= 0 || this.getDistanceFromStart() > this.range) {
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
