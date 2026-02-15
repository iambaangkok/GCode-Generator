import { Point3D, ShapeParameters } from '@/types'

/**
 * Slice shapes at a given Z height to produce layer contours for GCode.
 * Each function returns points along the perimeter of the cross-section at that Z.
 */

const DEFAULT_SEGMENTS = 32

/**
 * Cube: at height z, the cross-section is a rectangle (full horizontal slice).
 * width = X extent, height = Y extent, depth = Z extent.
 */
export function sliceCubeAtZ(
  width: number,
  height: number,
  depth: number,
  z: number,
  center: Point3D = { x: 0, y: 0, z: 0 }
): Point3D[] {
  const halfW = width / 2
  const halfH = height / 2
  const halfD = depth / 2

  const minZ = center.z - halfD
  const maxZ = center.z + halfD
  if (z < minZ || z > maxZ) return []

  // Rectangle perimeter: 4 corners + back to start
  return [
    { x: center.x - halfW, y: center.y - halfH, z },
    { x: center.x + halfW, y: center.y - halfH, z },
    { x: center.x + halfW, y: center.y + halfH, z },
    { x: center.x - halfW, y: center.y + halfH, z },
    { x: center.x - halfW, y: center.y - halfH, z },
  ]
}

/**
 * Cylinder: at height z, the cross-section is a circle (constant radius).
 */
export function sliceCylinderAtZ(
  radius: number,
  height: number,
  z: number,
  center: Point3D = { x: 0, y: 0, z: 0 },
  segments: number = DEFAULT_SEGMENTS
): Point3D[] {
  const halfHeight = height / 2
  const minZ = center.z - halfHeight
  const maxZ = center.z + halfHeight
  if (z < minZ || z > maxZ) return []

  const points: Point3D[] = []
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2
    points.push({
      x: center.x + radius * Math.cos(theta),
      y: center.y + radius * Math.sin(theta),
      z,
    })
  }
  return points
}

/**
 * Sphere: at height z, the cross-section is a circle with radius sqrt(r² - z²).
 */
export function sliceSphereAtZ(
  radius: number,
  z: number,
  center: Point3D = { x: 0, y: 0, z: 0 },
  segments: number = DEFAULT_SEGMENTS
): Point3D[] {
  const minZ = center.z - radius
  const maxZ = center.z + radius
  if (z < minZ || z > maxZ) return []

  const sliceRadius = Math.sqrt(Math.max(0, radius * radius - (z - center.z) ** 2))
  if (sliceRadius < 1e-6) return [{ x: center.x, y: center.y, z }]

  const points: Point3D[] = []
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2
    points.push({
      x: center.x + sliceRadius * Math.cos(theta),
      y: center.y + sliceRadius * Math.sin(theta),
      z,
    })
  }
  return points
}

export function getLayerContourAtZ(
  params: ShapeParameters,
  z: number,
  center: Point3D = { x: 0, y: 0, z: 0 },
  segments?: number
): Point3D[] {
  const segs = segments ?? DEFAULT_SEGMENTS
  switch (params.type) {
    case 'cube':
      return sliceCubeAtZ(
        params.dimensions.width ?? 10,
        params.dimensions.height ?? 10,
        params.dimensions.depth ?? 10,
        z,
        center
      )
    case 'cylinder':
      return sliceCylinderAtZ(
        params.dimensions.radius ?? 5,
        params.dimensions.height ?? 10,
        z,
        center,
        segs
      )
    case 'sphere':
      return sliceSphereAtZ(
        params.dimensions.radius ?? 5,
        z,
        center,
        segs
      )
    default:
      return []
  }
}

/**
 * Get the Z range (min, max) for slicing a shape.
 */
export function getShapeZRange(params: ShapeParameters, center: Point3D = { x: 0, y: 0, z: 0 }): { minZ: number; maxZ: number } {
  switch (params.type) {
    case 'cube': {
      const halfD = (params.dimensions.depth ?? 10) / 2
      return { minZ: center.z - halfD, maxZ: center.z + halfD }
    }
    case 'cylinder': {
      const halfH = (params.dimensions.height ?? 10) / 2
      return { minZ: center.z - halfH, maxZ: center.z + halfH }
    }
    case 'sphere': {
      const r = params.dimensions.radius ?? 5
      return { minZ: center.z - r, maxZ: center.z + r }
    }
    default:
      return { minZ: 0, maxZ: 0 }
  }
}
