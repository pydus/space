import KeyHandler from './KeyHandler'

export default ({ getCommand, runCommand, repeat = false }) => {
  const onChange = (key, isKeyDown) => {
    const command = getCommand(key)
    runCommand(command, isKeyDown)
  }

  const keyHandler = KeyHandler({ onChange, repeat })

  return {
    getCommand,
    runCommand
  }
}
