export default ({ onChange, repeat = true }) => {
  const keyHandler = {
    onChange,
    repeat
  }

  function onKey(e, isKeyDown) {
    if (keyHandler.repeat || !e.repeat) {
      const key = e.key.toLowerCase()
      onChange(key, isKeyDown)
    }
  }

  function init() {
    addEventListener('keydown', e => onKey(e, true))
    addEventListener('keyup', e => onKey(e, false))
  }

  init()

  return keyHandler
}
