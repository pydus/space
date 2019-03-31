export default ({
  vehicle,
  driverPos,
  passengerSeats,
  enterDistance = 100,
  maxPassengers = 2
}) => ({
  vehicle,
  driverPos,
  passengerSeats,
  maxPassengers,
  enterDistance,

  driver: null,
  passengers: [],

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
    if (!this.driver) return false
    if (p.controlSystem) {
      p.controlSystem.enable()
      this.vehicle.physics.controlSystem.disable()
    }
    this.driver = null
    return true
  },

  addPassenger: function(p) {
    if (p.controlSystem) {
      p.controlSystem.disable()
    }
    this.passengers.push(p)
  },

  removePassenger: function(p) {
    if (p.controlSystem) {
      p.controlSystem.enable()
    }
    const i = this.passengers.indexOf(p)
    this.passengers.splice(i, 1)
  },

  moveDriver: function() {
    if (this.driver) {
      const { distance, angle } = this.driverPos
      const p = this.vehicle.physics

      this.driver.setPos({
        x: p.pos.x + distance * Math.cos(p.angle + angle + Math.PI),
        y: p.pos.y + distance * Math.sin(p.angle + angle + Math.PI)
      })

      this.driver.vel = this.vehicle.physics.vel
    }
  },

  movePassengers: function() {
    this.passengers.forEach(passenger => (
      passenger.setPos(this.vehicle.physics.pos)
    ))
  },

  update: function() {
    this.moveDriver()
    this.movePassengers()
    this.vehicle.update()
  }
})
