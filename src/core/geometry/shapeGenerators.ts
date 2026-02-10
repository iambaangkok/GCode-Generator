import { Point3D, ShapeParameters } from '@/types'

/**
 * Generate geometry for basic shapes
 * These will be used to create GCode paths
 */

export function generateCubePoints(
  width: number,
  height: number,
  depth: number,
  center: Point3D = { x: 0, y: 0, z: 0 }
): Point3D[] {
  const halfW = width / 2
  const halfH = height / 2
  const halfD = depth / 2

  return [
    // Bottom face
    { x: center.x - halfW, y: center.y - halfH, z: center.z - halfD },
    { x: center.x + halfW, y: center.y - halfH, z: center.z - halfD },
    { x: center.x + halfW, y: center.y + halfH, z: center.z - halfD },
    { x: center.x - halfW, y: center.y + halfH, z: center.z - halfD },
    { x: center.x - halfW, y: center.y - halfH, z: center.z - halfD }, // Close loop
    // Top face
    { x: center.x - halfW, y: center.y - halfH, z: center.z + halfD },
    { x: center.x + halfW, y: center.y - halfH, z: center.z + halfD },
    { x: center.x + halfW, y: center.y + halfH, z: center.z + halfD },
    { x: center.x - halfW, y: center.y + halfH, z: center.z + halfD },
    { x: center.x - halfW, y: center.y - halfH, z: center.z + halfD }, // Close loop
  ]
}

export function generateSpherePoints(
  radius: number,
  center: Point3D = { x: 0, y: 0, z: 0 },
  segments: number = 32
): Point3D[] {
  const points: Point3D[] = []

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2
    for (let j = 0; j <= segments; j++) {
      const phi = (j / segments) * Math.PI
      const x = center.x + radius * Math.sin(phi) * Math.cos(theta)
      const y = center.y + radius * Math.sin(phi) * Math.sin(theta)
      const z = center.z + radius * Math.cos(phi)
      points.push({ x, y, z })
    }
  }

  return points
}

export function generateCylinderPoints(
  radius: number,
  height: number,
  center: Point3D = { x: 0, y: 0, z: 0 },
  segments: number = 32
): Point3D[] {
  const points: Point3D[] = []
  const halfHeight = height / 2

  // Bottom circle
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2
    points.push({
      x: center.x + radius * Math.cos(theta),
      y: center.y + radius * Math.sin(theta),
      z: center.z - halfHeight,
    })
  }

  // Top circle
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2
    points.push({
      x: center.x + radius * Math.cos(theta),
      y: center.y + radius * Math.sin(theta),
      z: center.z + halfHeight,
    })
  }

  return points
}

export function generateShapePoints(params: ShapeParameters, center: Point3D = { x: 0, y: 0, z: 0 }): Point3D[] {
  switch (params.type) {
    case 'cube':
      return generateCubePoints(
        params.dimensions.width || 10,
        params.dimensions.height || 10,
        params.dimensions.depth || 10,
        center
      )
    case 'sphere':
      return generateSpherePoints(params.dimensions.radius || 5, center)
    case 'cylinder':
      return generateCylinderPoints(
        params.dimensions.radius || 5,
        params.dimensions.height || 10,
        center
      )
    default:
      return []
  }
}
