import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html, Environment } from '@react-three/drei'

/**
 * DreiHelpersScene
 * ----------------
 * Three columns, each spotlighting one @react-three/drei helper.
 *
 * Concepts covered: §7 Enhancing Scenes with drei
 *   Column 1: <Text>        — 3D text mesh anchored in world space
 *   Column 2: <Html>        — real DOM element tracked to a 3D position
 *   Column 3: <Environment> — image-based lighting (IBL)
 */

// Simple auto-rotating mesh used in all three columns
function Spinner({ color, geometry, roughness = 0.2, metalness = 0.6 }) {
  const ref = useRef()
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.6
  })
  return (
    <mesh ref={ref}>
      {geometry}
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  )
}

export function DreiHelpersScene() {
  return (
    <>
      {/* Environment provides Image-Based Lighting — used by the metallic sphere in column 3 */}
      <Environment preset="sunset" />

      {/* Dimmed ambient so IBL effect is visible */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 5]} intensity={0.6} />

      {/* Title */}
      <Text position={[0, 3.6, 0]} fontSize={0.28} color="#a5b4fc" anchorX="center">
        @react-three/drei Helpers
      </Text>

      {/* ── Column 1: <Text> ── */}
      <group position={[-3.5, 1.4, 0]}>
        <Spinner
          color="#e74c3c"
          geometry={<boxGeometry args={[0.9, 0.9, 0.9]} />}
        />
        {/* Floating label drawn as a real 3D mesh (not DOM) */}
        <Text
          position={[0, 1.3, 0]}
          fontSize={0.26}
          color="#f39c12"
          anchorX="center"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {'<Text>'}
        </Text>
        <Text position={[0, -1.1, 0]} fontSize={0.14} color="white" anchorX="center">
          3D text mesh
        </Text>
        <Text position={[0, -1.32, 0]} fontSize={0.12} color="#94a3b8" anchorX="center">
          Rendered in world space
        </Text>
      </group>

      {/* ── Column 2: <Html> ── */}
      <group position={[0, 1.4, 0]}>
        <Spinner
          color="#3498db"
          geometry={<sphereGeometry args={[0.6, 32, 32]} />}
          metalness={0.3}
        />
        {/* Real DOM div anchored to a 3D position — useful for tooltips and UI panels */}
        <Html position={[0, 1.2, 0]} center>
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.95)',
              color: '#e2e8f0',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontFamily: 'sans-serif',
              whiteSpace: 'nowrap',
              border: '1px solid #4f46e5',
              pointerEvents: 'none',
            }}
          >
            {'<Html>'} tooltip
          </div>
        </Html>
        <Text position={[0, -1.1, 0]} fontSize={0.14} color="white" anchorX="center">
          2D HTML in 3D space
        </Text>
        <Text position={[0, -1.32, 0]} fontSize={0.12} color="#94a3b8" anchorX="center">
          Real DOM, tracked to pos
        </Text>
      </group>

      {/* ── Column 3: <Environment> IBL ── */}
      <group position={[3.5, 1.4, 0]}>
        {/* Highly metallic sphere that reflects the sunset environment */}
        <Spinner
          color="#ffd700"
          geometry={<icosahedronGeometry args={[0.7, 2]} />}
          roughness={0.0}
          metalness={1.0}
        />
        <Text
          position={[0, 1.3, 0]}
          fontSize={0.26}
          color="#f1c40f"
          anchorX="center"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {'<Environment>'}
        </Text>
        <Text position={[0, -1.1, 0]} fontSize={0.14} color="white" anchorX="center">
          Image-based lighting
        </Text>
        <Text position={[0, -1.32, 0]} fontSize={0.12} color="#94a3b8" anchorX="center">
          Sphere reflects sunset
        </Text>
      </group>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} metalness={0.1} />
      </mesh>
    </>
  )
}
