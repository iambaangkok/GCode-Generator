import { Paper, Typography, TextField, Box, Divider, Button } from '@mui/material'
import { useGCodeStore } from '@/stores/gcodeStore'

export default function TransformControls() {
  const transform = useGCodeStore((state) => state.transform)
  const updateTransform = useGCodeStore((state) => state.updateTransform)
  const resetTransform = useGCodeStore((state) => state.resetTransform)

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Model Transform
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Rotation (degrees)
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
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
              sx={{ flex: 1 }}
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
              sx={{ flex: 1 }}
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
              sx={{ flex: 1 }}
            />
          </Box>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Scale
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
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
              sx={{ flex: 1 }}
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
              sx={{ flex: 1 }}
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
              sx={{ flex: 1 }}
              inputProps={{ step: 0.1, min: 0.1 }}
            />
          </Box>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Translation (mm)
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
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
              sx={{ flex: 1 }}
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
              sx={{ flex: 1 }}
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
              sx={{ flex: 1 }}
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
