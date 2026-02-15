import { useMemo } from 'react'
import { useGCodeStore } from '@/stores/gcodeStore'
import { parseGCode } from '@/core/gcode/gcodeParser'
import { buildPathSegments } from './pathBuilder'

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r: number, g: number, b: number
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  return [r, g, b]
}

export function GCodePaths() {
  const gcode = useGCodeStore((state) => state.gcode)
  const gcodeVersion = useGCodeStore((state) => state.gcodeVersion)
  const { positions, colors } = useMemo(() => {
    if (gcode.length === 0) {
      return { positions: new Float32Array(0), colors: new Float32Array(0) }
    }

    const parsed = parseGCode(gcode)
    const segments = buildPathSegments(parsed.moves)

    if (segments.length === 0) {
      return { positions: new Float32Array(0), colors: new Float32Array(0) }
    }

    const maxExtrusion = Math.max(
      ...segments.map((s) => s.extrusion),
      0.0001
    )

    const positions = new Float32Array(segments.length * 6)
    const colors = new Float32Array(segments.length * 6)

    segments.forEach((seg, i) => {
      const base = i * 6
      positions[base + 0] = seg.start[0]
      positions[base + 1] = seg.start[1]
      positions[base + 2] = seg.start[2]
      positions[base + 3] = seg.end[0]
      positions[base + 4] = seg.end[1]
      positions[base + 5] = seg.end[2]

      const hue = ((seg.layerIndex * 30) % 360) / 360
      const saturation = 0.8
      const extrusionFactor = seg.extrusion / maxExtrusion
      const lightness = 0.25 + 0.5 * extrusionFactor

      const [r, g, b] = hslToRgb(hue, saturation, lightness)
      colors[base + 0] = r
      colors[base + 1] = g
      colors[base + 2] = b
      colors[base + 3] = r
      colors[base + 4] = g
      colors[base + 5] = b
    })

    return { positions, colors }
  }, [gcode])

  if (positions.length === 0) return null

  return (
    <lineSegments key={gcodeVersion}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial vertexColors />
    </lineSegments>
  )
}
