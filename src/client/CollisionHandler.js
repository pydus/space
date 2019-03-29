import { getAngle, getDistance } from './tools'

export default ({ world }) => ({
  world,

  areOverlapping: function(c1, c2) {
    const distance = getDistance(c1, c2)
    return distance < c1.radius + c2.radius
  },

  tryCollision: function(thing1, thing2) {
    if (this.areOverlapping(thing1, thing2)) {
      const distance = getDistance(thing1, thing2)
      const angle = getAngle(thing1, thing2)

      thing1.collide(thing2, distance, angle)
      thing2.collide(thing1, distance, angle)
    }
  },

  update: function() {
    this.world.planets.forEach(planet => {
      this.world.players.forEach(player => {
        this.tryCollision(planet, player)
      })
    })
  }
})
