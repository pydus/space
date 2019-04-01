import { PlayerPhysics } from './Physics'

export default ({
  color = '#4e8',
  x,
  y,
  rad = 20,
  mass,
  originLineColor ='#48e',
  drawOriginLine = false
}) => ({
  color,
  originLineColor,
  drawOriginLine,
  isEntering: false,
  isInside: false,

  physics: PlayerPhysics({ x, y, rad, mass }),

  controlMovement: function(direction, isKeyDown) {
    this.physics.setMoving(direction, isKeyDown)
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

  render: function({ drawCircle, setStrokeStyle, drawLine }) {
    setStrokeStyle(this.color)
    drawCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)

    const controlSystem = this.physics.controlSystem

    if (controlSystem && controlSystem.origin && this.drawOriginLine) {
      setStrokeStyle(this.originLineColor)
      drawLine(
        this.physics.pos.x,
        this.physics.pos.y,
        this.physics.controlSystem.origin.pos.x,
        this.physics.controlSystem.origin.pos.y
      )
    }
  }
})
