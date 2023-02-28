export function reduceToFirstQuadrant(angle) {
  angle = angle % 360
  if (angle < 0) {
    angle += 360
  }
  if (angle <= 90) {
    return angle
  }
  if (angle > 90 && angle <= 180) {
    return 180 - angle
  }
  if (angle > 180 && angle <= 270) {
    return angle - 180
  }
  if (angle > 270 && angle < 360) {
    return 360 - angle
  }
}
