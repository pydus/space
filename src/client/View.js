
export default class View {
  constructor(canvas, width, height) {
    this.canvas = canvas
    this.width = width
    this.height = height
    this.ctx = canvas.getContext('2d')
    this.adjustCanvasSize = this.adjustCanvasSize.bind(this)
    this.setFillStyle = this.setFillStyle.bind(this)
    this.fillCircle = this.fillCircle.bind(this)
    this.init()
  }

  init() {
    this.adjustCanvasSize()
    this.adjustCanvasSizeAsNeeded()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  adjustCanvasSizeAsNeeded() {
    addEventListener('resize', this.adjustCanvasSize)
  }

  adjustCanvasSize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  setFillStyle(style) {
    this.ctx.fillStyle = style
  }

  fillCircle(x, y, radius) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
    this.ctx.fill()
  }
}
