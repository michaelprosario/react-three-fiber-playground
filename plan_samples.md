# Sample Scenes Plan — React Three Fiber Playground

> **Goal:** Create a series of small, focused demo scenes that illustrate the
> concepts covered in `tutorial.md`. Each scene lives in its own component and
> is accessible via a sidebar navigation menu in `App.jsx`.

---

## Navigation Design

The app renders a **fixed left-sidebar overlay** (200 px wide) listing all
scenes as buttons. The active scene is highlighted. VR / AR entry buttons live
at the bottom of the sidebar. The `<Canvas>` fills the full viewport behind the
sidebar.

State: `useState('shapes')` in `App.jsx` selects the active scene component.
No router library is needed — plain React state is sufficient for this demo.

---

## Scenes

### Scene 1 — Basic Shapes  
**File:** `src/components/ShapesScene.jsx` *(existing)*  
**Tutorial coverage:** §4.1 Scene Graph, §4.2 Geometry, §5.1 Canvas  
**What it shows:**

- Seven coloured geometries (Box, Sphere, Cylinder, Cone, Torus, TorusKnot,
  Icosahedron) arranged in a circle around the viewer.
- Each mesh auto-rotates so all faces are visible.
- Demonstrates the basic R3F pattern: `<mesh>` + `<geometry>` + `<material>`.

---

### Scene 2 — Materials  
**File:** `src/components/MaterialsScene.jsx` *(new)*  
**Tutorial coverage:** §4.3 Materials  
**What it shows:**

Four identical spheres side-by-side, each using a different material type:

| Sphere | Material | Key trait |
|--------|----------|-----------|
| 1 | `meshBasicMaterial` | Ignores all lights — flat solid colour |
| 2 | `meshStandardMaterial` | PBR — responds to lights realistically |
| 3 | `meshPhysicalMaterial` | Extended PBR — metallic / mirror finish |
| 4 | `meshNormalMaterial` | Debug view — colours by surface normal |

Labels below each sphere name the material. A title line reads
*"Same Geometry, Different Appearance"*.

---

### Scene 3 — Animation with `useFrame`  
**File:** `src/components/AnimationScene.jsx` *(new)*  
**Tutorial coverage:** §4.4 Render Loop, §5.3 `useFrame`, §3.3 `useRef`  
**What it shows:**

Four shapes each demonstrating a different `useFrame` animation pattern:

| Shape | Technique | Code pattern |
|-------|-----------|--------------|
| Box | Continuous spin | `ref.rotation.y += delta` |
| Sphere | Sine-wave bounce | `ref.position.y = Math.abs(Math.sin(clock.elapsedTime))` |
| Torus | Scale pulse | `ref.scale.setScalar(0.8 + Math.sin(t) * 0.2)` |
| Cube | Circular orbit | `ref.position.x = Math.sin(t); ref.position.z = Math.cos(t)` |

---

### Scene 4 — Pointer Events & Interactivity  
**File:** `src/components/EventsScene.jsx` *(new)*  
**Tutorial coverage:** §5.5 Event System, §3.2 Props vs State  
**What it shows:**

Three interactive objects responding to pointer events:

| Object | Interaction | React pattern |
|--------|-------------|---------------|
| Box | Hover → colour change | `useState` + `onPointerOver/Out` |
| Sphere | Click → grow / shrink | `useState` + `onClick` + `scale` prop |
| Torus Knot | Click → cycle through colours | `useState` (index) + `onClick` |

The user can click and hover without needing a headset — demonstrates that R3F
events work in `inline` mode on desktop.

---

### Scene 5 — Lighting  
**File:** `src/components/LightingScene.jsx` *(new)*  
**Tutorial coverage:** §5.6 Lighting Setup  
**What it shows:**

A collection of white objects illuminated by multiple named light sources:

- `ambientLight` — subtle fill so nothing is completely black (intensity 0.1)
- `directionalLight` — warm white from upper right, simulates the sun
- `pointLight` (x2) — coloured (red, blue) spheres showing radial falloff
- `spotLight` — purple cone highlighting a central object

Each light source has a glowing `meshBasicMaterial` sphere at its position and
a `<Text>` label. The scene demonstrates how different lights shape and colour
objects differently.

---

### Scene 6 — `@react-three/drei` Helpers  
**File:** `src/components/DreiHelpersScene.jsx` *(new)*  
**Tutorial coverage:** §7 Enhancing Scenes with drei  
**What it shows:**

Three columns, each spotlighting one drei helper:

| Column | Helper | What it does |
|--------|--------|--------------|
| Left | `<Text>` | Renders a 3D text mesh anchored to a position in world space |
| Centre | `<Html>` | Mounts a real DOM tooltip that tracks a 3D position |
| Right | `<Environment>` | Image-based lighting (IBL) — a metallic sphere reflects the sunset preset |

`<OrbitControls>` (already in App) lets the user rotate to see the Environment
reflection updating in real time.

---

### Scene 7 — XR-Aware Objects (`useXR`)  
**File:** `src/components/XRAwareScene.jsx` *(new)*  
**Tutorial coverage:** §6.2 XR Store, §6.3 What `<XR>` Does, §6.4 Reading XR State  
**What it shows:**

A central icosahedron that changes appearance depending on whether a WebXR
session is active:

| Mode | Appearance | Message |
|------|-----------|---------|
| Desktop | Wireframe, red | *"Desktop Mode — click Enter VR / AR"* |
| XR presenting | Solid, green, + 50% larger | *"Inside XR Session!"* |

Uses `useXR((state) => state.session)` from `@react-three/xr` v6 to derive a
boolean `isPresenting` flag, then passes it to props / conditional styles.

---

## File Structure After Implementation

```
src/
  App.jsx                   ← navigation sidebar + Canvas + XR store
  main.jsx                  ← unchanged
  components/
    ShapesScene.jsx         ← Scene 1 (existing)
    MaterialsScene.jsx      ← Scene 2 (new)
    AnimationScene.jsx      ← Scene 3 (new)
    EventsScene.jsx         ← Scene 4 (new)
    LightingScene.jsx       ← Scene 5 (new)
    DreiHelpersScene.jsx    ← Scene 6 (new)
    XRAwareScene.jsx        ← Scene 7 (new)
plan_samples.md             ← this document
```

---

## Design Principles

- **Concise** — Each scene focuses on one concept; no unnecessary code.
- **Colourful** — Bright, distinct colours make geometry easily readable.
- **Self-labelled** — `<Text>` labels explain what each object demonstrates.
- **No extra dependencies** — Everything uses the existing `@react-three/fiber`,
  `@react-three/drei`, and `@react-three/xr` packages already in `package.json`.
