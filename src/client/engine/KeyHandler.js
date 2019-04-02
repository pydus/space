export default ({ onChange, repeat = true, isEnabled = true }) => {
  const keyHandler = {
    onChange,
    repeat,
    isEnabled,

    enable: function() {
      this.isEnabled = true
      addListeners()
    },

    disable: function() {
      this.isEnabled = false
      removeListeners()
    }
  }

  const onKey = (e, isKeyDown) => {
    if (keyHandler.repeat || !e.repeat) {
      const key = e.key.toLowerCase()
      keyHandler.onChange(key, isKeyDown)
    }
  }

  const onKeyUp = e => onKey(e, false)
  const onKeyDown = e => onKey(e, true)

  const addListeners = () => {
    addEventListener('keydown', onKeyDown)
    addEventListener('keyup', onKeyUp)
  }

  const removeListeners = () => {
    removeEventListener('keydown', onKeyDown)
    removeEventListener('keyup', onKeyUp)
  }

  const init = () => {
    if (keyHandler.isEnabled) {
      addListeners()
    }
  }

  init()

  return keyHandler
}
