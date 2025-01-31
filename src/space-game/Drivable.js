export default ({
  vehicle,
  driverSeat = { angle: 0, distance: 0 },
  passengerSeats = [],
  enterDistance = 100
}) => ({
  vehicle,
  driverSeat,
  passengerSeats,
  enterDistance,

  driver: null,
  passengers: [],

  tryToEnter(being) {
    if (!this.addDriver(being)) {
      return this.addPassenger(being)
    }
    return true
  },

  enter(being) {
    const didEnter = this.tryToEnter(being)
    if (didEnter && typeof this.onEnter === 'function') {
      this.onEnter(being)
    }
    return didEnter
  },

  exit(being) {
    const didExit = this.removeDriver(being)
    if (didExit && typeof this.onExit === 'function') {
      this.onExit(being)
    }
    return didExit
  },

  addDriver(being) {
    if (this.driver) return false
    if (being.physics.controlSystem) {
      being.physics.controlSystem.disable()
    }
    this.transferKeys(being, this.vehicle)
    this.vehicle.controller.enable()
    this.driver = being
    return true
  },

  removeDriver(being) {
    if (this.driver !== being) return false
    if (being.physics.controlSystem) {
      being.physics.controlSystem.enable()
    }
    this.transferKeys(this.vehicle, this.driver)
    this.vehicle.controller.disable()
    this.driver = null
    return true
  },

  addPassenger(being) {
    if (this.passengers.length >= this.passengerSeats.length) {
      return false
    } else if (being.physics.controlSystem) {
      being.physics.controlSystem.disable()
    }
    return this.passengers.push(being)
  },

  removePassenger(being) {
    if (being.physics.controlSystem) {
      being.physics.controlSystem.enable()
    }
    const i = this.passengers.indexOf(being)
    if (i === -1) return false
    this.passengers.splice(i, 1)
    return true
  },

  transferKeys(origin, dest) {
    if (origin.controller) {
      const originKeys = origin.controller.keyHandler.heldKeys
      dest.controller.keyHandler.setHeldKeys(originKeys)
    }
  },

  getSeatPosition(seat) {
    const { distance, angle } = seat
    const vp = this.vehicle.physics
    return {
      x: vp.pos.x + distance * Math.cos((vp.angle || 0) + angle),
      y: vp.pos.y + distance * Math.sin((vp.angle || 0) + angle)
    }
  },

  setPositionOf(being, seat) {
    const driverSeatPosition = this.getSeatPosition(seat)
    being.physics.setPos(driverSeatPosition)
    being.physics.vel = this.vehicle.physics.vel
  },

  updateDriverPosition() {
    if (this.driver) {
      this.setPositionOf(this.driver, this.driverSeat)
    }
  },

  updatePassengerPositions() {
    this.passengers.forEach((passenger, i) => {
      this.setPositionOf(passenger, this.passengerSeats[i])
    })
  },

  render(view) {
    this.vehicle.render(view)

    if (!this.driver) {
      const { setLine, drawCircle } = view
      const { x, y } = this.getSeatPosition(this.driverSeat)
      setLine(this.vehicle.color)
      drawCircle(x, y, 1)
    }
  },

  update() {
    this.updateDriverPosition()
    this.updatePassengerPositions()
    this.vehicle.update()
  }
})
