export default ({ listener }) => {
  const keyHandler = {
    listener
  }

  function onKey(e, isKeyDown) {
    const key = e.key.toLowerCase()
    listener(key, isKeyDown)
  }

  function init() {
    addEventListener('keydown', e => onKey(e, true))
    addEventListener('keyup', e => onKey(e, false))
  }

  init()

  return keyHandler
}
