import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useXR } from '@react-three/xr'
import { Text } from '@react-three/drei'

/**
 * XRAwareScene
 * ------------
 * Demonstrates how to detect WebXR session state inside a component using
 * the useXR hook from @react-three/xr v6.
 *
 * Concepts covered: §6.2 XR Store, §6.3 What <XR> Does, §6.4 Reading XR State
 *
 * The central icosahedron responds to whether a VR/AR session is active:
 *   Desktop  — wireframe, red tint, normal size
 *   XR mode  — solid, green, 1.5× larger
 */
function XRAwareStar() {
  const session = useXR((state) => state.session)
  const isPresenting = session != null
  const ref = useRef()

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * (isPresenting ? 1.2 : 0.5)
    ref.current.rotation.x += delta * 0.2
  })

  return (
    <group>
      <mesh ref={ref} scale={isPresenting ? 1.5 : 1}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color={isPresenting ? '#2ecc71' : '#e74c3c'}
          roughness={0.2}
          metalness={0.5}
          wireframe={!isPresenting}
        />
      </mesh>

      {/* Status text below the shape */}
      <Text
        position={[0, -1.8, 0]}
        fontSize={0.2}
        color={isPresenting ? '#2ecc71' : '#94a3b8'}
        anchorX="center"
      >
        {isPresenting ? 'Inside XR Session!' : 'Desktop Mode — click Enter VR / AR'}
      </Text>
    </group>
  )
}

export function XRAwareScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <pointLight position={[-4, 3, -2]} color="#8844ff" intensity={40} />
      <pointLight position={[4, 3, 2]} color="#44aaff" intensity={30} />

      {/* Title */}
      <Text position={[0, 3.4, 0]} fontSize={0.28} color="#a5b4fc" anchorX="center">
        useXR — XR-Aware Objects
      </Text>

      {/* Subtitle explanation */}
      <Text position={[0, 2.8, 0]} fontSize={0.16} color="#64748b" anchorX="center">
        useXR((state) =&gt; state.session)
      </Text>

      <group position={[0, 1.4, 0]}>
        <XRAwareStar />
      </group>

      {/* Legend */}
      <Text position={[-2.5, 0.3, 0]} fontSize={0.15} color="#e74c3c" anchorX="left">
        ◆  Wireframe + red = desktop
      </Text>
      <Text position={[-2.5, 0.0, 0]} fontSize={0.15} color="#2ecc71" anchorX="left">
        ◆  Solid + green = XR session active
      </Text>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
      </mesh>
    </>
  )
}
