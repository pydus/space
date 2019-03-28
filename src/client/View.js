
export default class View {
  constructor(canvas, width, height) {
    this.canvas = canvas
    this.width = width
    this.height = height
    this.ctx = canvas.getContext('2d')
    this.init()
  }

  init() {
    this.canvas.width = this.width
    this.canvas.height = this.height
  }
}
