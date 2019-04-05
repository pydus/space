export default ({ onChange, repeat = true, isEnabled = true }) => {
  const keyHandler = {
    onChange,
    repeat,
    isEnabled,

    heldKeys: new Set(),

    setHeldKeys: function(heldKeys) {
      this.heldKeys = new Set(heldKeys)
      this.heldKeys.forEach(key => this.onChange(key, true))
    },

    enable: function() {
      this.isEnabled = true
      addListeners()
    },

    disable: function() {
      liftHeldKeys()
      this.isEnabled = false
      removeListeners()
    }
  }

  const onKey = (e, isKeyDown) => {
    if (keyHandler.repeat || !e.repeat) {
      const key = e.key.toLowerCase()

      if (isKeyDown) {
        keyHandler.heldKeys.add(key)
      } else {
        keyHandler.heldKeys.delete(key)
      }

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

  const liftHeldKeys = () => {
    keyHandler.heldKeys.forEach(key => {
      keyHandler.onChange(key, false)
    })
    keyHandler.heldKeys.clear()
  }

  const init = () => {
    if (keyHandler.isEnabled) {
      addListeners()
    }
  }

  init()

  return keyHandler
}
