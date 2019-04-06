import { FlameParticlePhysics } from './physics'

export function FlameParticle({ physics, color }) {
  return {
    physics,
    color,

    update() {
      this.physics.update()
    },

    render({ setLine, drawCircle }) {
      setLine(this.color)
      drawCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
    }
  }
}

export default ({
  physics,
  intensity = 10,
  spread = Math.PI / 4,
  minRad = 4,
  maxRad = 14,
  maxParticles = 50,
  gap = 35,
  colors = ['#e44', '#e84']
}) => ({
  physics,
  intensity,
  spread,
  minRad,
  maxRad,
  maxParticles,
  gap,
  colors,

  isDying: false,
  particles: [],

  start() {
    this.isDying = false
  },

  stop() {
    this.isDying = true
  },

  getNextColor() {
    const i = Math.floor(this.colors.length * Math.random())
    return this.colors[i]
  },

  getNextAngle() {
    const offset = -this.spread + 2 * this.spread * Math.random()
    return this.physics.angle + offset
  },

  getNextRad() {
    return Math.floor(this.minRad + this.maxRad * Math.random())
  },

  addParticle(particle) {
    this.particles.push(particle)
    if (this.particles.length > this.maxParticles) {
      this.particles.shift()
    }
  },

  createNewParticle() {
    const angle = this.getNextAngle()

    const particle = FlameParticle({
      physics: FlameParticlePhysics({
        pos: {
          x: this.physics.pos.x + this.gap * Math.cos(angle),
          y: this.physics.pos.y + this.gap * Math.sin(angle)
        },
        rad: this.getNextRad(),
        vel: {
          x: this.intensity * Math.cos(angle),
          y: this.intensity * Math.sin(angle)
        },
        angle
      }),
      color: this.getNextColor()
    })

    this.addParticle(particle)
  },

  update() {
    if (this.isDying) {
      this.particles.pop()
    } else {
      this.createNewParticle()
    }

    this.particles.forEach(particle => particle.update())
  },

  render(view) {
    this.particles.forEach(particle => particle.render(view))
  }
})
