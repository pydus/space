export default class Planet {
  constructor(x, y, radius) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = '#e48'
  }

  collide() {

  }

  update() {

  }

  render({ fillCircle, setFillStyle }) {
    setFillStyle(this.color)
    fillCircle(this.x, this.y, this.radius)
  }
}
