import { useState } from 'react'
import { Text } from '@react-three/drei'

function SceneLinkCard({ position, title, subtitle, color, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <group position={position}>
      <mesh
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.04 : 1}
      >
        <boxGeometry args={[2.8, 1.4, 0.22]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : color}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.28 : 0}
          metalness={0.08}
          roughness={0.32}
        />
      </mesh>

      <Text
        position={[0, 0.22, 0.14]}
        fontSize={0.19}
        maxWidth={2.3}
        color={hovered ? '#1f2937' : '#f8fafc'}
        anchorX="center"
      >
        {title}
      </Text>

      <Text
        position={[0, -0.15, 0.14]}
        fontSize={0.11}
        maxWidth={2.2}
        color={hovered ? '#4b5563' : '#dbeafe'}
        anchorX="center"
      >
        {subtitle}
      </Text>
    </group>
  )
}

export function HyperlinkScene({ onNavigate }) {
  return (
    <>
      <color attach="background" args={['#0c1124']} />
      <fog attach="fog" args={['#0c1124', 10, 25]} />

      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 6, 4]} intensity={1.2} color="#dbeafe" />
      <pointLight position={[-3, 3, 2]} color="#60a5fa" intensity={18} distance={9} />
      <pointLight position={[3, 2, 2]} color="#22d3ee" intensity={16} distance={8} />

      <Text position={[0, 3.35, 0]} fontSize={0.33} color="#e2e8f0" anchorX="center">
        Scene Hyperlink Concept
      </Text>

      <Text position={[0, 2.95, 0]} fontSize={0.14} color="#93c5fd" anchorX="center">
        Click a 3D card to navigate to another scene route
      </Text>

      <SceneLinkCard
        position={[-2.1, 1.35, 0]}
        title="Open Museum"
        subtitle="onClick -> onNavigate('museum')"
        color="#1d4ed8"
        onClick={() => onNavigate?.('museum')}
      />

      <SceneLinkCard
        position={[2.1, 1.35, 0]}
        title="Back to Shapes"
        subtitle="onClick -> onNavigate('shapes')"
        color="#0f766e"
        onClick={() => onNavigate?.('shapes')}
      />

      <Text position={[0, 0.2, 0]} fontSize={0.14} color="#cbd5e1" anchorX="center">
        Treat scene ids like routes and pass a navigation callback from App
      </Text>

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#111827" roughness={0.95} />
      </mesh>
    </>
  )
}