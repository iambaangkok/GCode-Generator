/**
 * Parse GCode lines into structured moves for visualization.
 * Extracts X, Y, Z, E from G0/G1 commands and detects layers from comments.
 */

export interface ParsedMove {
  x: number
  y: number
  z: number
  e?: number
  isExtrusion: boolean
  layerIndex?: number
}

export interface ParsedGCode {
  moves: ParsedMove[]
  layerCount: number
}

const AXIS_REGEX = /([XYZEF])([-\d.]+)/g

function parseAxisValues(line: string): Record<string, number> {
  const values: Record<string, number> = {}
  let match: RegExpExecArray | null
  AXIS_REGEX.lastIndex = 0
  while ((match = AXIS_REGEX.exec(line)) !== null) {
    values[match[1]] = parseFloat(match[2])
  }
  return values
}

export function parseGCode(gcode: string[]): ParsedGCode {
  const moves: ParsedMove[] = []
  let x = 0
  let y = 0
  let z = 0
  let e = 0
  let prevE = 0
  let currentLayerIndex = 0
  let layerCount = 0

  for (const line of gcode) {
    const trimmed = line.trim()
    if (!trimmed) continue

    // Layer comment: "; Layer n"
    const layerMatch = trimmed.match(/^;\s*Layer\s+(\d+)/i)
    if (layerMatch) {
      currentLayerIndex = parseInt(layerMatch[1], 10) - 1 // 0-based
      layerCount = Math.max(layerCount, currentLayerIndex + 1)
      continue
    }

    // G92 E0 - reset extruder
    if (trimmed.startsWith('G92')) {
      const values = parseAxisValues(trimmed)
      if ('E' in values) e = values.E
      continue
    }

    // G0/G1 - motion commands (also parse lines with axis values like "X10 Y20" from generator)
    const isExplicitMove = trimmed.startsWith('G0 ') || trimmed.startsWith('G1 ')
    const values = parseAxisValues(trimmed)
    const hasAxisValues = ('X' in values || 'Y' in values || 'Z' in values || 'E' in values) && !trimmed.startsWith(';')

    if (isExplicitMove || hasAxisValues) {
      if ('X' in values) x = values.X
      if ('Y' in values) y = values.Y
      if ('Z' in values) z = values.Z
      if ('E' in values) e = values.E

      const isExtrusion = 'E' in values && e > prevE
      if ('E' in values) prevE = e

      moves.push({
        x,
        y,
        z,
        e: 'E' in values ? e : undefined,
        isExtrusion,
        layerIndex: currentLayerIndex,
      })
    }
  }

  return { moves, layerCount }
}
