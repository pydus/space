export default () => ({
  listeners: [],

  listen: function(fn) {
    this.listeners.push(fn)
  },

  stopListening: function(fn) {
    const i = this.listeners.indexOf(fn)
    if (i === -1) return false
    listeners.splice(i, 1)
    return true
  },

  notifyListeners: function(value) {
    this.listeners.forEach(fn => fn(value))
  }
})
