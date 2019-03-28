
export default class View {
  constructor(canvas, width, height) {
    this.canvas = canvas
    this.width = width
    this.height = height
    this.ctx = canvas.getContext('2d')
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
