import { create } from 'zustand'

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

interface GCodeState {
  printerSettings: PrinterSettings
  transform: Transform
  stats: PrintStats
  gcode: string[]
  updatePrinterSettings: (settings: Partial<PrinterSettings>) => void
  updateTransform: (transform: Partial<Transform>) => void
  resetTransform: () => void
  setStats: (stats: Partial<PrintStats>) => void
  setGCode: (gcode: string[]) => void
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

export const useGCodeStore = create<GCodeState>((set) => ({
  printerSettings: defaultPrinterSettings,
  transform: defaultTransform,
  stats: defaultStats,
  gcode: [],
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
  setGCode: (gcode) => set({ gcode }),
}))
