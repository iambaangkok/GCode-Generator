# GCode Visualization Implementation Plan

**Status**: WIP  
**Related Requirements**: [REQ-004-WIP-gcode-visualization.md](../requirements/REQ-004-WIP-gcode-visualization.md)  
**Dependencies**: [REQ-003-DONE-gcode-generation-integration.md](../requirements/REQ-003-DONE-gcode-generation-integration.md)

## Overview

Implement 3D visualization of generated GCode in the existing `GCodeViewer` component. Users will see toolpaths as 3D lines, with layers distinguishable by color and flow rate (extrusion) reflected in line thickness. The visualization must update reactively when GCode changes and perform smoothly for typical files.

## Current State

- **GCodeViewer** (`src/visualization/gcode-viewer/GCodeViewer.tsx`): Renders Canvas with Scene, Grid, OrbitControls, GCodePaths. Consumes `gcode` from store.
- **GCodePaths**: Parses gcode, builds segments, renders LineSegments with layer colors and flow-rate color intensity.
- **GCode format**: Stored as `string[]` in `gcodeStore`. Generated format uses `G1 X Y Z E F` (absolute coords), `; Layer n` comments.
- **Stack**: React Three Fiber, Three.js, @react-three/drei, zustand.

## Done So Far

- **gcodeParser.ts**: Parses G0/G1 and lines with axis values; tracks X,Y,Z,E; detects layers from `; Layer n`
- **pathBuilder.ts**: Converts moves to segments; maps GCode (X,Y,Z) → Three.js (X,Z,Y) for correct orientation
- **GCodePaths.tsx**: LineSegments + BufferGeometry; layer hue; flow as color intensity; `key={gcodeVersion}` for update fix
- **GCodeViewer**: Integrates GCodePaths
- **gcodeVersion** in store: Incremented on setGCode to force 3D viewer remount when regenerating

## Target State

- GCode paths rendered as 3D line segments in the viewer
- Layers visually distinguishable (color gradient or per-layer color)
- Flow rate (E values) reflected in line thickness (thicker = more extrusion)
- Camera controls (OrbitControls) allow full inspection
- Visualization updates when `gcode` in store changes
- Smooth performance for typical GCode files (e.g., cube/sphere/cylinder)
- **Slice/filter UI** at bottom right of 3D viewer: select which part of GCode to display (default: all)

---

## Technical Approach

### 1. GCode Parser

**Location**: `src/core/gcode/gcodeParser.ts` (new)

**Purpose**: Parse GCode lines into structured data for visualization.

**Output structure**:
```ts
interface ParsedMove {
  x: number
  y: number
  z: number
  e?: number      // Extrusion amount (absolute or delta)
  isExtrusion: boolean
  layerIndex?: number
}

interface ParsedGCode {
  moves: ParsedMove[]
  layers: number[]  // Z values or indices for layer boundaries
}
```

**Parsing logic**:
- Track current position (X, Y, Z, E) — start at 0
- For each line:
  - Skip comments-only (`;`), non-motion (M-codes, G28, G90, G21, G92)
  - Parse `G0`/`G1`: extract X, Y, Z, E (update current pos for omitted values)
  - Detect layers: `; Layer n` comments or Z changes
- Use absolute E mode (G92 E0 resets; subsequent E is cumulative)
- Regex or simple split: `/([XYZEF])([-\d.]+)/g` to extract values

**Edge cases**:
- Empty GCode → return `{ moves: [], layers: [] }`
- Relative vs absolute: generator uses G90 (absolute) — assume absolute
- G0 (rapid) vs G1 (linear): both produce moves; G0 typically no E (travel)

### 2. Path Geometry Builder

**Location**: `src/visualization/gcode-viewer/pathBuilder.ts` (new) or inline in parser

**Purpose**: Convert parsed moves into line segments for Three.js.

**Output**:
- Array of segments: `{ start: [x,y,z], end: [x,y,z], extrusion: number, layerIndex: number }`
- Or: `{ positions: Float32Array, colors?: Float32Array, widths?: Float32Array }` for BufferGeometry

**Logic**:
- For each consecutive pair of moves where at least one has extrusion:
  - Create segment from `(prev.x, prev.y, prev.z)` to `(curr.x, curr.y, curr.z)`
  - Extrusion = delta E or average of segment
- Segments without extrusion (travel) can be rendered thinner/different color or skipped for clarity (optional: show travel as dashed/thin gray)

### 3. Flow Rate → Line Thickness

**Challenge**: Three.js `Line` and `LineSegments` use `LineBasicMaterial` with `linewidth` — **not reliably supported in WebGL** (many implementations cap at 1px). Custom approach required.

**Options**:

| Option | Pros | Cons |
|--------|------|------|
| **A. Instanced cylinders/tubes** | True 3D thickness, accurate | More geometry, heavier |
| **B. Custom shader (vertex + fragment)** | Full control, performant | Shader complexity |
| **C. Three.js `Line2` (three-mesh-line / LineGeometry)** | Built-in variable width | May need `@react-three/drei` Line or custom |
| **D. MeshLine / fat lines library** | Mature solution | Extra dependency |

**Recommendation**: Start with **Option C** — use `Line2` from `three/examples/jsm/lines/Line2.js` (or `@react-three/drei`'s `Line` if it supports width). If variable width is complex, **fallback**: use uniform line thickness and encode flow rate as **color** (e.g., gradient from cold→hot color). This satisfies "flow rate affects visualization" while deferring true thickness.

**Phase 1 (MVP)**: Color-based flow rate (brighter/thicker color = more extrusion)  
**Phase 2 (Enhancement)**: Variable line thickness via Line2 or instanced tubes

### 4. Layer Distinguishability

- **Color per layer**: Assign hue based on `layerIndex` (e.g., `hsl(layerIndex * 30 % 360, 0.8, 0.6)`)
- **Or**: Single base color with brightness variation by layer
- Store `layerIndex` per segment; use `BufferAttribute` for vertex colors if using BufferGeometry

### 5. GCodeViewer Integration

**Modifications to `GCodeViewer.tsx`**:

1. Import `useGCodeStore` and read `gcode`
2. When `gcode.length > 0`:
   - Call parser: `parseGCode(gcode)`
   - Build path geometry from parsed moves
   - Render `<primitive object={lineSegments} />` or custom `<GCodePaths />` component
3. When `gcode.length === 0`: Show empty state (optional: "Generate GCode to visualize" or keep Grid only)
4. Memoize parsed result when `gcode` reference/contents unchanged (avoid re-parse on every render)

**Component structure**:
```
GCodeViewer
├── Canvas (relative/positioned container)
│   ├── Scene
│   │   ├── ambientLight, pointLight
│   │   ├── Grid
│   │   ├── OrbitControls
│   │   └── GCodePaths  ← new, consumes gcode from store
└── SliceFilterUI  ← overlay, position: absolute; bottom-right of 3D plot
```

### 6. Slice/Filter UI

**Location**: `src/visualization/gcode-viewer/SliceFilterUI.tsx` (new)

**Purpose**: Let users select which part of the GCode to visualize (e.g., layer range, move index range). Default: show all.

**Position**: Bottom right of the 3D plot display — overlay on the viewer container (not inside Canvas). Use `position: absolute`, `bottom`, `right` with padding.

**UI options** (choose one or combine):
- **Layer range**: Slider or inputs for "Layer from" / "Layer to" (e.g., 1–5 of 10). Default: all layers.
- **Move range**: "Show moves X to Y" (for advanced users). Default: all moves.
- **Simple**: Two number inputs or a dual-thumb range slider; labels "From layer" / "To layer".

**State**: Local component state or small zustand slice. GCodePaths receives filter (e.g., `{ layerFrom?: number, layerTo?: number }`) and only renders segments within range. Default: no filter = show all.

**Layout**: Compact panel (e.g., Material-UI `Paper` or `Box`) with:
- "Show layers" or "Layer range" label
- Range inputs or slider
- "All" button to reset to default

### 7. Grid and Axis Labels (Phase 4)

- **Grid auto-scale**: Compute bounding box from parsed GCode segments (min/max X, Y, Z in Three.js space). Size the Grid component to span slightly beyond these bounds (e.g., add 10% margin). When no GCode, use default (e.g., 10×10).
- **Axis labels**: Add numeric labels along X, Y, Z axes (e.g., at regular intervals). Options: use `@react-three/drei` Html for 2D labels, or custom line/group with text sprites. Labels should show coordinate values (e.g., "0", "10", "20") for easier tracking.

### 8. Performance

- **Parsing**: Run once when `gcode` changes. Use `useMemo` with `gcode` as dependency.
- **Geometry**: Build BufferGeometry once per parse. Reuse when gcode unchanged.
- **Segments**: For large files (10k+ moves), consider:
  - Level-of-detail: simplify path for distant view (future)
  - Batching: single BufferGeometry with many segments
- **Camera**: OrbitControls already handles smooth interaction; ensure no unnecessary re-renders during orbit.

---

## File Summary

| Action | Path | Description |
|--------|------|-------------|
| Create | `src/core/gcode/gcodeParser.ts` | Parse GCode lines → moves with X,Y,Z,E, layer info |
| Create | `src/visualization/gcode-viewer/GCodePaths.tsx` | R3F component that renders parsed paths as 3D lines |
| Create | `src/visualization/gcode-viewer/pathBuilder.ts` | Convert parsed moves → line segments / BufferGeometry |
| Modify | `src/visualization/gcode-viewer/GCodeViewer.tsx` | Consume gcode from store, render GCodePaths, add SliceFilterUI overlay |
| Create | `src/visualization/gcode-viewer/SliceFilterUI.tsx` | Layer/move range filter UI, bottom-right of viewer |
| Modify | `src/visualization/gcode-viewer/GCodeViewer.tsx` | Phase 4: Dynamic grid size, axis labels |
| Optional | `src/types/index.ts` | Add `ParsedMove`, `ParsedGCode` types if not inline |

---

## Implementation Checklist

### Phase 1: Core Visualization (MVP) ✅ DONE

- [x] Create `gcodeParser.ts` — parse G1/G0 lines, extract X,Y,Z,E, track position, detect layers
- [x] Create `pathBuilder.ts` — convert parsed moves to line segments (start, end, extrusion, layerIndex)
- [x] Create `GCodePaths.tsx` — R3F component: parse gcode → build paths → render LineSegments/BufferGeometry
- [x] Integrate `GCodePaths` into `GCodeViewer`, pass `gcode` from store
- [x] Layer colors: assign distinct color per layer (e.g., hue rotation)
- [x] Flow rate visualization (Phase 1): use **color intensity** based on extrusion (darker = less, brighter = more)
- [x] Verify visualization updates when GCode is regenerated
- [x] Test with cube, sphere, cylinder — confirm paths match expected shape

### Phase 2: Flow Rate Thickness (Enhancement)

- [ ] Research Line2 / fat-line approach in R3F
- [ ] Implement variable line thickness from E values (or defer if complexity high)
- [ ] Fallback: keep color-based flow if thickness not feasible

### Phase 3: Slice/Filter UI

- [ ] Create `SliceFilterUI.tsx` — layer range (and optionally move range) controls
- [ ] Position at bottom right of 3D viewer (absolute overlay)
- [ ] Default: show all layers/moves
- [ ] GCodePaths accepts filter and only renders segments in range

### Phase 4: Grid and Axis Labels

- [ ] Grid auto-scale: Compute GCode bounds from parsed segments; size grid to be just bigger than the path
- [ ] Axis labels: Show numeric labels on main axes (X, Y, Z) for coordinate tracking
- [ ] When no GCode: Use default grid size (e.g., 10×10)

### Phase 5: Polish

- [ ] Empty state: when no GCode, show subtle hint or keep grid only
- [ ] Performance check: test with larger generated files
- [ ] Optional: travel moves (no extrusion) — render as thin gray or omit

---

## Acceptance Criteria Mapping

| REQ-004 Criterion | Plan Task |
|-------------------|-----------|
| GCode parser implemented (extract X, Y, Z, E from lines) | `gcodeParser.ts` |
| 3D paths rendered in viewer | `GCodePaths.tsx` + `pathBuilder.ts` |
| Layers visually distinguishable | Layer-based color in pathBuilder/GCodePaths |
| Flow rate affects line thickness | Phase 1: color; Phase 2: thickness |
| Visualization updates when GCode changes | `useGCodeStore` + `useMemo` on gcode |
| Performance acceptable (smooth camera) | Memoization, batched geometry |
| Slice/filter UI at bottom right (default: all) | `SliceFilterUI.tsx` + filter in GCodePaths |
| Grid auto-scale + axis labels | Phase 4 |

---

## Notes

- **Three.js line width**: WebGL `linewidth` is often ignored. Variable thickness may require Line2, instanced meshes, or custom shaders. Start with color-based flow.
- **GCode generator output**: Uses `generateGCodeLine(x, y, z, e, f, comment)`. E is cumulative (total extrusion). Parser must handle absolute E.
- **Layer comments**: Generator outputs `; Layer ${layer + 1}` before each layer. Parser can use this to assign layerIndex to subsequent moves until next layer comment.
