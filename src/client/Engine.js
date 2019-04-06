import Physics from './engine/Physics'
import Flame from './Flame'

export default ({ maxVel, acc, angAcc, angDec, maxAngVel }) => ({
  maxVel,
  acc,
  angAcc,
  angDec,
  maxAngVel,

  physics: Physics({ pos: { x: 0, y: 0 } }),

  isFiring: false,

  flame: Flame({
    physics: Physics({ pos: { x: 0, y: 0 } })
  }),

  fire() {
    this.isFiring = true
  },

  stopFiring() {
    this.isFiring = false
  },

  update() {
    if (!this.isFiring) {
      this.flame.stop()
    } else if(this.flame.isDying) {
      this.flame.start()
    }

    this.flame.physics.setPos({ x: this.physics.pos.x, y: this.physics.pos.y })
    this.flame.physics.setAngle(this.physics.angle)
    this.flame.update()
  },

  render(view) {
    if (this.flame) {
      this.flame.render(view)
    }
  }
})
