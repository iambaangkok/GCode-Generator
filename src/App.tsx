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

const containerSx = { height: '100vh', display: 'flex', flexDirection: 'column', p: 2 }
const mainBoxSx = { display: 'flex', flex: 1, gap: 2, overflow: 'hidden' }
const sidebarBoxSx = { display: 'flex', flexDirection: 'column', gap: 2, width: 300 }
const viewerBoxSx = { flex: 1, minWidth: 0 }

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth={false} sx={containerSx}>
        <Typography variant="h4" component="h1" gutterBottom>
          GCode Generator
        </Typography>
        <Box component="div" sx={mainBoxSx}>
          <Box component="div" sx={sidebarBoxSx}>
            <SettingsPanel />
            <TransformControls />
            <StatsPanel />
          </Box>
          <Box component="div" sx={viewerBoxSx}>
            <GCodeViewer />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
