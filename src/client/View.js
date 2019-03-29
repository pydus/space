export default ({ canvas, width, height }) => {
  const view = {
    canvas,
    width,
    height,
    ctx: canvas.getContext('2d'),

    init: function() {
      this.setFillStyle = this.setFillStyle.bind(this)
      this.fillCircle = this.fillCircle.bind(this)
      this.adjustCanvasSize()
      this.adjustCanvasSizeAsNeeded()
    },

    clear: function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },

    adjustCanvasSizeAsNeeded: function() {
      addEventListener('resize', this.adjustCanvasSize.bind(this))
    },

    adjustCanvasSize: function() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    },

    setFillStyle: function(style) {
      this.ctx.fillStyle = style
    },

    fillCircle: function(x, y, radius) {
      this.ctx.beginPath()
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
      this.ctx.fill()
    }
  }

  view.init()

  return view
}
