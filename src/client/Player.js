import { getDistance } from './engine/tools'
import { PlayerPhysics } from './physics'
import Drill from './Drill'
import MineralCarrier from './MineralCarrier'

export default ({
  drill = Drill({ origin: null }),
  color = '#eaaa4f',
  x,
  y,
  rad = 20,
  mass,
  feelsGravity = true,
  originLineColor = color,
  shouldRenderOriginLine = false
}) => ({
  drill,
  color,
  feelsGravity,
  originLineColor,
  shouldRenderOriginLine,
  surfaceThickness: 5,
  isEntering: false,
  isInside: false,
  isOnSurface: false,
  isUnderGround: false,
  hasRoomToBuildSpaceship: false,
  wantsToBuildSpaceship: false,

  mineralCarrier: MineralCarrier({ x, y, rad, max: 3 }),

  physics: PlayerPhysics({ x, y, rad, mass }),

  controlMovement(direction, isKeyDown) {
    this.physics.setMoving(direction, isKeyDown)
  },

  addPoints(points) {
    this.points += points
  },

  setWantsToBuildSpaceship(wantsToBuildSpaceship) {
    this.wantsToBuildSpaceship = wantsToBuildSpaceship
  },

  enterDrill() {
    if (!this.isInside && this.isOnSurface) {
      this.drill.physics.setPos({
        x: this.physics.pos.x,
        y: this.physics.pos.y
      })
      this.drill.enter(this)
      this.enter()
      this.setIsUnderGround(true)
    }
  },

  exitDrill() {
    this.drill.exit(this)
    this.setIsUnderGround(false)
    this.exit()
  },

  getOriginInfo() {
    const origin = this.physics.controlSystem.origin
    if (!origin) return
    const { x, y, rad } = origin
    const distance = getDistance({ pos: { x, y } }, this.physics)
    return { origin, x, y, rad, distance }
  },

  setIsOnSurface(isOnSurface) {
    if (this.isOnSurface !== isOnSurface) {
      this.physics.setVel({ x: 0, y: 0 })
      this.isOnSurface = isOnSurface
    }
  },

  setIsUnderGround(isUnderGround) {
    if (this.isUnderGround === isUnderGround) return

    this.isUnderGround = isUnderGround

    if (isUnderGround) {
      this.feelsGravity = false
      this.shouldRenderOriginLine = true
    } else {
      this.feelsGravity = true
      this.shouldRenderOriginLine = false
    }
  },

  checkIfOnSurface() {
    const originInfo = this.getOriginInfo()
    if (!originInfo) return
    const { rad, distance } = originInfo
    const distanceToPlayerEdge = Math.ceil(distance - this.physics.rad)

    if (
      distanceToPlayerEdge >= rad - this.surfaceThickness
      && distanceToPlayerEdge <= rad + this.surfaceThickness
    ) {
      this.setIsOnSurface(true)
    } else {
      this.setIsOnSurface(false)
    }
  },

  checkIfWentAboveGround() {
    const originInfo = this.getOriginInfo()
    if (!originInfo) return
    const { x, y, rad, distance } = originInfo
    const distanceToPlayerEdge = Math.ceil(distance - this.physics.rad)

    if (this.isUnderGround && distanceToPlayerEdge > rad) {
      this.exitDrill()
    }
  },

  setController(controller) {
    this.controller = controller
  },

  setIsEntering(isEntering) {
    this.isEntering = isEntering
  },

  enter() {
    this.isInside = true
    this.isEntering = false
  },

  exit() {
    this.isInside = false
    this.isEntering = false
  },

  update() {
    this.checkIfOnSurface()
    this.checkIfWentAboveGround()
    this.drill.update()
    this.physics.update()
    this.mineralCarrier.physics.setPos(this.physics.pos)
    this.mineralCarrier.update()
  },

  renderOriginLine({ setLine, drawLine }) {
    setLine(this.originLineColor)
    drawLine(
      this.physics.pos.x,
      this.physics.pos.y,
      this.physics.controlSystem.origin.x,
      this.physics.controlSystem.origin.y
    )
  },

  render(view) {
    const { setLine, drawCircle } = view
    const controlSystem = this.physics.controlSystem

    this.mineralCarrier.render(view)

    setLine(this.color)
    drawCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)

    if (this.shouldRenderOriginLine && controlSystem && controlSystem.origin) {
      this.renderOriginLine(view)
    }
  }
})
