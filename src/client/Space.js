export default class Space {
  constructor() {
    this.planets = []
  }

  add(planet) {
    this.planets.push(planet)
  }

  update() {
    this.planets.forEach(planet => planet.update())
  }

  render(view) {
    this.planets.forEach(planet => planet.render(view))
  }
}
