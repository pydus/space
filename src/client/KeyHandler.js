export default ({ keys, listener }) => {
  const KeyHandler = {
    keys,
    listener,

    init: function() {
      addEventListener('keydown', this.onKeyDown.bind(this))
      addEventListener('keyup', this.onKeyUp.bind(this))
    },

    onKeyDown: function(e) {
      const key = e.key.toLowerCase()
      const command = this.keys[key]
      this.listener(command, true)
    },

    onKeyUp: function(e) {
      const key = e.key.toLowerCase()
      const command = this.keys[key]
      this.listener(command, false)
    }
  }

  KeyHandler.init()

  return KeyHandler
}
