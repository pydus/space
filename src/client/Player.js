import { getAngle, getDistance } from './engine/tools'
import { PlayerPhysics } from './physics'
import Drill from './Drill'

export default ({
  drill = Drill({ power: 5 }),
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

  physics: PlayerPhysics({ x, y, rad, mass }),

  controlMovement: function(direction, isKeyDown) {
    this.physics.setMoving(direction, isKeyDown)
  },

  enterDrill: function() {
    if (!this.isInside && this.isOnSurface) {
      this.drill.physics.setPos({
        x: this.physics.pos.x,
        y: this.physics.pos.y
      })
      this.drill.enter(this.physics)
      this.enter()
      this.setIsUnderGround(true)
    }
  },

  exitDrill: function() {
    this.drill.exit(this.physics)
    this.setIsUnderGround(false)
    this.exit()
  },

  getOriginInfo: function() {
    const origin = this.physics.controlSystem.origin
    if (!origin) return
    const { x, y, rad } = origin
    const distance = getDistance({ pos: { x, y } }, this.physics)
    return { origin, x, y, rad, distance }
  },

  setIsOnSurface: function(isOnSurface) {
    if (this.isOnSurface !== isOnSurface) {
      this.physics.setVel({ x: 0, y: 0 })
    }
    this.isOnSurface = isOnSurface
  },

  setIsUnderGround: function(isUnderGround) {
    if (this.isUnderGround === isUnderGround) return

    this.isUnderGround = isUnderGround
    this.physics.setVel({ x: 0, y: 0 })

    if (isUnderGround) {
      this.physics.mobile = false
      this.feelsGravity = false
      this.shouldRenderOriginLine = true
    } else {
      this.physics.mobile = true
      this.feelsGravity = true
      this.shouldRenderOriginLine = false
    }
  },

  checkIfOnSurface: function() {
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

  checkIfWentAboveGround: function() {
    const originInfo = this.getOriginInfo()

    if (!originInfo) return

    const { x, y, rad, distance } = originInfo

    const distanceToPlayerEdge = Math.ceil(distance - this.physics.rad)

    if (this.isUnderGround) {
      if (distanceToPlayerEdge > rad) {
        this.exitDrill()
      }
    }
  },

  setController: function(controller) {
    this.controller = controller
  },

  setIsEntering: function(isEntering) {
    this.isEntering = isEntering
  },

  enter: function() {
    this.isInside = true
    this.isEntering = false
  },

  exit: function() {
    this.isInside = false
    this.isEntering = false
  },

  updateDrill: function() {
    if (this.isOnSurface) {
      if (this.isTryingToDrill && !this.drill.driver) {
        this.drill.enter(this.physics)
        console.log('enter');
        this.setIsUnderGround(true)
      }
    }
    /*
    if (this.physics.controlSystem.isMoving[direction] !== isUsing) {
      this.physics.setMoving(direction, isUsing)
    }*/
  },

  updateVertical: function() {
    if (this.isOnSurface || this.isUnderGround) {
      this.physics.controlSystem.setVertical(true)
    } else if (!this.isUnderGround && !this.isOnSurface) {
      this.physics.controlSystem.setVertical(false)
    }
  },

  update: function() {
    this.checkIfOnSurface()
    this.checkIfWentAboveGround()
    /*this.updateDrill()
    this.updateVertical()*/
    this.drill.update()
    this.physics.update()
  },

  renderOriginLine: function({ setLine, drawLine }) {
    setLine(this.originLineColor)
    drawLine(
      this.physics.pos.x,
      this.physics.pos.y,
      this.physics.controlSystem.origin.x,
      this.physics.controlSystem.origin.y
    )
  },

  render: function(view) {
    const { setLine, drawCircle } = view
    const controlSystem = this.physics.controlSystem

    setLine(this.color)
    drawCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)

    if (this.shouldRenderOriginLine && controlSystem && controlSystem.origin) {
      this.renderOriginLine(view)
    }
  }
})
