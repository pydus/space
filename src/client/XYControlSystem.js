export default () => ({
  update: function({ x, y, acc, dec, isMoving }) {
    if (isMoving.up) {
      y -= acc
    } else if (y < 0) {
      y += dec
    }

    if (isMoving.down) {
      y += acc
    } else if (y > 0) {
      y -= dec
    }

    if (isMoving.left) {
      x -= acc
    } else if (x < 0) {
      x += dec
    }

    if (isMoving.right) {
      x += acc
    } else if (x > 0) {
      x -= dec
    }

    return [ x, y ]
  }
})
