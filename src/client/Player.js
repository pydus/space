export default ({ x, y, color = '#ea8', velocity }) => ({
  x,
  y,
  color,
  velocity,
  radius: 20,
  maxVelocity: 2,

  controlMovement: function(direction, isKeyDown) {
    this.velocity.isMoving[direction] = isKeyDown
  },

  updatePosition: function() {
    this.x += this.velocity.x
    this.y += this.velocity.y
  },

  collide: function(thing, distance, angle) {
    this.x = thing.x + (thing.radius + this.radius) * Math.cos(angle)
    this.y = thing.y + (thing.radius + this.radius) * Math.sin(angle)
  },

  update: function() {
    this.velocity.update()
    this.updatePosition()
  },

  render: function({ fillCircle, setFillStyle }) {
    setFillStyle(this.color)
    fillCircle(this.x, this.y, this.radius)
  }
})
