# Requirements: GCode Export

**Status**: WIP  
**Related Requirements**: [REQ-001-DONE-project-initialization.md](REQ-001-DONE-project-initialization.md), [REQ-003-DONE-gcode-generation-integration.md](REQ-003-DONE-gcode-generation-integration.md)

## Overview

Users need a way to export or copy the generated GCode so they can use it in BambuStudio or other slicers.

## Requirements

- User should be able to view the generated GCode as text
- User should be able to copy GCode to clipboard with one click
- User should be able to export GCode to a file (.gcode extension)
  - File dialog should open (Electron file save dialog)
  - Default filename should be descriptive (e.g., "cube_20x20x20.gcode")
- GCode should be displayed in a readable format (monospace font, proper formatting)
- Export component should be accessible from main UI
- Instructions for using with BambuStudio should be visible (already in README)

## Technical Notes

- Electron provides file dialog APIs
- Clipboard API available in browser/Electron
- Component should be in `src/ui/export/GCodeExport.tsx` or similar
- Can use Material-UI TextField or CodeBlock component for display
- File save functionality needs Electron IPC communication

## Acceptance Criteria

- [ ] GCode display component created
- [ ] Copy to clipboard functionality works
- [ ] Export to file functionality works (Electron)
- [ ] File dialog opens with appropriate default name
- [ ] GCode is saved correctly (.gcode format)
- [ ] Component integrated into main UI
- [ ] User can easily copy/paste into BambuStudio
