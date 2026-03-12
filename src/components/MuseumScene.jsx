import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

function MarbleMaterial({ tint = '#f7f3ed' }) {
  return (
    <meshStandardMaterial
      color={tint}
      roughness={0.22}
      metalness={0.02}
      emissive="#1b130f"
      emissiveIntensity={0.02}
    />
  )
}

function Pedestal({ position, height = 0.8, width = 0.8, children }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, width]} />
        <MarbleMaterial tint="#f0ebe3" />
      </mesh>
      {children}
    </group>
  )
}

function KineticRibbon({ position, colorA, colorB }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ref.current.rotation.y = t * 0.45
    ref.current.rotation.x = Math.sin(t * 0.9) * 0.25
  })

  return (
    <group position={position}>
      <mesh ref={ref} castShadow>
        <torusKnotGeometry args={[0.42, 0.14, 180, 28]} />
        <meshPhysicalMaterial
          color={colorA}
          metalness={0.85}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.14}
          emissive={colorB}
          emissiveIntensity={0.08}
        />
      </mesh>
    </group>
  )
}

function FramedCanvas({ position, hue }) {
  const frameColor = '#4f3a2a'
  const noiseBands = useMemo(() => {
    return new Array(10).fill(0).map((_, i) => ({
      y: 0.95 - i * 0.2,
      scale: 0.55 + (i % 3) * 0.22,
      color: `hsl(${(hue + i * 14) % 360} 82% ${42 + (i % 2) * 14}%)`,
    }))
  }, [hue])

  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.8, 2.2, 0.08]} />
        <meshStandardMaterial color={frameColor} roughness={0.65} />
      </mesh>

      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1.45, 1.9]} />
        <meshStandardMaterial color="#0f1219" metalness={0.08} roughness={0.88} />
      </mesh>

      {noiseBands.map(({ y, scale, color }) => (
        <mesh key={`${hue}-${y}`} position={[0, y * 0.58, 0.055]}>
          <planeGeometry args={[scale, 0.11]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.22} />
        </mesh>
      ))}
    </group>
  )
}

function RoomShell() {
  return (
    <>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#dad2c6" roughness={0.92} metalness={0.03} />
      </mesh>

      <mesh receiveShadow position={[0, 4.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#f8f5ef" roughness={0.82} />
      </mesh>

      <mesh receiveShadow position={[0, 2.2, -9]}>
        <boxGeometry args={[30, 4.4, 0.35]} />
        <meshStandardMaterial color="#e9e3d8" roughness={0.86} />
      </mesh>

      <mesh receiveShadow position={[0, 2.2, 9]}>
        <boxGeometry args={[30, 4.4, 0.35]} />
        <meshStandardMaterial color="#e9e3d8" roughness={0.86} />
      </mesh>

      <mesh receiveShadow position={[-9, 2.2, 0]}>
        <boxGeometry args={[0.35, 4.4, 30]} />
        <meshStandardMaterial color="#eee8dd" roughness={0.9} />
      </mesh>

      <mesh receiveShadow position={[9, 2.2, 0]}>
        <boxGeometry args={[0.35, 4.4, 30]} />
        <meshStandardMaterial color="#eee8dd" roughness={0.9} />
      </mesh>
    </>
  )
}

function LightRail({ position }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[10, 0.08, 0.15]} />
        <meshStandardMaterial color="#6f6f72" roughness={0.55} metalness={0.35} />
      </mesh>

      <pointLight position={[-3.2, -0.5, 0]} intensity={16} distance={10} color="#ffe7c4" />
      <pointLight position={[0, -0.5, 0]} intensity={16} distance={10} color="#fff2de" />
      <pointLight position={[3.2, -0.5, 0]} intensity={16} distance={10} color="#ffe7c4" />
    </group>
  )
}

function ReturnPortal({ onNavigate }) {
  const [hovered, setHovered] = useState(false)

  return (
    <group position={[0, 1.5, 7.8]}>
      <mesh
        onClick={() => onNavigate?.('hyperlink')}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.03 : 1}
      >
        <boxGeometry args={[3.8, 1.1, 0.22]} />
        <meshStandardMaterial
          color={hovered ? '#fff6e8' : '#2f2d2a'}
          emissive={hovered ? '#8b5e34' : '#000000'}
          emissiveIntensity={hovered ? 0.35 : 0}
          roughness={0.5}
        />
      </mesh>

      <Text position={[0, 0.1, 0.12]} fontSize={0.16} color={hovered ? '#1f2937' : '#f4efe7'} anchorX="center">
        Back To Hyperlink Lesson
      </Text>

      <Text position={[0, -0.2, 0.12]} fontSize={0.1} color={hovered ? '#4b5563' : '#d6d3d1'} anchorX="center">
        onClick -&gt; onNavigate('hyperlink')
      </Text>
    </group>
  )
}

export function MuseumScene({ onNavigate }) {
  return (
    <>
      <color attach="background" args={['#f4efe7']} />
      <fog attach="fog" args={['#f4efe7', 14, 30]} />

      <ambientLight intensity={0.3} />
      <hemisphereLight intensity={0.35} color="#fff9ef" groundColor="#b9ab9a" />

      <directionalLight
        castShadow
        position={[7, 10, 4]}
        intensity={1.8}
        color="#fff6e8"
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={35}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />

      <RoomShell />

      <LightRail position={[0, 4.2, -7.7]} />
      <LightRail position={[0, 4.2, 7.7]} />

      <FramedCanvas position={[-5.8, 2.2, -8.75]} hue={16} />
      <FramedCanvas position={[0, 2.2, -8.75]} hue={194} />
      <FramedCanvas position={[5.8, 2.2, -8.75]} hue={82} />

      <FramedCanvas position={[-5.8, 2.2, 8.75]} hue={280} />
      <FramedCanvas position={[0, 2.2, 8.75]} hue={224} />
      <FramedCanvas position={[5.8, 2.2, 8.75]} hue={42} />

      <Pedestal position={[-4.8, 0, -1.6]}>
        <KineticRibbon position={[0, 1.18, 0]} colorA="#cf5b3a" colorB="#f4d8b6" />
      </Pedestal>

      <Pedestal position={[0, 0, -1.6]}>
        <KineticRibbon position={[0, 1.18, 0]} colorA="#2f7da9" colorB="#b8e2ff" />
      </Pedestal>

      <Pedestal position={[4.8, 0, -1.6]}>
        <KineticRibbon position={[0, 1.18, 0]} colorA="#968037" colorB="#fff2b0" />
      </Pedestal>

      <Pedestal position={[-2.4, 0, 3.2]} width={0.95}>
        <KineticRibbon position={[0, 1.18, 0]} colorA="#6a4ba8" colorB="#dbc4ff" />
      </Pedestal>

      <Pedestal position={[2.4, 0, 3.2]} width={0.95}>
        <KineticRibbon position={[0, 1.18, 0]} colorA="#1d9182" colorB="#bdf7ef" />
      </Pedestal>

      <Text
        position={[0, 3.8, 0]}
        fontSize={0.44}
        color="#2a2621"
        anchorX="center"
        anchorY="middle"
      >
        Immersive Museum Hall
      </Text>

      <Text
        position={[0, 3.3, 0]}
        fontSize={0.16}
        color="#6e6559"
        anchorX="center"
        anchorY="middle"
      >
        contemporary objects, warm gallery light, and spatial rhythm
      </Text>

      <ReturnPortal onNavigate={onNavigate} />
    </>
  )
}