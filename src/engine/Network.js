import WebSocket from 'ws'

export default ({ port }) => ({
  clients: {},
  currentId: 0,
  wss: new WebSocket.Server({ port }),

  onConnect: null,
  onDisconnect: null,
  onMessage: null,

  tryToCall(fn, ...args) {
    if (typeof fn === 'function') {
      fn.call(this, ...args)
    }
  },

  start() {
    this.wss.on('connection', ws => {
      ws.id = this.currentId++
      this.clients[ws.id] = ws
      this.tryToCall(this.onConnect, ws.id)
      console.log(`${ws.id} connected`)

      ws.on('message', data => {
        this.sendToListener(data)
      })

      ws.on('close', () => {
        this.tryToCall(this.onDisconnect, ws.id)
        delete this.clients[ws.id]
        console.log(`${ws.id} disconnected`)
      })
    })
  },

  broadcast(message) {
    for (const id in this.clients) {
      this.clients[id].send(message)
    }
  },

  send(id, message) {
    if (!this.clients[id]) return false
    this.clients[id].send(message)
    return true
  },

  sendToListener(message) {
    this.tryToCall(this.onMessage, message)
  },

  onConnect(fn) {
    this.onConnect = fn
  },

  onDisconnect(fn) {
    this.onDisconnect = fn
  },

  onMessage(fn) {
    this.onMessage = fn
  }
})
