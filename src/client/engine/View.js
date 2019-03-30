export default ({ canvas, width, height, camera }) => {
  const view = {
    canvas,
    width,
    height,
    camera,

    ctx: canvas.getContext('2d'),

    init: function() {
      this.setFillStyle = this.setFillStyle.bind(this)
      this.drawCircle = this.drawCircle.bind(this)
      this.setStrokeStyle = this.setStrokeStyle.bind(this)
      this.drawLine = this.drawLine.bind(this)
      this.adjustViewSize()
      this.adjustViewSizeAsNeeded()
    },

    clear: function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },

    adjustViewSizeAsNeeded: function() {
      addEventListener('resize', this.adjustViewSize.bind(this))
    },

    adjustViewSize: function() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.camera.updateSize()
    },

    getScale: function() {
      return this.canvas.width / this.camera.width
    },

    translate: function(x, y) {
      const scale = this.getScale()
      const tx = (x - this.camera.pos.x) * scale
      const ty = (y - this.camera.pos.y) * scale
      return [ tx, ty ]
    },

    setFillStyle: function(style) {
      this.ctx.fillStyle = style
    },

    setStrokeStyle: function(style) {
      this.ctx.strokeStyle = style
    },

    drawCircle: function(x, y, rad) {
      const [ tx, ty ] = this.translate(x, y)
      const scale = this.getScale()
      this.ctx.beginPath()
      this.ctx.arc(tx, ty, scale * rad, 0, 2 * Math.PI)
      this.ctx.stroke()
    },

    drawLine: function(x0, y0, x1, y1) {
      const [ tx0, ty0 ] = this.translate(x0, y0)
      const [ tx1, ty1 ] = this.translate(x1, y1)
      this.ctx.beginPath()
      this.ctx.moveTo(tx0, ty0)
      this.ctx.lineTo(tx1, ty1)
      this.ctx.stroke()
    }
  }

  view.init()

  return view
}
