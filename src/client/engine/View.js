export default ({ canvas, width, height }) => {
  const view = {
    canvas,
    width,
    height,
    ctx: canvas.getContext('2d'),

    init: function() {
      this.setFillStyle = this.setFillStyle.bind(this)
      this.drawCircle = this.drawCircle.bind(this)
      this.setStrokeStyle = this.setStrokeStyle.bind(this)
      this.drawLine = this.drawLine.bind(this)
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

    setStrokeStyle: function(style) {
      this.ctx.strokeStyle = style
    },

    drawCircle: function(x, y, rad) {
      this.ctx.beginPath()
      this.ctx.arc(x, y, rad, 0, 2 * Math.PI)
      this.ctx.stroke()
    },

    drawLine: function(x0, y0, x1, y1) {
      this.ctx.beginPath()
      this.ctx.moveTo(x0, y0)
      this.ctx.lineTo(x1, y1)
      this.ctx.stroke()
    }
  }

  view.init()

  return view
}
