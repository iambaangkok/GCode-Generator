import type { PrintStats } from '@/stores/gcodeStore'

/**
 * Parse a GCode line for X, Y, Z, E, F values
 */
function parseGCodeLine(line: string): { x?: number; y?: number; z?: number; e?: number; f?: number } {
  const result: { x?: number; y?: number; z?: number; e?: number; f?: number } = {}
  const xMatch = line.match(/X([-\d.]+)/)
  const yMatch = line.match(/Y([-\d.]+)/)
  const zMatch = line.match(/Z([-\d.]+)/)
  const eMatch = line.match(/E([-\d.]+)/)
  const fMatch = line.match(/F([-\d.]+)/)
  if (xMatch) result.x = parseFloat(xMatch[1])
  if (yMatch) result.y = parseFloat(yMatch[1])
  if (zMatch) result.z = parseFloat(zMatch[1])
  if (eMatch) result.e = parseFloat(eMatch[1])
  if (fMatch) result.f = parseFloat(fMatch[1])
  return result
}

/**
 * Check if a line is a G0 or G1 move command
 */
function isMoveCommand(line: string): boolean {
  const trimmed = line.trim()
  return trimmed.startsWith('G0 ') || trimmed.startsWith('G1 ')
}

/**
 * Calculate print statistics from generated GCode
 */
export function calculateStatsFromGCode(gcode: string[]): PrintStats {
  let printTime = 0
  let filamentUsed = 0
  const zHeights = new Set<number>()
  let totalMoves = 0

  // After G28, position is 0,0,0; after G92 E0, extrusion is 0
  let prevX = 0
  let prevY = 0
  let prevZ = 0
  let prevE = 0

  for (const line of gcode) {
    if (!isMoveCommand(line)) continue

    const parsed = parseGCodeLine(line)
    const f = parsed.f ?? 3600 // Default feed rate mm/min if not specified

    totalMoves += 1

    if (parsed.z !== undefined) {
      zHeights.add(parsed.z)
    }

    if (parsed.e !== undefined) {
      filamentUsed = Math.max(filamentUsed, parsed.e) // Absolute extrusion mode: max E is total
    }

    const currX = parsed.x ?? prevX
    const currY = parsed.y ?? prevY
    const currZ = parsed.z ?? prevZ

    const dx = currX - prevX
    const dy = currY - prevY
    const dz = currZ - prevZ
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

    if (distance > 0 && f > 0) {
      printTime += distance / f // f is mm/min, result in minutes
    }

    prevX = parsed.x ?? prevX
    prevY = parsed.y ?? prevY
    prevZ = parsed.z ?? prevZ
    prevE = parsed.e ?? prevE
  }

  return {
    printTime,
    filamentUsed,
    layerCount: zHeights.size,
    totalMoves,
  }
}
