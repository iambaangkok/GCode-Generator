import {
  Paper,
  Typography,
  TextField,
  Box,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'
import { useGCodeStore } from '@/stores/gcodeStore'
import type { ShapeParameters } from '@/types'

const paperSx = { p: 2 }
const dividerSx = { my: 1 }
const contentBoxSx = { display: 'flex', flexDirection: 'column', gap: 2 }
const dimInputProps = { step: 1, min: 1 }

export default function ShapeSelector() {
  const shapeParameters = useGCodeStore((state) => state.shapeParameters)
  const updateShapeParameters = useGCodeStore((state) => state.updateShapeParameters)

  const handleTypeChange = (type: ShapeParameters['type']) => {
    updateShapeParameters({ type })
  }

  const handleDimensionChange = (key: keyof ShapeParameters['dimensions'], value: number) => {
    updateShapeParameters({
      dimensions: { ...shapeParameters.dimensions, [key]: value },
    })
  }

  return (
    <Paper sx={paperSx}>
      <Typography variant="h6" gutterBottom>
        Shape Selection
      </Typography>
      <Divider sx={dividerSx} />
      <Box component="div" sx={contentBoxSx}>
        <RadioGroup
          value={shapeParameters.type}
          onChange={(e) => handleTypeChange(e.target.value as ShapeParameters['type'])}
        >
          <FormControlLabel value="cube" control={<Radio />} label="Cube" />
          <FormControlLabel value="sphere" control={<Radio />} label="Sphere" />
          <FormControlLabel value="cylinder" control={<Radio />} label="Cylinder" />
        </RadioGroup>

        {shapeParameters.type === 'cube' && (
          <Box component="div" sx={contentBoxSx}>
            <TextField
              label="Width (mm)"
              type="number"
              value={shapeParameters.dimensions.width ?? 20}
              onChange={(e) =>
                handleDimensionChange('width', parseFloat(e.target.value) || 1)
              }
              size="small"
              inputProps={dimInputProps}
            />
            <TextField
              label="Height (mm)"
              type="number"
              value={shapeParameters.dimensions.height ?? 20}
              onChange={(e) =>
                handleDimensionChange('height', parseFloat(e.target.value) || 1)
              }
              size="small"
              inputProps={dimInputProps}
            />
            <TextField
              label="Depth (mm)"
              type="number"
              value={shapeParameters.dimensions.depth ?? 20}
              onChange={(e) =>
                handleDimensionChange('depth', parseFloat(e.target.value) || 1)
              }
              size="small"
              inputProps={dimInputProps}
            />
          </Box>
        )}

        {shapeParameters.type === 'sphere' && (
          <TextField
            label="Radius (mm)"
            type="number"
            value={shapeParameters.dimensions.radius ?? 10}
            onChange={(e) =>
              handleDimensionChange('radius', parseFloat(e.target.value) || 1)
            }
            size="small"
            inputProps={dimInputProps}
          />
        )}

        {shapeParameters.type === 'cylinder' && (
          <Box component="div" sx={contentBoxSx}>
            <TextField
              label="Radius (mm)"
              type="number"
              value={shapeParameters.dimensions.radius ?? 10}
              onChange={(e) =>
                handleDimensionChange('radius', parseFloat(e.target.value) || 1)
              }
              size="small"
              inputProps={dimInputProps}
            />
            <TextField
              label="Height (mm)"
              type="number"
              value={shapeParameters.dimensions.height ?? 20}
              onChange={(e) =>
                handleDimensionChange('height', parseFloat(e.target.value) || 1)
              }
              size="small"
              inputProps={dimInputProps}
            />
          </Box>
        )}
      </Box>
    </Paper>
  )
}
