import { useState } from 'react'
import { Button, CircularProgress, Box } from '@mui/material'
import { useGCodeStore } from '@/stores/gcodeStore'
import { generateShapePoints } from '@/core/geometry/shapeGenerators'
import { transformPoints } from '@/core/transforms/transformUtils'
import { generateFullGCode } from '@/core/gcode/gcodeGenerator'
import { calculateStatsFromGCode } from '@/core/gcode/statsCalculator'

export default function GenerateButton() {
  const [loading, setLoading] = useState(false)

  const shapeParameters = useGCodeStore((state) => state.shapeParameters)
  const transform = useGCodeStore((state) => state.transform)
  const printerSettings = useGCodeStore((state) => state.printerSettings)
  const setGCode = useGCodeStore((state) => state.setGCode)
  const setStats = useGCodeStore((state) => state.setStats)

  const handleGenerate = () => {
    setLoading(true)
    setTimeout(() => {
      try {
        const points = generateShapePoints(shapeParameters)
        const transformedPoints = transformPoints(
          points,
          transform.rotation,
          transform.scale,
          transform.translation
        )
        const gcode = generateFullGCode(transformedPoints, printerSettings)
        const stats = calculateStatsFromGCode(gcode)
        setGCode(gcode)
        setStats(stats)
      } finally {
        setLoading(false)
      }
    }, 0)
  }

  return (
    <Box component="div" sx={{ width: '100%' }}>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        onClick={handleGenerate}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {loading ? 'Generating...' : 'Generate GCode'}
      </Button>
    </Box>
  )
}
