export default class Player {
  constructor(x, y, color = '#ea8') {
    this.x = x
    this.y = y
    this.color = color
    this.radius = 20
    this.isMoving = {up: false, down: false, left: false, right: false}
    this.maxVelocity = 2
    this.velocity = {x: 0, y: 0}
    this.acceleration = 0.05
    this.runCommand = this.runCommand.bind(this)
  }

  runCommand(command, isKeyDown) {
    switch (command) {
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        this.controlMovement(command, isKeyDown)
        break
      default:
    }
  }

  controlMovement(direction, isKeyDown) {
    this.isMoving[direction] = isKeyDown;
  }

  move() {
    this.x += this.velocity.x
    this.y += this.velocity.y
  }

  updateVelocities() {
    if (this.isMoving.up) {
      this.velocity.y -= this.acceleration
    }
    if (this.isMoving.down) {
      this.velocity.y += this.acceleration
    }
    if (this.isMoving.left) {
      this.velocity.x -= this.acceleration
    }
    if (this.isMoving.right) {
      this.velocity.x += this.acceleration
    }
  }

  putVelocitiesInBounds() {
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
  }

  update() {
    this.updateVelocities()
    this.putVelocitiesInBounds()
    this.move()
  }

  render({ fillCircle, setFillStyle }) {
    setFillStyle(this.color)
    fillCircle(this.x, this.y, this.radius)
  }
}
