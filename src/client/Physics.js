import { getAngle, getDistance } from './tools'

export default ({
  pos,
  vel = {x: 0, y: 0},
  rad = 20,
  collide = () => {},
  controlSystem
}) => {
  const physics = {
    pos,
    vel,
    rad,
    collide,
    controlSystem,

    init: function() {
      if (this.controlSystem) {
        this.controlSystem.listen(({ pos, vel }) => {
          this.pos = pos
          this.vel = vel
        })
      }
    },

    setMoving: function(direction, bool) {
      this.controlSystem.setMoving(direction, bool)
    },

    attract: function(other, mag) {
      const angle = getAngle(this, other)
      const distance = getDistance(this, other)
      other.pos.x -= mag * Math.cos(angle) / distance
      other.pos.y -= mag * Math.sin(angle) / distance
    },

    update: function(pos) {
      this.controlSystem.update({ pos: this.pos, vel: this.vel })
    }
  }

  physics.init()

  return physics
}
