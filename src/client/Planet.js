import { PlanetPhysics } from './Physics'

export default ({ x, y, rad, mass, color = '#84e', fillColor = '#000' }) => {
  const physics = PlanetPhysics({ x, y, rad, mass })

  const planet = {
    physics,
    color,
    fillColor,

    update: function() {

    },

    render: function({ drawCircle, setStrokeStyle, setFillStyle, fillCircle }) {
      setFillStyle(this.fillColor)
      fillCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
      setStrokeStyle(this.color)
      drawCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
    }
  }

  return planet
}
