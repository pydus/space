export default () => ({
  listeners: [],

  listen(fn) {
    this.listeners.push(fn)
  },

  stopListening(fn) {
    const i = this.listeners.indexOf(fn)
    if (i === -1) return false
    listeners.splice(i, 1)
    return true
  },

  notifyListeners(value) {
    this.listeners.forEach(fn => fn(value))
  }
})
