import Physics from './Physics'

export default ({ x, y, radius, color='#e48' }) => {
  const physics = Physics({ pos: { x, y }, radius })

  const planet = {
    physics,
    color,

    collide: function() {

    },

    update: function() {

    },

    render: function({ fillCircle, setFillStyle }) {
      setFillStyle(this.color)
      fillCircle(this.physics.pos.x, this.physics.pos.y, this.physics.radius)
    }
  }

  return planet
}
