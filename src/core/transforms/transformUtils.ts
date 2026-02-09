import { Point3D } from '@/types'
import { mat4, vec3 } from 'gl-matrix'

/**
 * Apply transformations to 3D points
 */

export function transformPoint(
  point: Point3D,
  rotation: { x: number; y: number; z: number },
  scale: { x: number; y: number; z: number },
  translation: { x: number; y: number; z: number }
): Point3D {
  const matrix = mat4.create()
  const pointVec = vec3.fromValues(point.x, point.y, point.z)

  // Apply transformations in order: scale -> rotate -> translate
  mat4.translate(matrix, matrix, [translation.x, translation.y, translation.z])
  
  // Rotate around X, Y, Z axes
  mat4.rotateX(matrix, matrix, (rotation.x * Math.PI) / 180)
  mat4.rotateY(matrix, matrix, (rotation.y * Math.PI) / 180)
  mat4.rotateZ(matrix, matrix, (rotation.z * Math.PI) / 180)
  
  mat4.scale(matrix, matrix, [scale.x, scale.y, scale.z])

  // Transform point
  vec3.transformMat4(pointVec, pointVec, matrix)

  return {
    x: pointVec[0],
    y: pointVec[1],
    z: pointVec[2],
  }
}

export function transformPoints(
  points: Point3D[],
  rotation: { x: number; y: number; z: number },
  scale: { x: number; y: number; z: number },
  translation: { x: number; y: number; z: number }
): Point3D[] {
  return points.map((point) => transformPoint(point, rotation, scale, translation))
}
