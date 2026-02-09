# System Architecture

## Overview

The GCode Generator is a desktop application built with TypeScript, React, and Electron that generates G-code files for 3D FDM printing, with a focus on non-planar printing capabilities.

## Technology Stack

### Frontend
- **TypeScript** - Type-safe JavaScript with modern features
- **React 18** - UI framework for building component-based interfaces
- **Vite** - Fast build tool and development server
- **Material-UI (MUI)** - Component library for consistent UI
- **zustand** - Lightweight state management

### 3D Visualization
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Helpers and utilities for R3F

### Desktop Application
- **Electron** - Desktop wrapper for cross-platform distribution
- **electron-builder** - Build and package the application

### Math & Geometry
- **gl-matrix** - High-performance matrix and vector math library

## Architecture Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer               │
│  (React Components, UI, Visualization)  │
├─────────────────────────────────────────┤
│         Application Layer                │
│     (State Management, Business Logic)  │
├─────────────────────────────────────────┤
│          Core Layer                     │
│  (GCode Generation, Geometry, Transforms)│
├─────────────────────────────────────────┤
│          Platform Layer                 │
│      (Electron, File System, OS APIs)   │
└─────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── core/                    # Core business logic
│   ├── geometry/            # Shape generation (cube, sphere, cylinder)
│   ├── gcode/               # GCode generation and formatting
│   └── transforms/          # 3D transformations (rotate, scale, translate)
├── visualization/           # 3D rendering components
│   ├── scene/               # Three.js scene setup
│   ├── gcode-viewer/        # GCode visualization component
│   └── controls/            # Camera and interaction controls
├── ui/                      # React UI components
│   ├── stats/               # Print statistics display
│   ├── settings/            # Printer settings panel
│   └── transforms/          # Model transform controls
├── stores/                  # State management (zustand)
├── types/                   # TypeScript type definitions
└── utils/                   # Utility functions
```

## Data Flow

```
User Input (Settings/Transforms)
    ↓
State Store (zustand)
    ↓
Core Modules (Geometry → Transform → GCode)
    ↓
State Store (Updated GCode & Stats)
    ↓
UI Components (Display Stats, Show 3D Visualization)
```

## Key Components

### State Management (`stores/gcodeStore.ts`)
Centralized state using zustand:
- Printer settings (nozzle diameter, layer height, temperatures, etc.)
- Model transformations (rotation, scale, translation)
- Print statistics (time, filament usage, layer count)
- Generated GCode

### Geometry Generation (`core/geometry/shapeGenerators.ts`)
Functions to generate 3D points for basic shapes:
- `generateCubePoints()` - Cube geometry
- `generateSpherePoints()` - Sphere geometry
- `generateCylinderPoints()` - Cylinder geometry

### Transformations (`core/transforms/transformUtils.ts`)
Apply 3D transformations using gl-matrix:
- Rotation (X, Y, Z axes)
- Scaling (uniform or per-axis)
- Translation (X, Y, Z offsets)

### GCode Generation (`core/gcode/gcodeGenerator.ts`)
Convert geometry to GCode commands:
- Header generation (printer initialization, temperatures)
- Layer-by-layer path generation
- Extrusion calculation based on printer settings
- Footer generation (cleanup, stepper disable)

### 3D Visualization (`visualization/gcode-viewer/GCodeViewer.tsx`)
React Three Fiber component that:
- Renders GCode paths as 3D lines
- Visualizes flow rate through line thickness
- Provides camera controls for inspection
- Updates in real-time as GCode is generated

## Development Modes

### Localhost Development
```bash
npm run dev
```
- Runs Vite dev server on `http://localhost:5173`
- Hot module replacement enabled
- Fast iteration cycle
- Browser-based testing

### Electron Development
```bash
npm run dev:electron
```
- Wraps localhost dev server in Electron window
- Full desktop app experience
- File system access available
- Debugging tools available

### Production Build
```bash
npm run build:electron
```
- Builds optimized web assets
- Packages Electron app
- Creates Windows installer (NSIS)
- Ready for distribution

## Future Extensibility

The architecture is designed to support:

1. **Complex Shapes**: The geometry system can be extended with:
   - STL file import
   - Parametric shape generators
   - Custom path algorithms

2. **Non-Planar Printing**: The GCode generator can be enhanced with:
   - Curved layer paths
   - Variable layer heights
   - Advanced toolpath algorithms

3. **GCode Editing**: The visualization layer can be extended with:
   - Interactive path editing
   - Drag-and-drop path manipulation
   - Real-time preview updates

4. **Advanced Features**:
   - Multi-material support
   - Support structure generation
   - Print optimization algorithms
   - Slicing algorithms

## Integration Points

### BambuStudio Compatibility
- GCode output follows standard G-code format
- Includes necessary header commands
- Compatible with BambuStudio import
- Documentation provided for copy-paste workflow

### File System (Electron)
- Save GCode files to disk
- Load configuration files
- Export settings presets
- Import model files (future)

## Performance Considerations

- **3D Rendering**: Uses WebGL for hardware acceleration
- **State Updates**: Zustand provides efficient re-renders
- **GCode Generation**: Computed on-demand, cached when possible
- **Large Models**: Future optimization with level-of-detail (LOD) rendering

## Security Considerations

- Electron context isolation (can be enabled)
- Input validation on all user inputs
- Safe file operations through Electron APIs
- No network requests (offline-first design)
