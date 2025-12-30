# FSpace Copilot Instructions

## Project Overview
FSpace is a Love2D game inspired by Asteroids and Omega Race. Players control a ship, fire bullets at rocks and mines in a toroidal space (screen wrapping). The architecture uses a **scene manager** pattern with **LineSprite-based objects** for all game entities.

## Architecture & Key Patterns

### Scene Manager (Scenery Module)
- Located in `scenery/scenery.lua` (external dependency)
- Manages multiple scenes ("menu", "fspace") with scene switching
- `main.lua` initializes scenery and delegates all input/update/draw calls
- Each scene is a module with `load()`, `update(dt)`, `draw()`, `keypressed()`, `mousemoved()`, and `mousepressed()` methods

### GameObject Hierarchy (Inheritance Pattern)
All game objects inherit from `LineSprite` (the base class):
```lua
local LineSprite = require("line_sprite")
local Ship = setmetatable({}, { __index = LineSprite })
Ship.__index = Ship
```
- **LineSprite** (`line_sprite.lua`): Base class providing rendering and physics properties
  - Properties: `x, y, angle` (position/rotation), `dx, dy, dr` (velocities), `scale`, `points` (frame data), `color`
  - Methods: `get_bound_rect()`, `is_overlapping()`, `draw()`, `draw_frame()`
  - Supports multi-frame animation via `self.points[frame]` and `self.durations`

- **Ship** (`ship.lua`): Player-controlled entity, cyan-colored symmetric polygon
- **Bullet** (`bullet.lua`): Simple yellow rectangle, destroyed on-screen edge
- **Rock** (`rock.lua`): Gray asteroids spawned at top of screen, wrap around edges
- **Mine** (`mine.lua`): Green triangle obstacles
- **Thrust** (`thrust.lua`): Orange triangle, visual effect synchronized with ship
- **Light** (`light.lua`): Animated sprite (multi-frame), follows ship position

### Game State Management (FSpace Module)
- Main game logic in `fspace.lua` (the "fspace" scene)
- **Global tables** within module scope: `rocks`, `bullets`, `mines` (array collections)
- **Object ownership**: Fspace module initializes and manages all game objects' lifecycle
- **Update sequence** in `Fspace:update(dt)`:
  1. Color animation (pride flag cycling)
  2. Rock physics & wrapping
  3. Ship input handling (left/right rotation, space for thrust)
  4. Gravity application (0.2 downward, capped at velocity 20)
  5. Ship wrapping
  6. Bullet firing & updates (removed when off-screen)
  7. Rock/bullet/mine collision detection
  
### Physics & Wrapping
- **Toroidal space**: Objects wrap horizontally and vertically (see `Fspace:update()` lines 207-217)
- **Thrust calculation**: Opposite to ship angle + 90° offset
  ```lua
  local thrust_angle = (ship.angle + 90) % 360
  ```
- **No explicit collision response**: Only cleanup on collision (remove bullet/rock/mine)

## Project-Specific Conventions

### Input Handling
- **Keyboard**: `left`/`right` (rotate), `space` (thrust), `f`/`ctrl`/`alt` (fire), `tab` (mouse grab), `q` (quit via menu)
- **Mouse**: Left button (thrust), Right button (fire)
- Input detection uses `love.keyboard.isDown()` and `love.mouse.isDown()` for continuous feedback

### Color System
- `colors.lua` provides pride flag colors as RGB tables: `{1.0, 0.0, 0.0}` format
- Color cycling in menu/game: shift first color to end each second
- Character sprites cycle through color palettes based on position

### Animation & Rendering
- Multi-frame sprites store points in `self.points[frame_number]`
- Frame duration stored in `self.durations[frame]` (default `{math.huge}` for static frames)
- Frame advancement checked against `self.time_current_frame + duration < now`
- All drawing done via line segments: `points[i]` to `points[i+1]` (wraps to first)

### Score/UI Display
- Time alive (rock count) displayed via `Digit` sprites (10-digit character rendering)
- `Char` module provides letter sprites for text UI ("fspace", "play", "quit")
- Dynamic formatting: `string.format("%03d", #rocks)` converts count to display string

## Key Files & Responsibilities

| File | Purpose |
|------|---------|
| `main.lua` | Love2D entry point, scene setup, input delegation |
| `fspace.lua` | Main gameplay logic, collision, entity updates (579 lines) |
| `line_sprite.lua` | Base class for all objects, rendering + bounds |
| `ship.lua`, `bullet.lua`, `rock.lua`, `mine.lua`, `thrust.lua`, `light.lua` | Entity definitions (constructor only) |
| `menu.lua` | Menu scene with button logic and color animations |
| `char.lua`, `digit.lua` | Character/digit rendering for UI |
| `colors.lua` | Color palette definitions |
| `scenery/scenery.lua` | External scene manager (do not edit without careful versioning) |

## Development Workflow

### Running the Game
```bash
love .    # From fspace root directory
```

### Debugging
- Uses `lua-local` debugger extension (VS Code)
- Launch config: `.vscode/launch.json` (configured to run `love` with debugger)
- Set breakpoints in VS Code, press F5 to debug
- Debugger initialization in `main.lua` (lines 1-3) auto-activates when env var set

### Common Tasks
- **Add new entity type**: Create module inheriting from LineSprite, add to Fspace module's global table
- **Add game feature**: Implement in `Fspace:update()` or `Fspace:draw()` following existing patterns
- **Change input behavior**: Modify keyboard/mouse checks in `Fspace:update()` (lines 168-195)
- **Tweak physics**: Adjust gravity, velocity limits, or acceleration in update logic

## Known Limitations & TODOs
- Rock size degradation when split has hardcoded magic numbers (see README)
- Collision detection: simple distance/overlap checks (could use polygon SAT)
- No sound, music, or advanced animations yet
- Android deployment not yet complete
