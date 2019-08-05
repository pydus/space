export default ({ canvas, camera, defaultLineWidth = 1 }) => {
  const view = {
    canvas,
    camera,
    defaultLineWidth,

    ctx: canvas.getContext('2d'),

    init() {
      this.setFillStyle = this.setFillStyle.bind(this)
      this.drawCircle = this.drawCircle.bind(this)
      this.fillCircle = this.fillCircle.bind(this)
      this.setLine = this.setLine.bind(this)
      this.drawLine = this.drawLine.bind(this)
      this.drawRect = this.drawRect.bind(this)
      this.fillRect = this.fillRect.bind(this)
      this.adjustViewSize()
      this.adjustViewSizeAsNeeded()
    },

    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },

    adjustViewSizeAsNeeded() {
      addEventListener('resize', this.adjustViewSize.bind(this))
    },

    adjustViewSize() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.camera.updateSize()
    },

    getScale() {
      return this.canvas.width / this.camera.width
    },

    translate(x, y) {
      const scale = this.getScale()
      const tx = (x - this.camera.pos.x) * scale
      const ty = (y - this.camera.pos.y) * scale
      return [ tx, ty ]
    },

    setFillStyle(style) {
      this.ctx.fillStyle = style
    },

    setLine(style, width = this.defaultLineWidth) {
      this.ctx.strokeStyle = style
      this.ctx.lineWidth = width
    },

    circleArc(x, y, rad) {
      const [ tx, ty ] = this.translate(x, y)
      const scale = this.getScale()
      this.ctx.arc(tx, ty, scale * rad, 0, 2 * Math.PI)
    },

    drawCircle(x, y, rad) {
      this.ctx.beginPath()
      this.circleArc(x, y, rad)
      this.ctx.stroke()
    },

    fillCircle(x, y, rad) {
      this.ctx.beginPath()
      this.circleArc(x, y, rad)
      this.ctx.fill()
    },

    drawLine(x0, y0, x1, y1) {
      const [ tx0, ty0 ] = this.translate(x0, y0)
      const [ tx1, ty1 ] = this.translate(x1, y1)
      this.ctx.beginPath()
      this.ctx.moveTo(tx0, ty0)
      this.ctx.lineTo(tx1, ty1)
      this.ctx.stroke()
    },

    rect(x, y, width, height) {
      const [ tx, ty ] = this.translate(x, y)
      const scale = this.getScale()
      this.ctx.rect(tx, ty, width * scale, height * scale)
    },

    drawRect(x, y, width, height) {
      this.rect(x, y, width, height)
      this.ctx.stroke()
    },

    fillRect(x, y, width, height) {
      this.rect(x, y, width, height)
      this.ctx.fill()
    }
  }

  view.init()

  return view
}
