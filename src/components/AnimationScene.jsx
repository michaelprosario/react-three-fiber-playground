import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

/**
 * AnimationScene
 * --------------
 * Four shapes each demonstrating a different useFrame animation pattern.
 *
 * Concepts covered: §4.4 Render Loop, §5.3 useFrame, §3.3 useRef
 */

// ── Pattern 1: Continuous spin ───────────────────────────────────────────────
function SpinningBox({ position }) {
  const ref = useRef()

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 1.5
    ref.current.rotation.x += delta * 0.5
  })

  return (
    <group position={position}>
      <mesh ref={ref}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial color="#e74c3c" roughness={0.4} />
      </mesh>
      <Text position={[0, -1.1, 0]} fontSize={0.14} color="white" anchorX="center">
        Spin
      </Text>
      <Text position={[0, -1.32, 0]} fontSize={0.11} color="#94a3b8" anchorX="center">
        rotation += delta
      </Text>
    </group>
  )
}

// ── Pattern 2: Sine-wave bounce ───────────────────────────────────────────────
function BouncingSphere({ position }) {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    meshRef.current.position.y = Math.abs(Math.sin(clock.elapsedTime * 2)) * 0.8
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#3498db" roughness={0.3} />
      </mesh>
      <Text position={[0, -1.1, 0]} fontSize={0.14} color="white" anchorX="center">
        Bounce
      </Text>
      <Text position={[0, -1.32, 0]} fontSize={0.11} color="#94a3b8" anchorX="center">
        Math.abs(Math.sin(t))
      </Text>
    </group>
  )
}

// ── Pattern 3: Scale pulse ────────────────────────────────────────────────────
function PulsingTorus({ position }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    const s = 0.8 + Math.sin(clock.elapsedTime * 2.5) * 0.25
    ref.current.scale.setScalar(s)
  })

  return (
    <group position={position}>
      <mesh ref={ref}>
        <torusGeometry args={[0.45, 0.15, 16, 48]} />
        <meshStandardMaterial color="#9b59b6" roughness={0.3} />
      </mesh>
      <Text position={[0, -1.1, 0]} fontSize={0.14} color="white" anchorX="center">
        Pulse
      </Text>
      <Text position={[0, -1.32, 0]} fontSize={0.11} color="#94a3b8" anchorX="center">
        scale.setScalar(sin(t))
      </Text>
    </group>
  )
}

// ── Pattern 4: Circular orbit ─────────────────────────────────────────────────
function OrbitingCube({ position }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ref.current.position.x = Math.sin(t * 1.2) * 0.65
    ref.current.position.z = Math.cos(t * 1.2) * 0.65
  })

  return (
    <group position={position}>
      <mesh ref={ref}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#f39c12" roughness={0.3} />
      </mesh>
      <Text position={[0, -1.1, 0]} fontSize={0.14} color="white" anchorX="center">
        Orbit
      </Text>
      <Text position={[0, -1.32, 0]} fontSize={0.11} color="#94a3b8" anchorX="center">
        sin/cos(t) → x/z
      </Text>
    </group>
  )
}

// ── Scene ─────────────────────────────────────────────────────────────────────
export function AnimationScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <pointLight position={[0, 5, 0]} color="#ffffff" intensity={30} />

      <Text position={[0, 3.4, 0]} fontSize={0.28} color="#a5b4fc" anchorX="center">
        Animation with useFrame
      </Text>

      <SpinningBox   position={[-4.5, 1.4, 0]} />
      <BouncingSphere position={[-1.5, 1.4, 0]} />
      <PulsingTorus  position={[1.5,  1.4, 0]} />
      <OrbitingCube  position={[4.5,  1.4, 0]} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
      </mesh>
    </>
  )
}
