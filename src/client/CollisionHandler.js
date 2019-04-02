import { areOverlapping } from './engine/tools'

// TODO: only accept physics objects of world, not entire world
export default ({ world }) => ({
  world,

  tryCollision: function(p1, p2) {
    if (areOverlapping(p1, p2)) {
      p1.collideWith(p2)
      p2.collideWith(p1)
    }
  },

  update: function() {
    this.world.planets.forEach(planet => {
      this.world.players.forEach(player => {
        this.tryCollision(planet.physics, player.physics)
      })
      this.world.spaceships.forEach(spaceship => {
        this.tryCollision(planet.physics, spaceship.physics)
        spaceship.engine.flame.particles.forEach(particle => {
          this.tryCollision(planet.physics, particle.physics)
        })
      })
    })
  }
})
