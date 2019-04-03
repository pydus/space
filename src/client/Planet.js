import { PlanetPhysics } from './physics'

export default ({ x, y, rad, mass, color = '#265b8e', fillColor = '#000' }) => {
  const physics = PlanetPhysics({ x, y, rad, mass })

  const planet = {
    physics,
    color,
    fillColor,

    update: function() {

    },

    render: function({ drawCircle, setLine, setFillStyle, fillCircle }) {
      setFillStyle(this.fillColor)
      fillCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
      setLine(this.color)
      drawCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
    }
  }

  return planet
}
