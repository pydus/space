export default ({ pos, height }) => ({
  pos,
  width: height / window.innerHeight * window.innerWidth,
  height,

  updateSize() {
    this.width = this.height / window.innerHeight * window.innerWidth
  },

  setHeight(height) {
    this.height = height
    this.updateSize()
  },

  setPos(pos) {
    this.pos = pos
  }
})
