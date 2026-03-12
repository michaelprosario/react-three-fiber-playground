import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { createXRStore, XR } from '@react-three/xr'
import { OrbitControls } from '@react-three/drei'
import { ShapesScene }      from './components/ShapesScene'
import { MaterialsScene }   from './components/MaterialsScene'
import { AnimationScene }   from './components/AnimationScene'
import { EventsScene }      from './components/EventsScene'
import { GltfScene }        from './components/GltfScene'
import { RaycastingScene }  from './components/RaycastingScene'
import { MuseumScene }      from './components/MuseumScene'
import { HyperlinkScene }   from './components/HyperlinkScene'

// Create the XR store — this manages the WebXR session
const store = createXRStore()

const SCENES = [
  { id: 'shapes',    label: '1. Basic Shapes',    Component: ShapesScene },
  { id: 'materials', label: '2. Materials',        Component: MaterialsScene },
  { id: 'animation', label: '3. Animation',        Component: AnimationScene },
  { id: 'events',    label: '4. Pointer Events',   Component: EventsScene },
  { id: 'gltf',      label: '5. Load GLB Model',   Component: GltfScene },
  { id: 'raycasting', label: '6. Raycasting',        Component: RaycastingScene },
  { id: 'museum', label: '7. Cool Museum', Component: MuseumScene },
  { id: 'hyperlink', label: '8. Scene Hyperlinks', Component: HyperlinkScene },
]

export default function App() {
  const [activeId, setActiveId] = useState('shapes')
  const { Component: ActiveScene } = SCENES.find(s => s.id === activeId)

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>

      {/* ── Left sidebar navigation ── */}
      <nav style={sidebarStyle}>
        <p style={navTitleStyle}>R3F Playground</p>

        {SCENES.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveId(id)}
            style={navBtnStyle(id === activeId)}
          >
            {label}
          </button>
        ))}

        {/* Spacer — pushes XR buttons to the bottom */}
        <div style={{ flex: 1 }} />

        <button onClick={() => store.enterVR()} style={xrBtnStyle('#4f46e5')}>
          Enter VR
        </button>
        <button onClick={() => store.enterAR()} style={xrBtnStyle('#0891b2')}>
          Enter AR
        </button>
      </nav>

      {/* ── The 3-D Canvas (fills entire viewport behind sidebar) ── */}
      <Canvas
        camera={{ position: [0, 1.6, 5], fov: 60 }}
        shadows
        style={{ width: '100vw', height: '100vh' }}
      >
        {/* Wrap the scene with <XR> to enable WebXR support */}
        <XR store={store}>
          <ActiveScene onNavigate={setActiveId} activeId={activeId} />
          {/* OrbitControls only applies outside XR; the headset drives the camera in XR */}
          <OrbitControls makeDefault />
        </XR>
      </Canvas>

    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const sidebarStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '190px',
  height: '100%',
  background: 'rgba(8, 8, 24, 0.88)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 10px',
  gap: '4px',
  zIndex: 20,
  boxSizing: 'border-box',
  borderRight: '1px solid rgba(255,255,255,0.08)',
}

const navTitleStyle = {
  color: '#a5b4fc',
  fontSize: '11px',
  fontFamily: 'sans-serif',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  margin: '0 0 10px 4px',
}

function navBtnStyle(active) {
  return {
    padding: '8px 12px',
    background: active ? '#4f46e5' : 'transparent',
    color: active ? '#ffffff' : '#94a3b8',
    border: active ? '1px solid #6366f1' : '1px solid transparent',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    fontFamily: 'sans-serif',
    textAlign: 'left',
    width: '100%',
  }
}

function xrBtnStyle(bg) {
  return {
    padding: '8px 12px',
    background: bg,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    fontFamily: 'sans-serif',
    fontWeight: '600',
    width: '100%',
    marginTop: '4px',
  }
}
