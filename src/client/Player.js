export default ({x, y, color = '#ea8'}) => ({
  x,
  y,
  color,
  radius: 20,
  isMoving: { up: false, down: false, left: false, right: false },
  maxVelocity: 2,
  velocity: { x: 0, y: 0 },
  acceleration: 0.05,
  deceleration: 0.05,

  runCommand: function(command, isKeyDown) {
    switch (command) {
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        this.controlMovement(command, isKeyDown)
        break
      default:
    }
  },

  controlMovement: function(direction, isKeyDown) {
    this.isMoving[direction] = isKeyDown
  },

  move: function() {
    this.x += this.velocity.x
    this.y += this.velocity.y
  },

  updateVelocities: function() {
    if (this.isMoving.up) {
      this.velocity.y -= this.acceleration
    } else if (this.velocity.y < 0) {
      this.velocity.y += this.deceleration
    }

    if (this.isMoving.down) {
      this.velocity.y += this.acceleration
    } else if (this.velocity.y > 0) {
      this.velocity.y -= this.deceleration
    }

    if (this.isMoving.left) {
      this.velocity.x -= this.acceleration
    } else if (this.velocity.x < 0) {
      this.velocity.x += this.deceleration
    }

    if (this.isMoving.right) {
      this.velocity.x += this.acceleration
    } else if (this.velocity.x > 0) {
      this.velocity.x -= this.deceleration
    }
  },

  putVelocitiesInBounds: function() {
    if (this.velocity.y < -this.maxVelocity) {
      this.velocity.y = -this.maxVelocity
    }
    if (this.velocity.y > this.maxVelocity) {
      this.velocity.y = this.maxVelocity
    }
    if (this.velocity.x < -this.maxVelocity) {
      this.velocity.x = -this.maxVelocity
    }
    if (this.velocity.x > this.maxVelocity) {
      this.velocity.x = this.maxVelocity
    }
  },

  collide: function(thing, distance, angle) {
    this.x = thing.x + (thing.radius + this.radius) * Math.cos(angle)
    this.y = thing.y + (thing.radius + this.radius) * Math.sin(angle)
  },

  update: function() {
    this.updateVelocities()
    this.putVelocitiesInBounds()
    this.move()
  },

  render: function({ fillCircle, setFillStyle }) {
    setFillStyle(this.color)
    fillCircle(this.x, this.y, this.radius)
  }
})
