import { PlayerPhysics } from './physics'

export default ({
  color = '#eaaa4f',
  x,
  y,
  rad = 20,
  mass,
  originLineColor = color,
  shouldRenderOriginLine = false
}) => ({
  color,
  originLineColor,
  shouldRenderOriginLine,
  isEntering: false,
  isInside: false,

  physics: PlayerPhysics({ x, y, rad, mass }),

  controlMovement: function(direction, isKeyDown) {
    this.physics.setMoving(direction, isKeyDown)
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

  update: function() {
    this.physics.update()
  },

  renderOriginLine: function({ setLine, drawLine }) {
    setLine(this.originLineColor)
    drawLine(
      this.physics.pos.x,
      this.physics.pos.y,
      this.physics.controlSystem.origin.pos.x,
      this.physics.controlSystem.origin.pos.y
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
