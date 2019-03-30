export default ({ p, camera }) => ({
  update: function() {
    camera.setPos({
      x: p.pos.x - camera.width / 2,
      y: p.pos.y - camera.height / 2
    })
  }
})
