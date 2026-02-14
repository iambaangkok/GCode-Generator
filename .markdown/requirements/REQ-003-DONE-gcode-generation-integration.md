# Requirements: GCode Generation Integration

**Status**: DONE  
**Related Requirements**: [REQ-001-DONE-project-initialization.md](REQ-001-DONE-project-initialization.md), [REQ-002-DONE-shape-selection-ui.md](REQ-002-DONE-shape-selection-ui.md)  
**Implementation Plan**: [003-DONE-plan-gcode-generation-integration.md](../.temp/003-DONE-plan-gcode-generation-integration.md)

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
- **Generate button should be on the right sidebar** (not the left sidebar)
- **The app should display the generated GCode in the right sidebar** in a text field
- **The GCode text field should be editable** (user can modify the GCode)
- **The GCode should be copyable** from that text field (e.g. for pasting into BambuStudio)
- Generation should provide visual feedback (loading state)
- Generated GCode should be compatible with BambuStudio

## Technical Notes

- Core functions exist:
  - `generateShapePoints()` in `src/core/geometry/shapeGenerators.ts`
  - `transformPoints()` in `src/core/transforms/transformUtils.ts`
  - `generateFullGCode()` in `src/core/gcode/gcodeGenerator.ts`
- State store has `setGCode()` and `setStats()` functions ready
- Right sidebar should contain: Generate button and GCode display (editable, copyable text field)
- Left sidebar contains: Shape selector, settings, transforms, stats

## Acceptance Criteria

- [x] Generate button component created
- [x] Generation handler implemented
- [x] GCode stored in state after generation
- [x] Statistics calculated and stored
- [x] Visual feedback during generation
- [x] Generate button on right sidebar
- [x] GCode displayed in right sidebar (editable, copyable text field)
- [ ] Generated GCode is valid and compatible with BambuStudio
