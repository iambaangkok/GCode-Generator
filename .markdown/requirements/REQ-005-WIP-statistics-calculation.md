# Requirements: Statistics Calculation

**Status**: WIP  
**Related Requirements**: [REQ-001-DONE-project-initialization.md](REQ-001-DONE-project-initialization.md), [REQ-003-WIP-gcode-generation-integration.md](REQ-003-WIP-gcode-generation-integration.md)

## Overview

Users need accurate print statistics displayed in the stats panel. Statistics should be calculated from the generated GCode.

## Requirements

- **Print Time**: Calculate total print time based on:
  - Distance traveled for each move
  - Feed rate (F value) for each move
  - Formula: sum of (distance / feedRate) for all moves
  - Display in minutes (or hours:minutes:seconds for long prints)
- **Filament Used**: Sum of all extrusion values (E values) from GCode
  - Display in mm (or meters for large amounts)
- **Layer Count**: Count unique Z heights in GCode
  - Display as integer
- **Total Moves**: Count of G1/G0 commands (actual moves, not comments)
  - Display as integer
- Statistics should update automatically when GCode is generated
- Statistics panel should show calculated values (not N/A)

## Technical Notes

- Stats panel exists: `src/ui/stats/StatsPanel.tsx`
- State store has stats structure ready: `PrintStats` interface
- Calculation should happen during GCode generation or after
- Can parse GCode or calculate during generation process
- Stats calculation functions should be in `src/utils/` or `src/core/gcode/`

## Acceptance Criteria

- [ ] Print time calculation implemented
- [ ] Filament used calculation implemented
- [ ] Layer count calculation implemented
- [ ] Total moves calculation implemented
- [ ] Statistics update when GCode is generated
- [ ] Stats panel displays calculated values (not N/A)
- [ ] Values are formatted appropriately (units, decimals)
