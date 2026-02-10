import { Paper, Typography, TextField, Box, Divider, Button } from '@mui/material'
import { useGCodeStore } from '@/stores/gcodeStore'

const paperSx = { p: 2 }
const dividerSx = { my: 1 }
const contentBoxSx = { display: 'flex', flexDirection: 'column', gap: 2 }
const rowBoxSx = { display: 'flex', gap: 1 }
const textFieldSx = { flex: 1 }

export default function TransformControls() {
  const transform = useGCodeStore((state) => state.transform)
  const updateTransform = useGCodeStore((state) => state.updateTransform)
  const resetTransform = useGCodeStore((state) => state.resetTransform)

  return (
    <Paper sx={paperSx}>
      <Typography variant="h6" gutterBottom>
        Model Transform
      </Typography>
      <Divider sx={dividerSx} />
      <Box component="div" sx={contentBoxSx}>
        <Box component="div">
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Rotation (degrees)
          </Typography>
          <Box component="div" sx={rowBoxSx}>
            <TextField
              label="X"
              type="number"
              value={transform.rotation.x}
              onChange={(e) =>
                updateTransform({
                  rotation: { ...transform.rotation, x: parseFloat(e.target.value) || 0 },
                })
              }
              size="small"
              sx={textFieldSx}
            />
            <TextField
              label="Y"
              type="number"
              value={transform.rotation.y}
              onChange={(e) =>
                updateTransform({
                  rotation: { ...transform.rotation, y: parseFloat(e.target.value) || 0 },
                })
              }
              size="small"
              sx={textFieldSx}
            />
            <TextField
              label="Z"
              type="number"
              value={transform.rotation.z}
              onChange={(e) =>
                updateTransform({
                  rotation: { ...transform.rotation, z: parseFloat(e.target.value) || 0 },
                })
              }
              size="small"
              sx={textFieldSx}
            />
          </Box>
        </Box>
        <Box component="div">
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Scale
          </Typography>
          <Box component="div" sx={rowBoxSx}>
            <TextField
              label="X"
              type="number"
              value={transform.scale.x}
              onChange={(e) =>
                updateTransform({
                  scale: { ...transform.scale, x: parseFloat(e.target.value) || 1 },
                })
              }
              size="small"
              sx={textFieldSx}
              inputProps={{ step: 0.1, min: 0.1 }}
            />
            <TextField
              label="Y"
              type="number"
              value={transform.scale.y}
              onChange={(e) =>
                updateTransform({
                  scale: { ...transform.scale, y: parseFloat(e.target.value) || 1 },
                })
              }
              size="small"
              sx={textFieldSx}
              inputProps={{ step: 0.1, min: 0.1 }}
            />
            <TextField
              label="Z"
              type="number"
              value={transform.scale.z}
              onChange={(e) =>
                updateTransform({
                  scale: { ...transform.scale, z: parseFloat(e.target.value) || 1 },
                })
              }
              size="small"
              sx={textFieldSx}
              inputProps={{ step: 0.1, min: 0.1 }}
            />
          </Box>
        </Box>
        <Box component="div">
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Translation (mm)
          </Typography>
          <Box component="div" sx={rowBoxSx}>
            <TextField
              label="X"
              type="number"
              value={transform.translation.x}
              onChange={(e) =>
                updateTransform({
                  translation: { ...transform.translation, x: parseFloat(e.target.value) || 0 },
                })
              }
              size="small"
              sx={textFieldSx}
            />
            <TextField
              label="Y"
              type="number"
              value={transform.translation.y}
              onChange={(e) =>
                updateTransform({
                  translation: { ...transform.translation, y: parseFloat(e.target.value) || 0 },
                })
              }
              size="small"
              sx={textFieldSx}
            />
            <TextField
              label="Z"
              type="number"
              value={transform.translation.z}
              onChange={(e) =>
                updateTransform({
                  translation: { ...transform.translation, z: parseFloat(e.target.value) || 0 },
                })
              }
              size="small"
              sx={textFieldSx}
            />
          </Box>
        </Box>
        <Button variant="outlined" onClick={resetTransform} fullWidth>
          Reset Transform
        </Button>
      </Box>
    </Paper>
  )
}
