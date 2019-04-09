import { PlanetPhysics } from './physics'
import Mineral from './Mineral'
import MineralCarrier from './MineralCarrier'
import { getAngle } from './engine/tools'
import { getRandomPosition } from './space-tools'

export default ({ x, y, rad, mass, color = '#265b8e', fillColor = '#000' }) => {
  const physics = PlanetPhysics({ x, y, rad, mass })

  const planet = {
    physics,
    color,
    fillColor,

    arrowAngle: Math.PI / 3,
    arrowLength: 10,
    counting: false,
    updatesBetweenMinerals: 50000 / (rad ** 0.5),
    updatesUntilMineral: 0,
    initialMinerals: 2,
    visibleMinerals: [],

    mineralCarrier: MineralCarrier({
      max: Math.ceil(physics.rad / 150)
    }),

    init() {
      for (let i = 0; i < this.initialMinerals; i++) {
        const randomMineral = this.createRandomMineral()
        this.mineralCarrier.add(randomMineral)
      }
    },

    setVisibleMinerals(visibleMinerals) {
      this.visibleMinerals = visibleMinerals
    },

    startMineralCountdown() {
      this.counting = true
      this.updatesUntilMineral = this.updatesBetweenMinerals
    },

    createRandomMineral() {
      const { x, y } = getRandomPosition(this.physics)
      const mineral = Mineral({ x, y })
      return mineral
    },

    update() {
      if (
        this.mineralCarrier.minerals.length < this.mineralCarrier.max &&
        this.updatesUntilMineral <= 0
      ) {
        if (this.counting) {
          const randomMineral = this.createRandomMineral()
          this.mineralCarrier.add(randomMineral)
          this.counting = false
        }

        if (this.mineralCarrier.minerals.length < this.mineralCarrier.max) {
          this.startMineralCountdown()
        }
      } else {
        this.updatesUntilMineral--
      }
    },

    renderSurfaceGlow({ setLine, drawLine }) {
      this.mineralCarrier.minerals.forEach(mineral => {
        const angle = getAngle(this.physics, mineral.physics)
        const x = this.physics.pos.x + this.physics.rad * Math.cos(angle)
        const y = this.physics.pos.y + this.physics.rad * Math.sin(angle)
        const x1 = x + this.arrowLength * Math.cos(angle + this.arrowAngle)
        const y1 = y + this.arrowLength * Math.sin(angle + this.arrowAngle)
        const x2 = x + this.arrowLength * Math.cos(angle - this.arrowAngle)
        const y2 = y + this.arrowLength * Math.sin(angle - this.arrowAngle)
        setLine(mineral.color)
        drawLine(x, y, x1, y1)
        drawLine(x, y, x2, y2)
      })
    },

    render(view) {
      const { drawCircle, setLine, setFillStyle, fillCircle } = view
      setFillStyle(this.fillColor)
      fillCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
      setLine(this.color)
      drawCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
      this.visibleMinerals.forEach(mineral => mineral.render(view))
      this.renderSurfaceGlow(view)
    }
  }

  planet.init()

  return planet
}
