export default class Space {
  constructor() {
    this.planets = []
    this.players = []
  }

  addPlanet(planet) {
    this.planets.push(planet)
  }

  addPlayer(player) {
    this.players.push(player)
  }

  update() {
    this.planets.forEach(planet => planet.update())
    this.players.forEach(player => player.update())
  }

  render(view) {
    this.planets.forEach(planet => planet.render(view))
    this.players.forEach(player => player.render(view))
  }
}
