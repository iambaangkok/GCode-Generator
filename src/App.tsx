import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Container, Typography, Box } from '@mui/material'
import GCodeViewer from './visualization/gcode-viewer/GCodeViewer'
import StatsPanel from './ui/stats/StatsPanel'
import SettingsPanel from './ui/settings/SettingsPanel'
import TransformControls from './ui/transforms/TransformControls'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth={false} sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          GCode Generator
        </Typography>
        <Box sx={{ display: 'flex', flex: 1, gap: 2, overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
            <SettingsPanel />
            <TransformControls />
            <StatsPanel />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <GCodeViewer />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
