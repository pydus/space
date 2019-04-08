import Physics from './engine/Physics'
import Missile from './Missile'

export default ({
  pos,
  angle,
  missileSpeed = 20,
  rangePerMineral = 100,
  radPerMineral = 10,
  crosshairColor = '#fff'
}) => ({
  missileSpeed,
  rangePerMineral,
  radPerMineral,
  crosshairColor,

  physics: Physics({ pos, angle }),

  beam: null,
  loaded: [],

  getRange() {
    return this.rangePerMineral * this.loaded.length
  },

  getMissileRadius() {
    return this.radPerMineral * this.loaded.length
  },

  load(mineral) {
    this.loaded.push(mineral)
  },

  fire() {
    const { x, y } = this.physics.pos
    const { angle } = this.physics
    const range = this.getRange()
    const rad = this.getMissileRadius()
    const beam = Missile({ x, y, angle, speed: this.missileSpeed, range, rad })
    this.beam = beam
    this.loaded = []
  },

  updateMissile() {
    if (!this.beam) return

    if (this.beam.done) {
      this.beam = null
    } else {
      this.beam.update()
    }
  },

  update() {
    this.updateMissile()
  },

  renderCrosshair({ setLine, drawLine }) {
    const { pos, angle } = this.physics
    const range = this.getRange()
    const width = this.getMissileRadius()
    const x1 = pos.x + (width / 2) * Math.cos(angle - Math.PI / 2)
    const y1 = pos.y + (width / 2) * Math.sin(angle - Math.PI / 2)
    const x2 = x1 + range * Math.cos(angle)
    const y2 = y1 + range * Math.sin(angle)
    const x3 = pos.x + (width / 2) * Math.cos(angle + Math.PI / 2)
    const y3 = pos.y + (width / 2) * Math.sin(angle + Math.PI / 2)
    const x4 = x3 + range * Math.cos(angle)
    const y4 = y3 + range * Math.sin(angle)
    setLine(this.crosshairColor)
    drawLine(x1, y1, x2, y2)
    drawLine(x2, y2, x4, y4)
    drawLine(x4, y4, x3, y3)
    drawLine(x3, y3, x1, y1)
  },

  render(view) {
    this.renderCrosshair(view)
    if (this.beam) {
      this.beam.render(view)
    }
  }
})
