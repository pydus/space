export default class Space {
  constructor(x, y, radius) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = '#e48'
  }

  update() {

  }

  render(view) {
    const { ctx } = view

    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
  }
}
