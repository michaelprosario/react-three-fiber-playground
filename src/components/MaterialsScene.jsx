import { Text } from '@react-three/drei'

/**
 * MaterialsScene
 * --------------
 * Four identical spheres demonstrating the most common Three.js material types.
 * Same geometry — completely different visual results based on material alone.
 *
 * Concepts covered: §4.3 Materials
 */

function MaterialDemo({ position, label, children }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        {children}
      </mesh>
      <Text
        position={[0, -1.1, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="top"
      >
        {label}
      </Text>
    </group>
  )
}

export function MaterialsScene() {
  return (
    <>
      {/* Lighting — needed to show the difference between lit and unlit materials */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />
      <pointLight position={[-4, 3, 2]} color="#ff8844" intensity={40} />
      <pointLight position={[4, 3, 2]} color="#4488ff" intensity={30} />

      {/* Title */}
      <Text
        position={[0, 3.4, 0]}
        fontSize={0.28}
        color="#a5b4fc"
        anchorX="center"
      >
        Same Geometry, Different Material
      </Text>

      {/* Basic — no lighting, always flat */}
      <MaterialDemo position={[-4.5, 1.4, 0]} label="MeshBasicMaterial">
        <meshBasicMaterial color="#b41200" />
      </MaterialDemo>

      {/* Standard — PBR, responds to lights */}
      <MaterialDemo position={[-1.5, 1.4, 0]} label="MeshStandardMaterial">
        <meshStandardMaterial color="#3498db" roughness={0.4} metalness={0.2} />
      </MaterialDemo>

      {/* Physical — Extended PBR, metallic mirror finish */}
      <MaterialDemo position={[1.5, 1.4, 0]} label="MeshPhysicalMaterial">
        <meshPhysicalMaterial color="#ffd700" roughness={0.05} metalness={1.0} />
      </MaterialDemo>

      {/* Normal — debug view: colours by surface normal vector */}
      <MaterialDemo position={[4.5, 1.4, 0]} label="MeshNormalMaterial">
        <meshNormalMaterial />
      </MaterialDemo>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
      </mesh>
    </>
  )
}
