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

  handleGravity() {
    this.planets.forEach(planet => {
      this.players.forEach(player => {
        const magnitude = planet.radius
        planet.attract(player, magnitude)
      })
    })
  }

  update() {
    this.planets.forEach(planet => planet.update())
    this.players.forEach(player => player.update())
    this.handleGravity()
  }

  render(view) {
    this.planets.forEach(planet => planet.render(view))
    this.players.forEach(player => player.render(view))
  }
}
