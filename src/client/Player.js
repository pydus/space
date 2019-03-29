export default ({ x, y, color = '#ea8', physics }) => ({
  x,
  y,
  color,
  physics,
  radius: 20,
  maxVelocity: 2,

  controlMovement: function(direction, isKeyDown) {
    this.physics.velocity.isMoving[direction] = isKeyDown
  },

  updatePosition: function() {
    this.x += this.physics.velocity.x
    this.y += this.physics.velocity.y
  },

  collide: function(thing, distance, angle) {
    this.x = thing.x + (thing.radius + this.radius) * Math.cos(angle)
    this.y = thing.y + (thing.radius + this.radius) * Math.sin(angle)
  },

  update: function() {
    this.physics.update()
    this.updatePosition()
  },

  render: function({ fillCircle, setFillStyle }) {
    setFillStyle(this.color)
    fillCircle(this.x, this.y, this.radius)
  }
})
