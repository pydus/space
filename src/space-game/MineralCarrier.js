import Physics from '../engine/Physics'

export default ({ x, y, rad, angle = 0, max = Infinity }) => ({
  physics: Physics({
    pos: { x, y },
    rad,
    angle
  }),

  max,
  minerals: [],

  add(mineral) {
    if (this.minerals.length >= this.max) return false
    mineral.setReference(this)
    this.minerals.push(mineral)
    return true
  },

  remove(mineral) {
    const i = this.minerals.indexOf(mineral)
    if (i === -1) return false
    this.minerals.splice(i, 1)
    return true
  },

  updatePositions() {
    this.minerals.forEach(mineral => {
      const p = this.physics
      const angle = p.angle + mineral.offsetAngle
      mineral.physics.setPos({
        x: p.pos.x + mineral.offsetDistance * Math.cos(angle),
        y: p.pos.y + mineral.offsetDistance * Math.sin(angle)
      })
    })
  },

  update() {
    this.updatePositions()
  },

  render(view) {
    this.minerals.forEach(mineral => mineral.render(view))
  }
})
