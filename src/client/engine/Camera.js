export default ({ pos, height }) => ({
  pos,
  width: height / window.innerHeight * window.innerWidth,
  height,

  updateSize: function() {
    this.width = this.height / window.innerHeight * window.innerWidth
  },

  setHeight: function(height) {
    this.height = height
    this.updateSize()
  },

  setPos: function(pos) {
    this.pos = pos
  }
})
