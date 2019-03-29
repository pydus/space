export default class KeyHandler {
  constructor(keys, listener) {
    this.keys = keys
    this.listener = listener
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.init()
  }

  init() {
    addEventListener('keydown', this.onKeyDown)
    addEventListener('keyup', this.onKeyUp)
  }

  onKeyDown(e) {
    const key = e.key.toLowerCase()
    const command = this.keys[key];
    this.listener(command, true)
  }

  onKeyUp(e) {
    const key = e.key.toLowerCase()
    const command = this.keys[key];
    this.listener(command, false)
  }
}
