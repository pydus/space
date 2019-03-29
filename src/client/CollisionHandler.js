export default class CollisionHandler {
  constructor(world) {
    this.world = world
  }

  getDistance(c1, c2) {
    return ((c1.y - c2.y) ** 2 + (c1.x - c2.x) ** 2) ** 0.5
  }

  areOverlapping(c1, c2) {
    const distance = this.getDistance(c1, c2)
    return distance < c1.radius + c2.radius
  }

  getAngle(c1, c2) {
    return Math.atan2((c2.y - c1.y), (c2.x - c1.x))
  }

  tryCollision(thing1, thing2) {
    if (this.areOverlapping(thing1, thing2)) {
      const distance = this.getDistance(thing1, thing2)
      const angle = this.getAngle(thing1, thing2)

      thing1.collide(thing2, distance, angle)
      thing2.collide(thing1, distance, angle)
    }
  }

  update() {
    this.world.planets.forEach(planet => {
      this.world.players.forEach(player => {
        this.tryCollision(planet, player)
      })
    })
  }
}
