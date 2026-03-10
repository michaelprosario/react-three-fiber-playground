import { Canvas } from '@react-three/fiber'
import { createXRStore, XR } from '@react-three/xr'
import { OrbitControls } from '@react-three/drei'
import { ShapesScene } from './components/ShapesScene'

// Create the XR store — this manages the WebXR session
const store = createXRStore()

export default function App() {
  return (
    <>
      {/* Overlay buttons for entering VR or AR */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '16px',
          zIndex: 10,
        }}
      >
        <button
          onClick={() => store.enterVR()}
          style={buttonStyle('#4f46e5')}
        >
          Enter VR
        </button>
        <button
          onClick={() => store.enterAR()}
          style={buttonStyle('#0891b2')}
        >
          Enter AR
        </button>
      </div>

      {/* The 3-D Canvas */}
      <Canvas
        camera={{ position: [0, 1.6, 5], fov: 60 }}
        style={{ width: '100vw', height: '100vh' }}
      >
        {/* Wrap the scene with <XR> to enable WebXR support */}
        <XR store={store}>
          <ShapesScene />
          {/* OrbitControls only applies outside XR; in XR, the headset drives the camera */}
          <OrbitControls makeDefault />
        </XR>
      </Canvas>
    </>
  )
}

function buttonStyle(bg) {
  return {
    padding: '12px 28px',
    background: bg,
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: 'sans-serif',
    fontWeight: '600',
    boxShadow: '0 4px 14px rgba(0,0,0,0.6)',
  }
}
