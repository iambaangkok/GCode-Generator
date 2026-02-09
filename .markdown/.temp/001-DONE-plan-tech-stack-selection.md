# Tech Stack Selection Plan

**Status**: DONE  
**Related Requirements**: [REQ-001-WIP-project-initialization.md](../requirements/REQ-001-WIP-project-initialization.md)

## Analysis Summary

Based on the requirements and user preferences:

- **3D visualization** is a core requirement (with future editing capabilities)
- User wants **easy to code and maintain** (not production-scale complexity)
- Should **run in most places** (cross-platform preference)
- Performance is **important** but not critical
- User has experience with: Python, TypeScript, C++, Java, C#, Go

## Recommended Tech Stack: TypeScript + Web Application with Desktop Wrapper

### Development Approach: Hybrid Web + Desktop

**Single codebase** that works in two modes:

1. **Development**: Run on `localhost` via Vite dev server (fast iteration, hot reload)
2. **Distribution**: Wrapped in Electron/Tauri for native desktop app

This approach gives you:

- ✅ Fast development workflow (localhost with hot reload)
- ✅ Native desktop app for end users
- ✅ Single codebase to maintain
- ✅ Easy testing (test in browser, deploy as desktop app)

### Core Technology Choices

**Frontend Framework & Language:**

- **TypeScript** - Type safety, easy maintenance, excellent tooling
- **React** - Modern UI framework (best Three.js integration)
- **Vite** - Fast build tool and dev server (localhost development)

**3D Visualization:**

- **Three.js** - Industry-standard 3D library with excellent documentation
  - Supports custom shaders for flow rate visualization
  - Good performance for GCode line rendering
  - Active community and extensive examples
- **React Three Fiber** - React renderer for Three.js (simplifies integration)
- **@react-three/drei** - Helpers and utilities for R3F

**GCode Generation & Processing:**

- **Custom TypeScript modules** - Build GCode generator from scratch
- **gcode-parser** (npm) - For parsing/validating GCode if needed
- **gl-matrix** - Vector/matrix math for transformations (lightweight, performant)

**UI Components:**

- **Material-UI (MUI)** - Professional component library
- **zustand** - Lightweight state management

**Desktop Wrapper:**

- **Electron** - Mature, widely-used desktop wrapper
  - Pros: Large ecosystem, many examples, easy file system access
  - Cons: Larger bundle size (~100MB+)
- **Tauri** (alternative) - Rust-based, lighter alternative
  - Pros: Much smaller bundle (~5-10MB), better security
  - Cons: Requires Rust toolchain, newer ecosystem

**Recommendation**: Start with **Electron** for easier setup, can migrate to Tauri later if bundle size becomes a concern.

### Project Structure

```
GCode-Generator/
├── src/
│   ├── core/              # GCode generation logic
│   │   ├── geometry/      # Shape generators (cube, sphere, cylinder)
│   │   ├── gcode/         # GCode generation and formatting
│   │   └── transforms/    # Model transformations
│   ├── visualization/     # 3D rendering components
│   │   ├── scene/         # Three.js scene setup
│   │   ├── gcode-viewer/  # GCode visualization
│   │   └── controls/      # Camera/transform controls
│   ├── ui/                # React components
│   │   ├── stats/         # Print stats display
│   │   ├── settings/      # Printer settings panel
│   │   └── transforms/    # Model transform controls
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript type definitions
├── electron/              # Electron wrapper (if using Electron)
│   ├── main.ts            # Main process
│   └── preload.ts         # Preload script
├── public/                # Static assets
├── package.json           # Dependencies
└── vite.config.ts         # Vite configuration
```

### Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "three": "^0.160.x",
    "@react-three/fiber": "^8.x",
    "@react-three/drei": "^9.x",  // Helpers for R3F
    "gl-matrix": "^3.x",          // Math utilities
    "@mui/material": "^5.x",      // UI components
    "zustand": "^4.x"             // State management (lightweight)
  },
  "devDependencies": {
    "typescript": "^5.x",
    "vite": "^5.x",
    "@vitejs/plugin-react": "^4.x",
    "electron": "^28.x",          // Desktop wrapper
    "electron-builder": "^24.x",  // Build/distribution tool
    "@types/node": "^20.x"        // Node types for Electron
  }
}
```

### Development Workflow

**Localhost Development:**
```bash
npm run dev          # Start Vite dev server on localhost:5173
# Open browser to http://localhost:5173
# Hot reload enabled for fast iteration
```

**Desktop App Development:**
```bash
npm run dev:electron # Start Electron with Vite dev server
# Opens Electron window, still uses localhost backend
```

**Production Build:**
```bash
npm run build        # Build web assets
npm run build:electron # Build desktop app (Windows installer)
```

### Alternative: Python Desktop Application

If desktop-only is acceptable:

**Tech Stack:**

- **Python 3.11+**
- **PyQt6** or **PySide6** - Desktop UI framework
- **VTK** or **PyOpenGL** - 3D visualization
- **numpy** - Mathematical computations
- **scipy** - Advanced geometry operations

**Pros:**

- Excellent math/geometry libraries
- Rapid prototyping
- Good for computational geometry

**Cons:**

- Desktop-only (not "runs in most places")
- Heavier dependencies
- More complex deployment

## Recommendation Rationale

**TypeScript + Web** is recommended because:

1. ✅ **Best 3D visualization** - Three.js is unmatched for web-based 3D
2. ✅ **Cross-platform** - Runs anywhere with a browser
3. ✅ **Easy maintenance** - TypeScript provides type safety, modern tooling
4. ✅ **Future extensibility** - Easy to add features, good ecosystem
5. ✅ **User experience** - Can be accessed from any device
6. ✅ **Performance** - WebGL is hardware-accelerated, sufficient for GCode visualization
7. ✅ **Community** - Large ecosystem, many examples

## Finalized Tech Stack

**Confirmed Choices:**

- ✅ **TypeScript + React** - Core framework
- ✅ **Three.js + React Three Fiber** - 3D visualization
- ✅ **Vite** - Build tool and dev server
- ✅ **Electron** - Desktop wrapper
- ✅ **Hybrid approach** - Develop on localhost, distribute as desktop app

## Implementation Strategy

1. **Phase 1**: Set up web app (React + Vite + Three.js)
   - Get basic UI and 3D viewer working on localhost
   - Fast iteration and testing
2. **Phase 2**: Add Electron wrapper
   - Wrap existing web app
   - Configure Electron for file system access (GCode export)
   - Test desktop app functionality
3. **Phase 3**: Enhance with desktop-specific features
   - File dialogs for save/load
   - System tray (optional)
   - Auto-updater (optional, future)

## Implementation Checklist

- [x] Confirm tech stack choice with user
- [x] Initialize project structure with TypeScript + React + Vite + Electron
- [x] Set up package.json with all dependencies
- [x] Configure TypeScript (tsconfig.json, tsconfig.node.json)
- [x] Set up Vite configuration
- [x] Create Electron main process and preload scripts
- [x] Create core module structure (geometry, gcode, transforms)
- [x] Set up React components (UI, visualization)
- [x] Implement state management with zustand
- [x] Create 3D visualization framework
- [x] Document system architecture
- [x] Create README with development instructions

## Notes

- All implementation tasks completed successfully
- Project structure matches the planned architecture
- Ready for feature development (GCode generation, shape selection UI)
- Development environment fully configured
