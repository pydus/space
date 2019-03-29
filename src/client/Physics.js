export default ({ velocity }) => ({
  velocity,

  update: function() {
    this.velocity.update()
  }
})
