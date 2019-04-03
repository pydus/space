import KeyHandler from './KeyHandler'

export default ({ getCommand, runCommand, repeat = false, isEnabled = true }) => {
  const controller = {
    getCommand,
    runCommand,
    isEnabled,

    keyHandler: KeyHandler({
      onChange: (...args) => controller.onChange(...args),
      repeat,
      isEnabled
    }),

    onChange: function(key, isKeyDown) {
      const command = this.getCommand(key)
      this.runCommand(command, isKeyDown)
    },

    enable: function() {
      this.keyHandler.enable()
      this.isEnabled = true
    },

    disable: function() {
      this.keyHandler.disable()
      this.isEnabled = false
    }
  }

  return controller
}
