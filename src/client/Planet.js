import Physics from './Physics'

export default ({ x, y, rad, mass = rad, color='#e48' }) => {
  const physics = Physics({ pos: { x, y }, rad, mass })

  const planet = {
    physics,
    color,

    collide: function() {

    },

    update: function() {

    },

    render: function({ fillCircle, setFillStyle }) {
      setFillStyle(this.color)
      fillCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
    }
  }

  return planet
}
