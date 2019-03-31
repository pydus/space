export default ({
  color = '#ea8',
  physics,
  originLineColor ='#48e',
  drawOriginLine = false
}) => ({
  color,
  physics,
  originLineColor,
  drawOriginLine,
  isEntering: false,
  isInside: false,

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
    if (this.physics.controlSystem.origin && this.drawOriginLine) {
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
