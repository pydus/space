import { getDistance } from './tools'

export default ({ onFind }) => ({
  onFind,

  getClosest: function(physicsObjects) {
    return physicsObjects.reduce((cur, p) => (
      getDistance(this, p) < getDistance(this, cur) ? p : cur
    ))
  },

  findOrigin: function(physicsObjects) {
    const distance = getDistance(this, closest)
    this.onFind(closest)
  }
})
