import Physics from './engine/Physics'
import LaserBeam from './LaserBeam'

export default ({
  pos,
  angle,
  rangePerMineral = 100,
  widthPerMineral  = 10
}) => ({
  rangePerMineral,
  widthPerMineral,

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

  render(view) {
    if (this.beam) {
      this.beam.render(view)
    }
  }
})
