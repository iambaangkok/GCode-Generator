// Utility functions

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = Math.floor(minutes % 60)
  const secs = Math.floor((minutes % 1) * 60)
  
  if (hours > 0) {
    return `${hours}h ${mins}m ${secs}s`
  }
  if (mins > 0) {
    return `${mins}m ${secs}s`
  }
  return `${secs}s`
}

export function formatLength(mm: number): string {
  if (mm >= 1000) {
    return `${(mm / 1000).toFixed(2)} m`
  }
  return `${mm.toFixed(2)} mm`
}

export function calculateDistance(p1: { x: number; y: number; z: number }, p2: { x: number; y: number; z: number }): number {
  return Math.sqrt(
    Math.pow(p2.x - p1.x, 2) +
    Math.pow(p2.y - p1.y, 2) +
    Math.pow(p2.z - p1.z, 2)
  )
}
