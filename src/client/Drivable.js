export default ({
  vehicle,
  driverSeat,
  passengerSeats = [],
  enterDistance = 100
}) => {
  const drivable = {
    vehicle,
    driverSeat,
    passengerSeats,
    enterDistance,

    driver: null,
    passengers: [],

    init: function() {
      this.vehicle.physics.controlSystem.disable()
    },

    enter: function(p) {
      if (!this.addDriver(p)) {
        return this.addPassenger(p)
      }
      return true
    },

    exit: function(p) {
      if (this.removeDriver(p)) {
        return true
      }
    },

    addDriver: function(p) {
      if (this.driver) return false
      if (p.controlSystem) {
        p.controlSystem.disable()
        this.vehicle.physics.controlSystem.enable()
      }
      this.driver = p
      return true
    },

    removeDriver: function(p) {
      if (this.driver !== p) return false
      if (p.controlSystem) {
        p.controlSystem.enable()
        this.vehicle.physics.controlSystem.disable()
      }
      this.driver = null
      return true
    },

    addPassenger: function(p) {
      if (this.passengers.length >= this.passengerSeats.length) {
        return false
      } else if (p.controlSystem) {
        p.controlSystem.disable()
      }
      return this.passengers.push(p)
    },

    removePassenger: function(p) {
      if (p.controlSystem) {
        p.controlSystem.enable()
      }
      const i = this.passengers.indexOf(p)
      if (i === -1) return false
      this.passengers.splice(i, 1)
      return true
    },

    setPositionOf: function(p, seat) {
      const { distance, angle } = seat
      const vp = this.vehicle.physics

      p.setPos({
        x: vp.pos.x + distance * Math.cos(vp.angle + angle),
        y: vp.pos.y + distance * Math.sin(vp.angle + angle)
      })

      p.vel = this.vehicle.physics.vel
    },

    updateDriverPosition: function() {
      if (this.driver) {
        this.setPositionOf(this.driver, this.driverSeat)
      }
    },

    updatePassengerPositions: function() {
      this.passengers.forEach((passenger, i) => {
        this.setPositionOf(passenger, this.passengerSeats[i])
      })
    },

    update: function() {
      this.updateDriverPosition()
      this.updatePassengerPositions()
      this.vehicle.update()
    }
  }

  drivable.init()

  return drivable
}
