import type { ParsedMove } from '@/core/gcode/gcodeParser'

export interface PathSegment {
  start: [number, number, number]
  end: [number, number, number]
  extrusion: number
  layerIndex: number
}

/**
 * Convert GCode (X,Y,Z) to Three.js (x,y,z).
 * GCode: Z = build height (up), X/Y = bed plane.
 * Three.js: Y = up, X = right, Z = depth.
 * Mapping: Three.js (x, y, z) = GCode (X, Z, Y)
 */
function gcodeToThree(x: number, y: number, z: number): [number, number, number] {
  return [x, z, y]
}

/**
 * Convert parsed GCode moves into line segments for Three.js rendering.
 * Each segment connects consecutive moves. Extrusion is the delta E for flow visualization.
 */
export function buildPathSegments(moves: ParsedMove[]): PathSegment[] {
  const segments: PathSegment[] = []

  for (let i = 1; i < moves.length; i++) {
    const prev = moves[i - 1]
    const curr = moves[i]

    const deltaE = curr.e !== undefined && prev.e !== undefined
      ? curr.e - prev.e
      : 0

    segments.push({
      start: gcodeToThree(prev.x, prev.y, prev.z),
      end: gcodeToThree(curr.x, curr.y, curr.z),
      extrusion: deltaE,
      layerIndex: curr.layerIndex ?? prev.layerIndex ?? 0,
    })
  }

  return segments
}
