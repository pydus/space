export default ({ p, camera, velFactor = 0.04 }) => ({
  originalWidth: camera.width,
  velFactor,

  updateWidth: function() {
    const vel = Math.abs(p.vel.x) + Math.abs(p.vel.y)
    camera.setWidth(this.originalWidth * (1 + vel * this.velFactor))
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
