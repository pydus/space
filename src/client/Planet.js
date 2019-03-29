import { getAngle, getDistance } from './tools'

export default class Planet {
  constructor(x, y, radius) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = '#e48'
  }

  attract(thing, mag) {
    const angle = getAngle(this, thing)
    const distance = getDistance(this, thing)
    thing.x -= mag * Math.cos(angle) / distance
    thing.y -= mag * Math.sin(angle) / distance
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
