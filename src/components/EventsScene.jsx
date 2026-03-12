import { useState } from 'react'
import { Text } from '@react-three/drei'

/**
 * EventsScene
 * -----------
 * Three interactive objects that respond to pointer events.
 * Demonstrates that R3F pointer events work on desktop (inline mode) too.
 *
 * Concepts covered: §5.5 Event System, §3.2 Props vs State
 */

// ── Hover to change colour ────────────────────────────────────────────────────
function HoverBox({ position }) {
  const [hovered, setHovered] = useState(false)

  return (
    <group position={position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial
          color={hovered ? '#f39c12' : '#3498db'}
          emissive={hovered ? '#f39c12' : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
          roughness={0.4}
        />
      </mesh>
      <Text position={[0, -1.1, 0]} fontSize={0.15} color="white" anchorX="center">
        Hover me
      </Text>
      <Text position={[0, -1.32, 0]} fontSize={0.12} color="#94a3b8" anchorX="center">
        onPointerOver / Out
      </Text>
    </group>
  )
}

// ── Click to grow / shrink ────────────────────────────────────────────────────
function ClickSphere({ position }) {
  const [big, setBig] = useState(false)

  return (
    <group position={position}>
      <mesh
        scale={big ? 1.6 : 1}
        onClick={() => setBig(b => !b)}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={big ? '#2ecc71' : '#e74c3c'}
          roughness={0.3}
        />
      </mesh>
      <Text position={[0, -1.1, 0]} fontSize={0.15} color="white" anchorX="center">
        Click me
      </Text>
      <Text position={[0, -1.32, 0]} fontSize={0.12} color="#94a3b8" anchorX="center">
        onClick → toggle scale
      </Text>
    </group>
  )
}

// ── Click to cycle colours ────────────────────────────────────────────────────
function ColorCycler({ position }) {
  const palette = ['#9b59b6', '#e91e8c', '#1abc9c', '#f39c12', '#e74c3c']
  const [idx, setIdx] = useState(0)

  return (
    <group position={position}>
      <mesh onClick={() => setIdx(i => (i + 1) % palette.length)}>
        <torusKnotGeometry args={[0.4, 0.13, 80, 16]} />
        <meshStandardMaterial
          color={palette[idx]}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>
      <Text position={[0, -1.1, 0]} fontSize={0.15} color="white" anchorX="center">
        Click me
      </Text>
      <Text position={[0, -1.32, 0]} fontSize={0.12} color="#94a3b8" anchorX="center">
        onClick → cycle colours
      </Text>
    </group>
  )
}

// ── Scene ─────────────────────────────────────────────────────────────────────
export function EventsScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <pointLight position={[0, 4, 2]} color="#ffffff" intensity={30} />

      <Text position={[0, 3.4, 0]} fontSize={0.28} color="#a5b4fc" anchorX="center">
        Pointer Events &amp; Interactivity
      </Text>

      <HoverBox     position={[-3, 1.4, 0]} />
      <ClickSphere  position={[0,  1.4, 0]} />
      <ColorCycler  position={[3,  1.4, 0]} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
      </mesh>
    </>
  )
}
