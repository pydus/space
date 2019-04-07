import Physics from './engine/Physics'
import LaserBeam from './LaserBeam'

export default ({
  pos,
  angle,
  rangePerMineral = 100,
  widthPerMineral  = 10,
  crosshairColor = '#fff'
}) => ({
  rangePerMineral,
  widthPerMineral,
  crosshairColor,

  physics: Physics({ pos, angle }),

  beam: null,
  loaded: [],

  getRange() {
    return this.rangePerMineral * this.loaded.length
  },

  getBeamWidth() {
    return this.widthPerMineral * this.loaded.length
  },

  load(mineral) {
    this.loaded.push(mineral)
  },

  fire() {
    const { x, y } = this.physics.pos
    const { angle } = this.physics
    const range = this.getRange()
    const width = this.getBeamWidth()
    const beam = LaserBeam({ x, y, angle, range, width })
    this.beam = beam
    this.loaded = []
  },

  updateLaserBeam() {
    if (!this.beam) return

    if (this.beam.done) {
      this.beam = null
    } else {
      this.beam.update()
    }
  },

  update() {
    this.updateLaserBeam()
  },

  renderCrosshair({ setLine, drawLine }) {
    const { pos, angle } = this.physics
    const range = this.getRange()
    const width = this.getBeamWidth()
    const x = pos.x + range * Math.cos(angle)
    const y = pos.y + range * Math.sin(angle)
    setLine(this.crosshairColor, width)
    drawLine(pos.x, pos.y, x, y)
  },

  render(view) {
    this.renderCrosshair(view)
    if (this.beam) {
      this.beam.render(view)
    }
  }
})
