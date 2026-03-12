import { Text } from '@react-three/drei'

/**
 * LightingScene
 * -------------
 * Shows four light types by placing coloured light sources at distinct positions
 * over a set of white objects. Each light has a glowing bulb mesh and a label.
 *
 * Concepts covered: §5.6 Lighting Setup
 *
 * Light types shown:
 *   ambientLight      — soft fill with no direction or position
 *   directionalLight  — parallel rays (like the sun)
 *   pointLight        — radiates in all directions from a point
 *   spotLight         — cone of light from a point
 */

// Small glowing sphere to mark a light source position
function LightBulb({ position, color }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

export function LightingScene() {
  return (
    <>
      {/* ── Very dim base ambient so unlit areas show the difference ── */}
      <ambientLight intensity={0.08} />

      {/* ── Directional Light — warm white, upper-right ── */}
      <directionalLight position={[6, 7, 4]} intensity={1.8} color="#fff5cc" />
      <LightBulb position={[6, 7, 4]} color="#fff5cc" />
      <Text position={[6, 7.6, 4]} fontSize={0.22} color="#fff5cc" anchorX="center">
        DirectionalLight
      </Text>
      <Text position={[6, 7.2, 4]} fontSize={0.14} color="#94a3b8" anchorX="center">
        Parallel rays (sun)
      </Text>

      {/* ── Red Point Light ── */}
      <pointLight position={[-5, 4, 1]} color="#ff4455" intensity={60} distance={8} decay={2} />
      <LightBulb position={[-5, 4, 1]} color="#ff4455" />
      <Text position={[-5, 4.6, 1]} fontSize={0.22} color="#ff8888" anchorX="center">
        PointLight (red)
      </Text>
      <Text position={[-5, 4.2, 1]} fontSize={0.14} color="#94a3b8" anchorX="center">
        All-direction falloff
      </Text>

      {/* ── Blue Point Light ── */}
      <pointLight position={[0, 4, -3]} color="#4499ff" intensity={50} distance={7} decay={2} />
      <LightBulb position={[0, 4, -3]} color="#4499ff" />
      <Text position={[0, 4.6, -3]} fontSize={0.22} color="#88aaff" anchorX="center">
        PointLight (blue)
      </Text>

      {/* ── Spot Light — purple cone ── */}
      <spotLight
        position={[2, 6, 3]}
        angle={0.35}
        penumbra={0.3}
        intensity={80}
        color="#cc88ff"
        decay={2}
      />
      <LightBulb position={[2, 6, 3]} color="#cc88ff" />
      <Text position={[2, 6.6, 3]} fontSize={0.22} color="#cc88ff" anchorX="center">
        SpotLight
      </Text>
      <Text position={[2, 6.2, 3]} fontSize={0.14} color="#94a3b8" anchorX="center">
        Cone of light
      </Text>

      {/* Title */}
      <Text position={[0, 4.8, 0]} fontSize={0.3} color="#a5b4fc" anchorX="center">
        Lighting Types
      </Text>

      {/* ── Objects that catch the light ── */}
      <mesh position={[-4, 0.5, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>

      <mesh position={[-1.5, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
      </mesh>

      <mesh position={[1.5, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 1.2, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      <mesh position={[4, 0.5, 0]} castShadow>
        <torusKnotGeometry args={[0.4, 0.13, 80, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#0f0f1a" roughness={0.9} />
      </mesh>
    </>
  )
}
