import { getDistance } from './tools'

export default ({ onFind }) => ({
  getClosest: function(physicsObjects) {
    return physicsObjects.reduce((cur, p) => (
      getDistance(this, p) < getDistance(this, cur) ? p : cur
    ))
  },

  findOrigin: function(physicsObjects) {
    const closest = this.getClosest(physicsObjects)
    onFind(closest)
  }
})
