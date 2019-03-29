export default ({ x, y, color = '#ea8', velocityHandler }) => ({
  x,
  y,
  color,
  velocityHandler,
  radius: 20,
  maxVelocity: 2,

  controlMovement: function(direction, isKeyDown) {
    this.velocityHandler.isMoving[direction] = isKeyDown
  },

  updatePosition: function() {
    this.x += this.velocityHandler.x
    this.y += this.velocityHandler.y
  },

  collide: function(thing, distance, angle) {
    this.x = thing.x + (thing.radius + this.radius) * Math.cos(angle)
    this.y = thing.y + (thing.radius + this.radius) * Math.sin(angle)
  },

  update: function() {
    this.velocityHandler.update()
    this.updatePosition()
  },

  render: function({ fillCircle, setFillStyle }) {
    setFillStyle(this.color)
    fillCircle(this.x, this.y, this.radius)
  }
})
