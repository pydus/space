export default ({
  color = '#ea8',
  physics
}) => ({
  color,
  physics,

  controlMovement: function(direction, isKeyDown) {
    this.physics.setMoving(direction, isKeyDown)
  },

  update: function() {
    this.physics.update()
  },

  render: function({ drawCircle, setStrokeStyle, drawLine }) {
    setStrokeStyle(this.color)
    drawCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
    if (this.physics.controlSystem.origin) {
      setStrokeStyle('#48e')
      drawLine(
        this.physics.pos.x,
        this.physics.pos.y,
        this.physics.controlSystem.origin.pos.x,
        this.physics.controlSystem.origin.pos.y
      )
    }
  }
})
