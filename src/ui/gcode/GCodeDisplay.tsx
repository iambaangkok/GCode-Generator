import { Paper, Typography, TextField, Box, Divider, Button } from '@mui/material'
import ContentCopy from '@mui/icons-material/ContentCopy'
import { useGCodeStore } from '@/stores/gcodeStore'
import { useCallback } from 'react'

const paperSx = { p: 2, display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }
const dividerSx = { my: 1 }
const textFieldSx = {
  '& .MuiInputBase-input': {
    fontFamily: 'monospace',
    fontSize: '0.8rem',
  },
}

export default function GCodeDisplay() {
  const gcode = useGCodeStore((state) => state.gcode)
  const setGCode = useGCodeStore((state) => state.setGCode)

  const displayValue = gcode.join('\n')
  const isEmpty = gcode.length === 0

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value
      setGCode(value ? value.split('\n') : [])
    },
    [setGCode]
  )

  const handleCopy = useCallback(async () => {
    const text = displayValue
    if (text) {
      await navigator.clipboard.writeText(text)
    }
  }, [displayValue])

  return (
    <Paper sx={paperSx}>
      <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">GCode Output</Typography>
        <Button
          size="small"
          startIcon={<ContentCopy />}
          onClick={handleCopy}
          disabled={isEmpty}
        >
          Copy
        </Button>
      </Box>
      <Divider sx={dividerSx} />
      <TextField
        multiline
        minRows={8}
        maxRows={24}
        fullWidth
        placeholder="No GCode generated yet. Click Generate GCode to create."
        value={displayValue}
        onChange={handleChange}
        sx={textFieldSx}
        inputProps={{
          style: { fontFamily: 'monospace' },
          spellCheck: false,
        }}
      />
    </Paper>
  )
}
