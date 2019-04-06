import { getRandomPosition } from './space-tools'
import { getDistance, getAngle } from './engine/tools'
import Physics from './engine/Physics'

export default ({ x, y, points = 5, rad = 5, color = '#eaaa4f' }) => ({
  points,
  color,

  offsetAngle: 0,
  offsetDistance: 0,
  pickupDistance: 20,
  visibleDistance: 400,

  physics: Physics({ pos: { x, y }, rad }),

  setReference: function(ref) {
    const rad = ref.physics.rad - this.physics.rad
    const pos = getRandomPosition({ ...ref.physics, rad })
    const offsetAngle = getAngle({ pos }, ref.physics)
    const offsetDistance = getDistance({ pos }, ref.physics)
    this.offsetAngle = offsetAngle
    this.offsetDistance = offsetDistance
  },

  render: function({ setLine, drawCircle }) {
    setLine(this.color)
    drawCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
  }
})
