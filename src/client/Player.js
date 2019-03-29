import keys from './keys'

export default class Player {
  constructor(x, y, color = '#ea8') {
    this.x = x
    this.y = y
    this.radius = 20
    this.color = color
  }

  update() {

  }

  render({ fillCircle, setFillStyle }) {
    setFillStyle(this.color)
    fillCircle(this.x, this.y, this.radius)
  }
}
