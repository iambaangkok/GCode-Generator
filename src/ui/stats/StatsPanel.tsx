import { Paper, Typography, Box, Divider } from '@mui/material'
import { useGCodeStore } from '@/stores/gcodeStore'

const paperSx = { p: 2 }
const dividerSx = { my: 1 }
const contentBoxSx = { display: 'flex', flexDirection: 'column', gap: 1 }

export default function StatsPanel() {
  const stats = useGCodeStore((state) => state.stats)

  return (
    <Paper sx={paperSx}>
      <Typography variant="h6" gutterBottom>
        Print Statistics
      </Typography>
      <Divider sx={dividerSx} />
      <Box component="div" sx={contentBoxSx}>
        <Box component="div">
          <Typography variant="body2" color="text.secondary">
            Print Time
          </Typography>
          <Typography variant="body1">
            {stats.printTime > 0 ? `${stats.printTime.toFixed(1)} min` : 'N/A'}
          </Typography>
        </Box>
        <Box component="div">
          <Typography variant="body2" color="text.secondary">
            Filament Used
          </Typography>
          <Typography variant="body1">
            {stats.filamentUsed > 0 ? `${stats.filamentUsed.toFixed(2)} mm` : 'N/A'}
          </Typography>
        </Box>
        <Box component="div">
          <Typography variant="body2" color="text.secondary">
            Layer Count
          </Typography>
          <Typography variant="body1">
            {stats.layerCount > 0 ? stats.layerCount : 'N/A'}
          </Typography>
        </Box>
        <Box component="div">
          <Typography variant="body2" color="text.secondary">
            Total Moves
          </Typography>
          <Typography variant="body1">
            {stats.totalMoves > 0 ? stats.totalMoves : 'N/A'}
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}
