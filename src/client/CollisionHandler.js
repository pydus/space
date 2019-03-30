import { getAngle, getDistance } from './tools'

// TODO: only accept physics objects of world, not entire world
export default ({ world }) => ({
  world,

  areOverlapping: function(p1, p2) {
    const distance = getDistance(p1, p2)
    return distance < p1.rad + p2.rad
  },

  tryCollision: function(p1, p2) {
    if (this.areOverlapping(p1, p2)) {
      const distance = getDistance(p1, p2)
      const angle = getAngle(p1, p2)

      p1.collide(p2, angle, distance)
      p2.collide(p1, angle, distance)
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
