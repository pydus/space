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
        const magnitude = planet.physics.radius
        planet.physics.attract(player.physics, magnitude)
      })
    })
  },

  handlePlayerOrigins: function() {
    this.players.forEach(player => {
      const findOrigin = player.physics.findOrigin
      if (findOrigin) {
        findOrigin.call(player.physics, this.planets)
      }
    })
  },

  update: function() {
    this.planets.forEach(planet => planet.update())
    this.players.forEach(player => player.update())
    this.handleGravity()
    this.handlePlayerOrigins()
  },

  render: function(view) {
    this.planets.forEach(planet => planet.render(view))
    this.players.forEach(player => player.render(view))
  }
})
