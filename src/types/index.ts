// Common type definitions

export interface Point3D {
  x: number
  y: number
  z: number
}

export interface GCodeLine {
  command: string
  x?: number
  y?: number
  z?: number
  e?: number // Extrusion
  f?: number // Feed rate
  comment?: string
}

export interface ShapeParameters {
  type: 'cube' | 'sphere' | 'cylinder'
  dimensions: {
    width?: number
    height?: number
    depth?: number
    radius?: number
  }
}

export interface Layer {
  z: number
  moves: GCodeLine[]
}
