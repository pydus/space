export default () => ({
  planets: [],
  players: [],

  addPlanet: function(planet) {
    this.planets.push(planet)
  },

  addPlayer: function(player) {
    this.players.push(player)
  },

  handleGravity: function() {
    this.planets.forEach(planet => {
      this.players.forEach(player => {
        const magnitude = planet.radius
        planet.attract(player, magnitude)
      })
    })
  },

  update: function() {
    this.planets.forEach(planet => planet.update())
    this.players.forEach(player => player.update())
    this.handleGravity()
  },

  render: function(view) {
    this.planets.forEach(planet => planet.render(view))
    this.players.forEach(player => player.render(view))
  }
})
