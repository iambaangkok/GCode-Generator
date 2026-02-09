# Requirements: GCode Generation Integration

**Status**: WIP  
**Related Requirements**: [REQ-001-DONE-project-initialization.md](REQ-001-DONE-project-initialization.md), [REQ-002-WIP-shape-selection-ui.md](REQ-002-WIP-shape-selection-ui.md)

## Overview

Users need a way to trigger GCode generation from the selected shape, settings, and transformations. The generated GCode should be stored in state and ready for visualization and export.

## Requirements

- User should be able to click a "Generate GCode" button
- Generation process should:
  1. Get selected shape type and dimensions
  2. Get current transform settings (rotation, scale, translation)
  3. Get printer settings (nozzle, layer height, speeds, temperatures)
  4. Generate shape points using shape generators
  5. Apply transformations to the points
  6. Generate GCode from transformed points
  7. Store GCode in state store
  8. Calculate and store print statistics
- Button should be clearly visible and accessible
- Generation should provide visual feedback (loading state)
- Generated GCode should be compatible with BambuStudio

## Technical Notes

- Core functions exist:
  - `generateShapePoints()` in `src/core/geometry/shapeGenerators.ts`
  - `transformPoints()` in `src/core/transforms/transformUtils.ts`
  - `generateFullGCode()` in `src/core/gcode/gcodeGenerator.ts`
- State store has `setGCode()` and `setStats()` functions ready
- Button should be in main UI, possibly near shape selector or as a prominent action button

## Acceptance Criteria

- [ ] Generate button component created
- [ ] Generation handler implemented
- [ ] GCode stored in state after generation
- [ ] Statistics calculated and stored
- [ ] Visual feedback during generation
- [ ] Generated GCode is valid and compatible with BambuStudio
