import { getAngle, getDistance } from './tools'

// TODO: only accept physics objects of world, not entire world
export default ({ world }) => ({
  world,

  areOverlapping: function(p1, p2) {
    const distance = getDistance(p1, p2)
    return distance < p1.radius + p2.radius
  },

  tryCollision: function(p1, p2) {
    if (this.areOverlapping(p1, p2)) {
      const distance = getDistance(p1, p2)
      const angle = getAngle(p1, p2)

      p1.collide(p2, distance, angle)
      p2.collide(p1, distance, angle)
    }
  },

  update: function() {
    this.world.planets.forEach(planet => {
      this.world.players.forEach(player => {
        this.tryCollision(planet.physics, player.physics)
      })
    })
  }
})
