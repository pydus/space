import Physics from './Physics'
import { hardCollide } from './engine/collisions'

export function FlameParticle({ physics, color }) {
  return {
    physics,
    color,

    update: function() {
      this.physics.update()
    },

    render: function({ setStrokeStyle, drawCircle }) {
      setStrokeStyle(this.color)
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

  start: function() {
    this.isDying = false
  },

  stop: function() {
    this.isDying = true
  },

  getNextColor: function() {
    const i = Math.floor(this.colors.length * Math.random())
    return this.colors[i]
  },

  getNextAngle: function() {
    const offset = -this.spread + 2 * this.spread * Math.random()
    return this.physics.angle + offset
  },

  getNextRad: function() {
    return Math.floor(this.minRad + this.maxRad * Math.random())
  },

  addParticle: function(particle) {
    this.particles.push(particle)
    if (this.particles.length > this.maxParticles) {
      this.particles.shift()
    }
  },

  createNewParticle: function() {
    const angle = this.getNextAngle()

    const particle = FlameParticle({
      physics: Physics({
        pos: {
          x: this.physics.pos.x + this.gap * Math.cos(angle),
          y: this.physics.pos.y + this.gap * Math.sin(angle)
        },
        rad: this.getNextRad(),
        vel: {
          x: this.intensity * Math.cos(angle),
          y: this.intensity * Math.sin(angle)
        },
        angle,
        collide: hardCollide
      }),
      color: this.getNextColor()
    })

    this.addParticle(particle)
  },

  update: function() {
    if (this.isDying) {
      this.particles.pop()
    } else {
      this.createNewParticle()
    }

    this.particles.forEach(particle => particle.update())
  },

  render: function(view) {
    this.particles.forEach(particle => particle.render(view))
  }
})
