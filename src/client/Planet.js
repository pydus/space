import Physics from './Physics'

export default ({ x, y, rad, mass = rad, color='#84e' }) => {
  const physics = Physics({ pos: { x, y }, rad, mass })

  const planet = {
    physics,
    color,

    collide: function() {

    },

    update: function() {

    },

    render: function({ drawCircle, setStrokeStyle }) {
      setStrokeStyle(this.color)
      drawCircle(this.physics.pos.x, this.physics.pos.y, this.physics.rad)
    }
  }

  return planet
}
