import { Paper, Typography, TextField, Box, Divider } from '@mui/material'
import { useGCodeStore } from '@/stores/gcodeStore'

export default function SettingsPanel() {
  const printerSettings = useGCodeStore((state) => state.printerSettings)
  const updatePrinterSettings = useGCodeStore((state) => state.updatePrinterSettings)

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Printer Settings
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nozzle Diameter (mm)"
          type="number"
          value={printerSettings.nozzleDiameter}
          onChange={(e) =>
            updatePrinterSettings({ nozzleDiameter: parseFloat(e.target.value) || 0 })
          }
          size="small"
          inputProps={{ step: 0.1, min: 0.1 }}
        />
        <TextField
          label="Layer Height (mm)"
          type="number"
          value={printerSettings.layerHeight}
          onChange={(e) =>
            updatePrinterSettings({ layerHeight: parseFloat(e.target.value) || 0 })
          }
          size="small"
          inputProps={{ step: 0.05, min: 0.05 }}
        />
        <TextField
          label="Print Speed (mm/s)"
          type="number"
          value={printerSettings.printSpeed}
          onChange={(e) =>
            updatePrinterSettings({ printSpeed: parseFloat(e.target.value) || 0 })
          }
          size="small"
          inputProps={{ step: 1, min: 1 }}
        />
        <TextField
          label="Filament Diameter (mm)"
          type="number"
          value={printerSettings.filamentDiameter}
          onChange={(e) =>
            updatePrinterSettings({ filamentDiameter: parseFloat(e.target.value) || 0 })
          }
          size="small"
          inputProps={{ step: 0.1, min: 0.1 }}
        />
        <TextField
          label="Bed Temperature (°C)"
          type="number"
          value={printerSettings.bedTemperature}
          onChange={(e) =>
            updatePrinterSettings({ bedTemperature: parseFloat(e.target.value) || 0 })
          }
          size="small"
          inputProps={{ step: 1, min: 0 }}
        />
        <TextField
          label="Nozzle Temperature (°C)"
          type="number"
          value={printerSettings.nozzleTemperature}
          onChange={(e) =>
            updatePrinterSettings({ nozzleTemperature: parseFloat(e.target.value) || 0 })
          }
          size="small"
          inputProps={{ step: 1, min: 0 }}
        />
      </Box>
    </Paper>
  )
}
