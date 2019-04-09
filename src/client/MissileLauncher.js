import Physics from './engine/Physics'
import Missile from './Missile'

export default ({
  pos,
  angle,
  targetMineralCarrier,
  missileSpeed = 20,
  rangePerMineral = 100,
  radPerMineral = 10,
  crosshairColor = '#fff'
}) => ({
  targetMineralCarrier,
  missileSpeed,
  rangePerMineral,
  radPerMineral,
  crosshairColor,

  physics: Physics({ pos, angle }),
  missile: null,
  loaded: [],

  getRange() {
    return this.rangePerMineral * this.loaded.length
  },

  getMissileRadius() {
    return this.radPerMineral * this.loaded.length
  },

  load(mineral) {
    if (!this.missile) {
      this.loaded.push(mineral)
      return true
    }
    return false
  },

  fire() {
    if (this.missile || this.loaded.length < 1) return false

    const { x, y } = this.physics.pos
    const { angle } = this.physics
    const range = this.getRange()
    const rad = this.getMissileRadius()
    const missile = Missile({
      x,
      y,
      angle,
      speed: this.missileSpeed,
      range,
      rad
    })

    this.missile = missile

    return true
  },

  transferCaughtMinerals() {
    if (this.targetMineralCarrier) {
      this.missile.mineralCarrier.minerals.forEach(mineral => {
        this.targetMineralCarrier.add(mineral)
      })
    }
  },

  returnLoadedMinerals() {
    if (this.targetMineralCarrier) {
      this.loaded.forEach(mineral => {
        this.targetMineralCarrier.add(mineral)
      })
    }
  },

  updateMissile() {
    if (!this.missile) return

    if (this.missile.done) {
      if (this.missile.mineralCarrier.minerals.length > 0) {
        this.returnLoadedMinerals()
        this.transferCaughtMinerals()
      }
      this.loaded = []
      this.missile = null
    } else {
      this.missile.update()
    }
  },

  update() {
    this.updateMissile()
  },

  renderCrosshair({ setLine, drawLine }) {
    const { pos, angle } = this.physics
    const range = this.getRange()
    const width = this.getMissileRadius()
    const x1 = pos.x + width * Math.cos(angle - Math.PI / 2)
    const y1 = pos.y + width * Math.sin(angle - Math.PI / 2)
    const x2 = x1 + range * Math.cos(angle)
    const y2 = y1 + range * Math.sin(angle)
    const x3 = pos.x + width * Math.cos(angle + Math.PI / 2)
    const y3 = pos.y + width * Math.sin(angle + Math.PI / 2)
    const x4 = x3 + range * Math.cos(angle)
    const y4 = y3 + range * Math.sin(angle)
    setLine(this.crosshairColor)
    drawLine(x1, y1, x2, y2)
    drawLine(x2, y2, x4, y4)
    drawLine(x4, y4, x3, y3)
    drawLine(x3, y3, x1, y1)
  },

  render(view) {
    if (this.missile) {
      this.missile.render(view)
    } else {
      this.renderCrosshair(view)
    }
  }
})
