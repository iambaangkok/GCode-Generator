# GCode Generator

A desktop application for generating G-code files for 3D FDM printing, with a focus on non-planar printing capabilities. Features a 3D visualization window for inspecting generated GCode and comprehensive print statistics.

## Table of Contents

- [GCode Generator](#gcode-generator)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Development](#development)
  - [Building](#building)
  - [Project Structure](#project-structure)
  - [Usage](#usage)
  - [Development Roadmap](#development-roadmap)
    - [Phase 1: Basic Functionality ✅](#phase-1-basic-functionality-)
    - [Phase 2: GCode Generation (In Progress)](#phase-2-gcode-generation-in-progress)
    - [Phase 3: Enhanced Features](#phase-3-enhanced-features)
    - [Phase 4: Advanced Features](#phase-4-advanced-features)
  - [Contributing](#contributing)
  - [Acknowledgments](#acknowledgments)

## Features

- 🎨 **3D Visualization** - Interactive 3D viewer for inspecting generated GCode paths
- 📊 **Print Statistics** - Real-time display of print time, filament usage, and layer information
- ⚙️ **Printer Settings** - Configurable printer parameters (nozzle, layer height, temperatures, etc.)
- 🔄 **Model Transformations** - Rotate, scale, and translate models before generating GCode
- 📦 **Basic Shapes** - Generate GCode for cubes, spheres, and cylinders
- 🖨️ **BambuStudio Compatible** - Generated GCode can be imported into BambuStudio slicer

## Tech Stack

- **TypeScript** + **React 18** + **Vite**
- **Three.js** + **React Three Fiber** (3D visualization)
- **Material-UI** (UI components)
- **Electron** (Desktop wrapper)
- **zustand** (State management)

## Getting Started

### Prerequisites

- **Node.js** 20.19+ ([nodejs.org](https://nodejs.org/))
- **Git** (optional, for cloning)

**Optional: Install Git via Chocolatey**
```powershell
# Run PowerShell as Administrator
choco install git -y
```

### Installation

```bash
git clone <repository-url>
cd GCode-Generator
npm install
```

## Development

**Browser (localhost):**
```bash
npm run dev
```
Opens `http://localhost:5173` with hot reload.

**Desktop (Electron):**
```bash
npm run dev:electron
```
This command will:
1. Start the Vite dev server on `http://localhost:5173`
2. Wait for the server to be ready
3. Compile TypeScript files (`electron/main.ts` → `electron/main.js` and `electron/preload.ts` → `electron/preload.js`)
4. Launch Electron with the dev server

**Note:** The TypeScript compilation step generates `electron/main.js` and `electron/preload.js` from their `.ts` sources. These compiled `.js` files are required for Electron to run.

The Electron window will open automatically and connect to the Vite dev server with hot reload enabled.

## Building

**Web assets:**
```bash
npm run build
```
Output: `dist/`

**Desktop app:**
```bash
npm run build:electron
```
Output: `dist-electron/GCode Generator Setup.exe`

## Project Structure

See [project-structure.md](.markdown/project-structure.md) for detailed structure and conventions.

## Usage

1. Configure printer settings (nozzle, layer height, temperatures)
2. Select shape and dimensions (coming soon)
3. Apply transformations (optional)
4. Generate GCode (coming soon)
5. Copy/export GCode to BambuStudio

**BambuStudio Integration:**
1. Generate GCode in the application
2. Copy the GCode output
3. Paste into BambuStudio GCode editor
4. Review and print

## Development Roadmap

### Phase 1: Basic Functionality ✅
- [x] Project setup and structure
- [x] Basic UI components
- [x] 3D visualization framework
- [x] State management
- [x] Printer settings panel

### Phase 2: GCode Generation (In Progress)
- [ ] Shape selection UI
- [ ] GCode generation for basic shapes
- [ ] Statistics calculation
- [ ] GCode export functionality

### Phase 3: Enhanced Features
- [ ] STL file import
- [ ] Advanced transformations
- [ ] Non-planar path generation
- [ ] GCode editing in 3D view

### Phase 4: Advanced Features
- [ ] Support structure generation
- [ ] Multi-material support
- [ ] Print optimization
- [ ] Custom toolpath algorithms

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## Acknowledgments

- Three.js, React Three Fiber, Material-UI, Electron communities
