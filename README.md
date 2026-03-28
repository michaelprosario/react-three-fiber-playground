# react-three-fiber-playground

An interactive playground for learning [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) (R3F) — the React renderer for Three.js. Eight self-contained demo scenes walk you through the core concepts, from primitive shapes all the way to WebXR and clickable in-scene navigation.

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm 9 or later

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the URL printed in your terminal (usually `http://localhost:5173`). The sidebar on the left lets you switch between demo scenes instantly.

### Build for production

```bash
npm run build
```

Preview the production build locally with:

```bash
npm run preview
```

---

## Demo scenes

| # | Scene | What it teaches |
|---|-------|----------------|
| 1 | **Basic Shapes** | Core Three.js geometries (`BoxGeometry`, `SphereGeometry`, `CylinderGeometry`, `ConeGeometry`, `TorusGeometry`, `TorusKnotGeometry`, `IcosahedronGeometry`) arranged in a lit scene. |
| 2 | **Materials** | Side-by-side comparison of `MeshBasicMaterial`, `MeshNormalMaterial`, `MeshPhongMaterial`, and `MeshStandardMaterial` on identical spheres. |
| 3 | **Animation** | Four animation patterns using `useFrame`: continuous spin, oscillating position, scale pulse, and colour cycling driven by the render clock. |
| 4 | **Pointer Events** | Hover-to-highlight, click-to-toggle, and drag interactions showing how R3F maps browser pointer events onto 3-D objects. |
| 5 | **Load GLB Model** | Loading a `.glb` asset with `useGLTF` (from `@react-three/drei`), wrapping async loading in `<Suspense>`, and composing the model into a scene with `<primitive>`. |
| 6 | **Raycasting** | Click anywhere on a floor plane to drop colour-coded cubes. Explains how R3F's internal `THREE.Raycaster` works and what the `ThreeEvent` object contains (`point`, `object`, `face`, `normal`). |
| 7 | **Cool Museum** | A walkthrough gallery scene with pedestals, marble materials, shadows, and animated objects — demonstrates combining many R3F concepts into a coherent environment. |
| 8 | **Scene Hyperlinks** | In-scene 3-D cards that act as navigation links between the other demo scenes, showing how `onClick` on meshes can drive React state higher in the tree. |

The app also wires up **WebXR** (via `@react-three/xr`) so you can hit **Enter VR** or **Enter AR** from the sidebar on a compatible device.

---

## Key packages

| Package | Purpose |
|---------|---------|
| [`three`](https://threejs.org/) | Core 3-D engine |
| [`@react-three/fiber`](https://docs.pmnd.rs/react-three-fiber) | React renderer for Three.js |
| [`@react-three/drei`](https://github.com/pmndrs/drei) | Helpers & abstractions (`OrbitControls`, `Text`, `useGLTF`, …) |
| [`@react-three/xr`](https://github.com/pmndrs/xr) | WebXR (VR / AR) integration |

---

## Helpful resources

### Official docs
- [React Three Fiber — Getting Started](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [React Three Fiber — API reference](https://docs.pmnd.rs/react-three-fiber/api/canvas)
- [Drei component catalogue](https://drei.pmnd.rs/)
- [Three.js documentation](https://threejs.org/docs/)
- [Three.js fundamentals](https://threejsfundamentals.org/)

### Tutorials & blog posts
- [Intro to React Three Fiber](https://dev.to/nicholasgasior/intro-to-react-three-fiber-j3o) — Dev.to walkthrough covering the basics
- [Building a 3D scene with React Three Fiber](https://blog.logrocket.com/build-3d-app-react-three-fiber/) — LogRocket deep-dive
- [Animating with useFrame](https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe) — official docs section on the render loop hook
- [The pmndrs ecosystem](https://pmnd.rs/) — home of R3F, Drei, Zustand, Jotai, and other related libraries

### Video courses
- [Three.js Journey](https://threejs-journey.com/) — the gold-standard Three.js course (vanilla JS, but the concepts carry over directly)
- [Discover Three.js (free e-book)](https://discoverthreejs.com/)

