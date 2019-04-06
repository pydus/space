import Physics from './engine/Physics'

export default ({ x, y, points = 5, rad = 5, color = '#eaaa4f' }) => ({
  points,
  color,

  offsetAngle: 0,
  offsetDistance: 0,
  pickupDistance: 20,
  visibleDistance: 400,

  physics: Physics({ pos: { x, y }, rad }),

  render: function({ setLine, drawCircle }) {
    setLine(this.color)
    drawCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
  }
})
