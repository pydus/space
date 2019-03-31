export default ({ pos, width }) => ({
  pos,
  width,
  height: width / window.innerWidth * window.innerHeight,

  updateSize: function() {
    this.height = this.width / window.innerWidth * window.innerHeight
  },

  setWidth: function(width) {
    this.width = width
    this.updateSize()
  },

  setPos: function(pos) {
    this.pos = pos
  }
})
