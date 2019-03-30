export function hardCollide(other, angle, distance) {
  this.pos.x = other.pos.x + (other.rad + this.rad) * Math.cos(angle)
  this.pos.y = other.pos.y + (other.rad + this.rad) * Math.sin(angle)
}
