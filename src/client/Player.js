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

  render: function({ fillCircle, setFillStyle }) {
    setFillStyle(this.color)
    fillCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
  }
})
