# Requirements: Shape Selection UI

**Status**: DONE  
**Related Requirements**: [REQ-001-DONE-project-initialization.md](REQ-001-DONE-project-initialization.md)  
**Implementation Plan**: [002-DONE-plan-shape-selection-ui.md](../.temp/002-DONE-plan-shape-selection-ui.md)

## Overview

Users need a way to select which shape to generate (cube, sphere, or cylinder) and set its dimensions before generating GCode.

## Requirements

- User should be able to select shape type:
  - Cube
  - Sphere
  - Cylinder
- User should be able to set dimensions for the selected shape:
  - **Cube**: Width, Height, Depth (in mm)
  - **Sphere**: Radius (in mm)
  - **Cylinder**: Radius, Height (in mm)
- Shape selection should be integrated into the main UI (left sidebar)
- Sidebar should have a vertical scrollbar when content overflows (e.g. on small windows)
- Selected shape and dimensions should be stored in state
- Shape selection should be visually clear (radio buttons, dropdown, or tabs)

## Technical Notes

- Shape generators already exist in `src/core/geometry/shapeGenerators.ts`
- State management is ready in `src/stores/gcodeStore.ts`
- Component should be added to `src/ui/shapes/ShapeSelector.tsx`
- Should integrate with existing SettingsPanel and TransformControls

## Acceptance Criteria

- [x] Shape selector component created
- [x] Dimension inputs shown based on selected shape type
- [x] Component integrated into main App layout
- [x] State updates when shape/dimensions change
- [x] UI is intuitive and matches existing design (Material-UI)
- [x] Sidebar scrolls vertically when content overflows
