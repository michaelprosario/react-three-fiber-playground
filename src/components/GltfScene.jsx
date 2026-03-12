import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Text } from '@react-three/drei'

/**
 * GltfScene
 * ---------
 * Demonstrates how to load and display a GLB/GLTF 3-D model in React Three Fiber.
 *
 * Concepts covered:
 *   • useGLTF   — drei hook that wraps THREE.GLTFLoader with caching
 *   • <primitive> — drops a pre-built Three.js object (scene graph) into R3F
 *   • <Suspense> — React's async boundary; shows a fallback while the model streams
 *   • useGLTF.preload — kicks off the network request before the component mounts
 *
 * Asset path:
 *   In Vite, files in the `public/` folder are served from the site root.
 *   Place Crystal.glb at  public/assets/Crystal.glb  →  URL: /assets/Crystal.glb
 *   After `vite build` the file lands in  dist/assets/Crystal.glb  (same URL).
 */

// ── Spinning crystal model ────────────────────────────────────────────────────

function CrystalModel() {
  // useGLTF returns { scene, nodes, materials, animations, ... }
  // scene is the root THREE.Group of the loaded model.
  const { scene } = useGLTF('/assets/Crystal.glb')

  const ref = useRef()

  // Rotate the model every frame using the elapsed delta so
  // the speed is frame-rate independent.
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.6
  })

  return (
    // <primitive> lets you place any raw Three.js object into the R3F scene.
    // `object` accepts the model's root scene group directly.
    <primitive
      ref={ref}
      object={scene}
      scale={0.5}
      position={[0, -0.5, 0]}
      castShadow
      receiveShadow
    />
  )
}

// ── Placeholder shown while the GLB is downloading ───────────────────────────

function LoadingFallback() {
  return (
    <mesh>
      <octahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial color="#a5b4fc" wireframe />
    </mesh>
  )
}

// ── Main scene export ─────────────────────────────────────────────────────────

export function GltfScene() {
  return (
    <>
      {/* ── Lighting ── */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.8} castShadow />
      <pointLight position={[-4, 4, 3]}  color="#88aaff" intensity={40} />
      <pointLight position={[ 4, 2, -3]} color="#ff88aa" intensity={25} />

      {/* ── Title ── */}
      <Text
        position={[0, 3.2, 0]}
        fontSize={0.28}
        color="#a5b4fc"
        anchorX="center"
      >
        Loading a GLB Model
      </Text>

      {/* ── Concept labels ── */}
      <Text
        position={[0, -2.6, 0]}
        fontSize={0.15}
        color="#94a3b8"
        anchorX="center"
      >
        useGLTF  ·  Suspense  ·  {'<primitive>'}
      </Text>

      {/* ── Model — wrapped in Suspense so the rest of the scene renders
            immediately while the GLB asset is still being fetched ── */}
      <Suspense fallback={<LoadingFallback />}>
        <CrystalModel />
      </Suspense>

      {/* ── Floor grid for spatial reference ── */}
      <gridHelper
        args={[10, 10, '#334155', '#1e293b']}
        position={[0, -2, 0]}
      />
    </>
  )
}

// Preload kicks off the network request as soon as this module is imported,
// before the component ever mounts — the model is ready (or nearly ready)
// the first time the user navigates to this scene.
useGLTF.preload('/assets/Crystal.glb')
