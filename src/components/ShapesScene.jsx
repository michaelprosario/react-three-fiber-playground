import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

/**
 * ShapesScene
 * -----------
 * A simple, well-lit collection of common 3-D shapes arranged in a circle around
 * the viewer. Each shape slowly rotates so you can see its geometry from all sides.
 *
 * Shapes included:
 *   Box          – BoxGeometry
 *   Sphere       – SphereGeometry
 *   Cylinder     – CylinderGeometry
 *   Cone         – ConeGeometry
 *   Torus        – TorusGeometry
 *   Torus Knot   – TorusKnotGeometry
 *   Icosahedron  – IcosahedronGeometry
 */

// ─── Individual shape wrapper ────────────────────────────────────────────────
function Shape({ position, color, label, children }) {
  const groupRef = useRef()

  // Slow continuous rotation so the shape is visible from all angles
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5
      groupRef.current.rotation.x += delta * 0.2
    }
  })

  return (
    <group position={position} >
      {/* Rotating mesh */}
      <group ref={groupRef}>
        <mesh castShadow receiveShadow>
          {children}
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* Label below the shape */}
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.18}
        color="white"
        anchorX="center"
        anchorY="top"
        outlineWidth={0.01}
        outlineColor="black"
      >
        {label}
      </Text>
    </group>
  )
}

// ─── Full scene ───────────────────────────────────────────────────────────────
export function ShapesScene() {
  // Spread shapes evenly in a circle, elevated to eye level
  const shapes = [
    {
      label: 'Box',
      color: '#e74c3c',
      geometry: <boxGeometry args={[1, 1, 1]} />,
    },
    {
      label: 'Sphere',
      color: '#3498db',
      geometry: <sphereGeometry args={[0.6, 32, 32]} />,
    },
    {
      label: 'Cylinder',
      color: '#2ecc71',
      geometry: <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} />,
    },
    {
      label: 'Cone',
      color: '#f39c12',
      geometry: <coneGeometry args={[0.6, 1.2, 32]} />,
    },
    {
      label: 'Torus',
      color: '#9b59b6',
      geometry: <torusGeometry args={[0.5, 0.2, 16, 48]} />,
    },
    {
      label: 'Torus Knot',
      color: '#e91e8c',
      geometry: <torusKnotGeometry args={[0.45, 0.15, 100, 16]} />,
    },
    {
      label: 'Icosahedron',
      color: '#1abc9c',
      geometry: <icosahedronGeometry args={[0.65, 0]} />,
    },
  ]

  const radius = 3.5
  const count = shapes.length

  return (
    <>
      {/* ── Lighting ──────────────────────────────────────────────────────── */}

      {/* Soft fill light everywhere */}
      <ambientLight intensity={0.4} />

      {/* Main sun-like directional light with shadows */}
      <directionalLight
        castShadow
        position={[5, 8, 5]}
        intensity={1.5}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={40}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Warm fill light from the left */}
      <pointLight position={[-6, 4, -4]} color="#ffaa44" intensity={60} />

      {/* Cool fill light from the right */}
      <pointLight position={[6, 2, 4]} color="#4488ff" intensity={40} />

      {/* ── Shapes ────────────────────────────────────────────────────────── */}
      {shapes.map(({ label, color, geometry }, i) => {
        // Place shapes evenly around a circle
        const angle = (i / count) * Math.PI * 2
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius

        return (
          <Shape key={label} position={[x, 1.4, z]} color={color} label={label}>
            {geometry}
          </Shape>
        )
      })}

      {/* ── Ground plane ──────────────────────────────────────────────────── */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#222244" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* ── Sky / background color ────────────────────────────────────────── */}
      <color attach="background" args={['#0a0a1a']} />

      {/* ── Scene title ───────────────────────────────────────────────────── */}
      <Text
        position={[0, 3.8, 0]}
        fontSize={0.35}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        WebXR Shapes – React Three Fiber
      </Text>
    </>
  )
}
