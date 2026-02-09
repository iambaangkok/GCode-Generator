# Requirements: GCode Visualization

**Status**: WIP  
**Related Requirements**: [REQ-001-DONE-project-initialization.md](REQ-001-DONE-project-initialization.md), [REQ-003-WIP-gcode-generation-integration.md](REQ-003-WIP-gcode-generation-integration.md)

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

## Technical Notes

- 3D viewer framework exists: `src/visualization/gcode-viewer/GCodeViewer.tsx`
- Uses React Three Fiber and Three.js
- GCode stored in state as string array
- Need to parse GCode lines to extract X, Y, Z, E values
- Can use Three.js LineSegments or BufferGeometry for rendering
- Flow rate can be visualized using line width or custom shaders

## Acceptance Criteria

- [ ] GCode parser implemented (extract X, Y, Z, E from lines)
- [ ] 3D paths rendered in viewer
- [ ] Layers visually distinguishable
- [ ] Flow rate affects line thickness
- [ ] Visualization updates when GCode changes
- [ ] Performance is acceptable (smooth camera movement)
