import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import { Suspense } from 'react'
import { Box, Paper } from '@mui/material'

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Grid args={[10, 10]} cellColor="#6f6f6f" sectionColor="#9d4b4b" />
      <OrbitControls />
      {/* GCode visualization will be added here */}
    </>
  )
}

export default function GCodeViewer() {
  return (
    <Box component="div" sx={{ width: '100%', height: '100%' }}>
      <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <Canvas
          camera={{ position: [5, 5, 5], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </Paper>
    </Box>
  )
}
