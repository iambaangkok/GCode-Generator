# Requirements: Shape Selection UI

**Status**: WIP  
**Related Requirements**: [REQ-001-DONE-project-initialization.md](REQ-001-DONE-project-initialization.md)

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
- Selected shape and dimensions should be stored in state
- Shape selection should be visually clear (radio buttons, dropdown, or tabs)

## Technical Notes

- Shape generators already exist in `src/core/geometry/shapeGenerators.ts`
- State management is ready in `src/stores/gcodeStore.ts`
- Component should be added to `src/ui/shapes/ShapeSelector.tsx`
- Should integrate with existing SettingsPanel and TransformControls

## Acceptance Criteria

- [ ] Shape selector component created
- [ ] Dimension inputs shown based on selected shape type
- [ ] Component integrated into main App layout
- [ ] State updates when shape/dimensions change
- [ ] UI is intuitive and matches existing design (Material-UI)
