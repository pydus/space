export default ({ pos, width }) => ({
  pos,
  width,
  height: width / window.innerWidth * window.innerHeight,

  updateSize: function() {
    this.height = width / window.innerWidth * window.innerHeight
  },

  setPos: function(pos) {
    this.pos = pos
  }
})
