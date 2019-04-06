export default ({ p, camera, velFactor = 0.04, minHeight = p.rad * 3 }) => ({
  velFactor,
  minHeight,

  originalHeight: camera.height,

  updateHeight() {
    const vel = Math.abs(p.vel.x) + Math.abs(p.vel.y)
    const height = this.originalHeight * (1 + vel * this.velFactor)
    const boundHeight = Math.max(this.minHeight, height)
    camera.setHeight(boundHeight)
  },

  updatePosition() {
    camera.setPos({
      x: p.pos.x - camera.width / 2,
      y: p.pos.y - camera.height / 2
    })
  },

  update() {
    this.updateHeight()
    this.updatePosition()
  }
})
