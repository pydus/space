export default ({ p, camera, velFactor = 0.04, minWidth = p.rad * 4 }) => ({
  velFactor,
  minWidth,

  originalWidth: camera.width,

  updateWidth: function() {
    const vel = Math.abs(p.vel.x) + Math.abs(p.vel.y)
    const width = this.originalWidth * (1 + vel * this.velFactor)
    const boundWidth = Math.max(this.minWidth, width)
    camera.setWidth(boundWidth)
  },

  updatePosition: function() {
    camera.setPos({
      x: p.pos.x - camera.width / 2,
      y: p.pos.y - camera.height / 2
    })
  },

  update: function() {
    this.updateWidth()
    this.updatePosition()
  }
})
