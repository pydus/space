export default () => ({
  origin: null,
  update: function({ x, y, acc, dec, isMoving }) {
    if (!this.origin) return [ x, y ]

    // TODO: control velocities x, y relative to origin

    return [ x, y ]
  }
})
