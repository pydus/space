import { PlanetPhysics } from './physics'
import Mineral from './Mineral'
import { getAngle } from './engine/tools'
import { getRandomPosition } from './space-tools'

export default ({ x, y, rad, mass, color = '#265b8e', fillColor = '#000' }) => {
  const physics = PlanetPhysics({ x, y, rad, mass })

  const planet = {
    physics,
    color,
    fillColor,

    counting: false,
    updatesBetweenMinerals: 50000 / (rad ** 0.5),
    updatesUntilMineral: 0,
    initialMinerals: 2,
    maxMinerals: Math.ceil(physics.rad / 150),
    minerals: [],
    visibleMinerals: [],

    addMineral(mineral) {
      this.minerals.push(mineral)
    },

    init() {
      for (let i = 0; i < this.initialMinerals; i++) {
        const randomMineral = this.createRandomMineral()
        this.addMineral(randomMineral)
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
      if (this.minerals.length < this.maxMinerals && this.updatesUntilMineral <= 0) {
        if (this.counting) {
          const randomMineral = this.createRandomMineral()
          this.addMineral(randomMineral)
          this.counting = false
        }

        if (this.minerals.length < this.maxMinerals) {
          this.startMineralCountdown()
        }
      } else {
        this.updatesUntilMineral--
      }
    },

    renderSurfaceGlow({ setLine, drawCircle }) {
      this.minerals.forEach(mineral => {
        setLine(mineral.color)
        const angle = getAngle(this.physics, mineral.physics)
        const x = this.physics.pos.x + this.physics.rad * Math.cos(angle)
        const y = this.physics.pos.y + this.physics.rad * Math.sin(angle)
        drawCircle(x, y, 5)
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
