# Requirements: GCode Visualization

**Status**: WIP  
**Related Requirements**: [REQ-001-DONE-project-initialization.md](REQ-001-DONE-project-initialization.md), [REQ-003-DONE-gcode-generation-integration.md](REQ-003-DONE-gcode-generation-integration.md)  
**Implementation Plan**: [004-WIP-plan-gcode-visualization.md](../.temp/004-WIP-plan-gcode-visualization.md)

## Overview

Users need to see the generated GCode paths visualized in the 3D viewer. The visualization should show the toolpath and optionally reflect flow rate through line thickness.

## Requirements

- Generated GCode should be displayed as 3D paths in the viewer
- Paths should be rendered as lines connecting GCode move commands
- Different layers should be visually distinguishable (color or separation)
- **Flow rate visualization**: Line thickness should reflect extrusion rate (E values)
  - Higher extrusion = thicker line
  - Lower extrusion = thinner line
- Camera controls should allow inspection from all angles
- Visualization should update when new GCode is generated
- Performance should be acceptable for typical GCode files
- **Slice/filter UI**: A UI control to select which part of the GCode to display (e.g., layer range, move range)
  - Default: show all parts
  - Position: bottom right of the 3D plot display
- **Grid and axes**: Grid should auto-scale to fit the GCode (just bigger than the path bounds); main axes (X, Y, Z) should show numeric labels for coordinate tracking

## Technical Notes

- 3D viewer framework exists: `src/visualization/gcode-viewer/GCodeViewer.tsx`
- Uses React Three Fiber and Three.js
- GCode stored in state as string array
- Need to parse GCode lines to extract X, Y, Z, E values
- Can use Three.js LineSegments or BufferGeometry for rendering
- Flow rate can be visualized using line width or custom shaders

## Done So Far

**Phase 1 complete.** Core visualization implemented:

- **GCode parser** (`gcodeParser.ts`): Parses G0/G1 and lines with axis values (X,Y,Z,E); tracks position, detects layers from `; Layer n` comments
- **Path builder** (`pathBuilder.ts`): Converts parsed moves to line segments; maps GCode coords (X,Y,Z) to Three.js (X,Z,Y) so Z-up in printer becomes Y-up in viewer
- **GCodePaths component**: Renders LineSegments with BufferGeometry; layer colors (hue by layer); flow rate as color intensity (brighter = more extrusion)
- **GCodeViewer integration**: GCodePaths consumes gcode from store; visualization updates when GCode changes
- **Display update fix**: `gcodeVersion` in store forces remount when regenerating (e.g., after changing shape)
- **Parser fix**: Generator now outputs `G1` prefix on all move lines; parser also accepts lines with only axis values

## Acceptance Criteria

- [x] GCode parser implemented (extract X, Y, Z, E from lines)
- [x] 3D paths rendered in viewer
- [x] Layers visually distinguishable
- [x] Flow rate affects visualization (Phase 1: color intensity)
- [x] Visualization updates when GCode changes
- [ ] Performance is acceptable (smooth camera movement)
- [ ] Slice/filter UI at bottom right of 3D viewer (default: show all)
- [ ] Grid auto-scales to fit GCode; axes show numeric labels for coordinate tracking
