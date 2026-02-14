# GCode Generation Integration Plan

**Status**: DONE  
**Related Requirements**: [REQ-003-DONE-gcode-generation-integration.md](../requirements/REQ-003-DONE-gcode-generation-integration.md)

## Analysis Summary

Users need a way to trigger GCode generation from the selected shape, settings, and transformations. The generated GCode must be displayed, editable, and copyable for pasting into BambuStudio. The layout must separate input controls (left) from output/actions (right), with the 3D viewer in the center.

**Current state**: Generate button and all controls are in a single left sidebar. GCode is stored in state but not displayed anywhere.

**Target state**: Three-column layout (left sidebar | center viewer | right sidebar). Right sidebar contains Generate button and editable GCode text field.

## Layout Design

### Three-Column Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│  GCode Generator                                                         │
├──────────────┬─────────────────────────────┬─────────────────────────────┤
│  LEFT        │  CENTER                     │  RIGHT                      │
│  SIDEBAR     │  (3D Viewer)                │  SIDEBAR                    │
│              │                             │                             │
│  Shape       │                             │  [Generate GCode]           │
│  Selector    │   GCodeViewer                │                             │
│              │   (3D visualization)        │  ┌─────────────────────┐   │
│  Settings    │                             │  │ G1 X10 Y20          │   │
│  Panel       │                             │  │ G1 X15 Y25 E0.5      │   │
│              │                             │  │ ...                  │   │
│  Transform   │                             │  │ (editable, copyable) │   │
│  Controls    │                             │  └─────────────────────┘   │
│              │                             │                             │
│  Stats       │                             │                             │
│  Panel       │                             │                             │
└──────────────┴─────────────────────────────┴─────────────────────────────┘
```

### Rationale

- **Left sidebar**: Input controls (shape, settings, transforms) — configuration before generation
- **Center**: 3D visualization — primary output for inspecting the model
- **Right sidebar**: Generation action and GCode output — workflow: configure → generate → copy to BambuStudio

## Component Specifications

### Right Sidebar Components

**1. Generate Button** (`src/ui/generate/GenerateButton.tsx`)

- Material-UI primary `Button`, full width within sidebar
- Label: "Generate GCode"
- Loading state: disabled, `CircularProgress` icon, "Generating..." label
- Uses `setTimeout(0)` to allow loading state to render before heavy computation
- Orchestration: `generateShapePoints` → `transformPoints` → `generateFullGCode` → `calculateStatsFromGCode` → `setGCode` + `setStats`

**2. GCode Display** (new: `src/ui/gcode/GCodeDisplay.tsx`)

- Editable, multi-line text field showing generated GCode
- **Editable**: User can modify lines (e.g. tweak temperatures, speeds)
- **Copyable**: Standard text selection and Ctrl+C; consider adding "Copy" button for convenience
- Material-UI `TextField` with `multiline`, `minRows`, or `TextField`/`textarea` in a scrollable container
- Binds to store: `gcode` (display as `gcode.join('\n')`)
- On user edit: parse `value.split('\n')` and call `setGCode(lines)` to sync back to store
- Placeholder/empty state: Show message when no GCode (e.g. "Generate GCode to see output")
- Monospace font for readability
- Vertical scroll when content overflows

### Store Considerations

- **Current**: `gcode: string[]`, `setGCode(gcode: string[])`
- **Editable sync**: When user edits the text field, call `setGCode(editedText.split('\n'))` to persist edits
- No store changes required; `string[]` maps cleanly to/from displayed text

## Data Flow

```
User configures (left)          User generates (right)         Output
─────────────────────          ─────────────────────         ──────
ShapeSelector ──┐               GenerateButton ──┐            GCodeDisplay
SettingsPanel ──┼──► gcodeStore ◄─────────────────┼───────────► (editable)
TransformControls ─┘            │                 │            StatsPanel
                               │                 │            GCodeViewer
                               └─ generateShapePoints()
                                  transformPoints()
                                  generateFullGCode()
                                  calculateStatsFromGCode()
                                  setGCode() + setStats()
```

## File Summary

| Action | Path | Description |
|--------|------|-------------|
| Create | `src/ui/gcode/GCodeDisplay.tsx` | Editable, copyable GCode text field |
| Modify | `src/App.tsx` | Three-column layout: left sidebar, center viewer, right sidebar |
| Modify | `src/ui/generate/GenerateButton.tsx` | Move to right sidebar (no logic change) |
| Create | `src/core/gcode/statsCalculator.ts` | Done — parse GCode for print stats |

## Implementation Checklist

- [x] Statistics calculator created (`src/core/gcode/statsCalculator.ts`)
- [x] Generate button component created (`src/ui/generate/GenerateButton.tsx`)
- [x] Generation handler implemented (orchestration in GenerateButton)
- [x] GCode stored in state after generation
- [x] Statistics calculated and stored
- [x] Visual feedback during generation (loading state with CircularProgress)
- [x] Three-column layout (left | center | right) in App.tsx
- [x] Generate button moved to right sidebar
- [x] GCodeDisplay component created (editable, copyable)
- [x] GCodeDisplay integrated into right sidebar
- [x] Editable GCode syncs back to store on change
- [ ] Generated GCode verified as valid and BambuStudio compatible

## Notes
