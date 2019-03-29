import KeyHandler from './KeyHandler'

export default ({ keys, mapFunction }) => {
  const listener = (key, isKeyDown) => {
    const command = keys[key]
    mapFunction(command, isKeyDown)
  }

  const keyHandler = KeyHandler({ keys, listener })

  return {
    keys,
    mapFunction
  }
}
