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
        planet.physics.attract(player.physics)
      })
    })
  },

  handlePlayerOrigins: function() {
    this.players.forEach(player => {
      const originFinder = player.physics.controlSystem.originFinder
      if (originFinder) {
        const planets = this.planets.map(planet => planet.physics)
        originFinder.run.call(player.physics, planets)
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
