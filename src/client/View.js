
export default class View {
  constructor(canvas, width, height) {
    this.canvas = canvas
    this.width = width
    this.height = height
    this.ctx = canvas.getContext('2d')
    this.adjustCanvasSize = this.adjustCanvasSize.bind(this)
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
}
