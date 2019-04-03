import KeyHandler from './KeyHandler'

export default ({ getCommand, runCommand, repeat = false, isEnabled = true }) => {
  const controller = {
    getCommand,
    runCommand,
    isEnabled
  }

  const onChange = (key, isKeyDown) => {
    const command = getCommand(key)
    runCommand(command, isKeyDown)
  }

  const keyHandler = KeyHandler({ onChange, repeat, isEnabled })

  const enable = () => {
    keyHandler.enable()
    controller.isEnabled = true
  }

  const disable = () => {
    keyHandler.disable()
    controller.isEnabled = false
  }

  return controller
}
