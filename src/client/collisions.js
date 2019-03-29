export function hardCollide(other, angle, distance) {
  this.pos.x = other.pos.x + (other.radius + this.radius) * Math.cos(angle)
  this.pos.y = other.pos.y + (other.radius + this.radius) * Math.sin(angle)
}
