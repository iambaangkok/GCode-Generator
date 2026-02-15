import { create } from 'zustand'
import type { ShapeParameters } from '@/types'

export interface PrinterSettings {
  nozzleDiameter: number
  layerHeight: number
  printSpeed: number
  filamentDiameter: number
  bedTemperature: number
  nozzleTemperature: number
}

export interface Transform {
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
  translation: { x: number; y: number; z: number }
}

export interface PrintStats {
  printTime: number // minutes
  filamentUsed: number // mm
  layerCount: number
  totalMoves: number
}

const defaultShapeParameters: ShapeParameters = {
  type: 'cube',
  dimensions: { width: 20, height: 20, depth: 20 },
}

interface GCodeState {
  printerSettings: PrinterSettings
  transform: Transform
  stats: PrintStats
  gcode: string[]
  gcodeVersion: number
  shapeParameters: ShapeParameters
  updatePrinterSettings: (settings: Partial<PrinterSettings>) => void
  updateTransform: (transform: Partial<Transform>) => void
  resetTransform: () => void
  setStats: (stats: Partial<PrintStats>) => void
  setGCode: (gcode: string[]) => void
  updateShapeParameters: (params: Partial<ShapeParameters>) => void
}

const defaultPrinterSettings: PrinterSettings = {
  nozzleDiameter: 0.4,
  layerHeight: 0.2,
  printSpeed: 60,
  filamentDiameter: 1.75,
  bedTemperature: 60,
  nozzleTemperature: 220,
}

const defaultTransform: Transform = {
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
  translation: { x: 0, y: 0, z: 0 },
}

const defaultStats: PrintStats = {
  printTime: 0,
  filamentUsed: 0,
  layerCount: 0,
  totalMoves: 0,
}

const shapeDefaultsByType: Record<ShapeParameters['type'], ShapeParameters['dimensions']> = {
  cube: { width: 20, height: 20, depth: 20 },
  sphere: { radius: 10 },
  cylinder: { radius: 10, height: 20 },
}

export const useGCodeStore = create<GCodeState>((set) => ({
  printerSettings: defaultPrinterSettings,
  transform: defaultTransform,
  stats: defaultStats,
  gcode: [],
  gcodeVersion: 0,
  shapeParameters: defaultShapeParameters,
  updatePrinterSettings: (settings) =>
    set((state) => ({
      printerSettings: { ...state.printerSettings, ...settings },
    })),
  updateTransform: (newTransform) =>
    set((state) => ({
      transform: { ...state.transform, ...newTransform },
    })),
  resetTransform: () => set({ transform: defaultTransform }),
  setStats: (stats) =>
    set((state) => ({
      stats: { ...state.stats, ...stats },
    })),
  setGCode: (gcode) => set((s) => ({ gcode, gcodeVersion: s.gcodeVersion + 1 })),
  updateShapeParameters: (params) =>
    set((state) => {
      const newType = params.type ?? state.shapeParameters.type
      const newDimensions =
        params.type !== undefined
          ? shapeDefaultsByType[params.type]
          : params.dimensions !== undefined
            ? { ...state.shapeParameters.dimensions, ...params.dimensions }
            : state.shapeParameters.dimensions
      return {
        shapeParameters: { type: newType, dimensions: newDimensions },
      }
    }),
}))
