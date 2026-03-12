import { useState } from 'react'
import { Text } from '@react-three/drei'

/**
 * RaycastingScene
 * ---------------
 * Teaches raycasting by letting the user click to place coloured cubes.
 *
 * How raycasting works in React Three Fiber
 * ─────────────────────────────────────────
 * Every time you click, R3F internally creates a THREE.Raycaster and fires a
 * ray from the camera through the mouse position. It intersects that ray against
 * every mesh in the scene, sorts hits by distance, and triggers React-style
 * pointer events (onClick, onPointerDown, etc.) on each hit object.
 *
 * The event object passed to your handler is a ThreeEvent and contains:
 *   • event.point      — exact 3-D world-space coordinates of the hit
 *   • event.object     — the THREE.Mesh that was intersected
 *   • event.face       — the polygon face that was hit
 *   • event.normal     — surface normal at the hit point (in world space)
 *   • event.distance   — distance from the camera to the hit
 *   • event.stopPropagation() — prevents the event reaching meshes behind this one
 *
 * Concepts covered:
 *   • Automatic raycasting via onClick / onPointerDown
 *   • event.point     — the intersection coordinate
 *   • event.stopPropagation() — hit ordering / bubbling
 *   • useState         — storing dynamic scene objects
 *   • Warm scene lighting and background
 */

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Returns a random warm-hue HSL colour string (reds → oranges → yellows). */
function randomWarmColor() {
  const hue = Math.floor(Math.random() * 60) + 10   // 10–70 °
  const sat = Math.floor(Math.random() * 30)  + 65  // 65–95 %
  const lit = Math.floor(Math.random() * 25)  + 50  // 50–75 %
  return `hsl(${hue}, ${sat}%, ${lit}%)`
}

// ── Floor ─────────────────────────────────────────────────────────────────────

/**
 * Floor
 * -----
 * A large flat plane that receives shadows and accepts click events.
 *
 * Key teaching point:
 *   onClick fires when the ray from the camera hits this mesh.
 *   `e.point` gives us the exact world-space position of that intersection —
 *   that's where we want to place the new cube.
 */
function Floor({ onPlace }) {
  const [hovered, setHovered] = useState(false)

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
      onClick={(e) => {
        // Stop the ray from firing THROUGH the floor and
        // hitting anything below it.
        e.stopPropagation()

        // e.point is the THREE.Vector3 intersection of the ray
        // with this mesh's surface — the raycasting result!
        onPlace(e.point)
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={()  => setHovered(false)}
    >
      <planeGeometry args={[14, 14]} />
      <meshStandardMaterial
        color={hovered ? '#d4a96a' : '#b8895a'}
        roughness={0.85}
        metalness={0.05}
      />
    </mesh>
  )
}

// ── Placed cube ───────────────────────────────────────────────────────────────

/**
 * PlacedCube
 * ----------
 * A 0.5-unit cube that can itself be clicked to stack another cube on top.
 *
 * Key teaching point:
 *   e.stopPropagation() here prevents the click from "falling through" to the
 *   floor beneath.  Without it both the cube AND the floor would fire onClick,
 *   placing two cubes instead of one.
 *
 *   When clicked, e.point lands on the visible face of this cube, so the next
 *   cube is correctly placed on top of (or beside) whichever face was hit.
 */
function PlacedCube({ position, color, onPlace }) {
  const [hovered, setHovered] = useState(false)

  return (
    <mesh
      position={position}
      castShadow
      receiveShadow
      onClick={(e) => {
        // Consume the event so the floor handler below doesn't also fire.
        e.stopPropagation()

        // e.point is the intersection on THIS cube's surface — stack there.
        onPlace(e.point)
      }}

    >
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial
        color={hovered ? '#ffffff' : color}
        roughness={0.35}
        metalness={0.1}
        emissive={hovered ? color : '#000000'}
        emissiveIntensity={hovered ? 0.3 : 0}
      />
    </mesh>
  )
}

// ── Scene ─────────────────────────────────────────────────────────────────────

export function RaycastingScene() {
  /**
   * cubes is an array of { id, position, color }.
   * Each click appends one entry; React re-renders and a new PlacedCube appears.
   */
  const [cubes, setCubes] = useState([])

  /**
   * addCube — called with the raw THREE.Vector3 intersection point.
   *
   * Because the cube has a height of 0.5, its centre must sit 0.1 units
   * above the surface that was clicked, so the bottom face is flush with it.
   */
  function addCube(point) {
    setCubes(prev => [
      ...prev,
      {
        id:       Date.now() + Math.random(), // unique key
        position: [point.x, point.y + 0.1, point.z],
        color:    randomWarmColor(),
      },
    ])
  }

  return (
    <>
      {/* ── Warm background colour ── */}
      <color attach="background" args={['#2a1505']} />


      {/* ── Lighting — warm and directional for depth ── */}

      {/* Soft fill light — base warm tone across the whole scene */}
      <ambientLight intensity={0.55} color="#ffe0b2" />

      {/* Key light — main shadow-caster from upper right */}
      <directionalLight
        position={[6, 10, 6]}
        intensity={2.0}
        color="#fff0d0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      {/* Rim / fill lights — warm accent colours for depth and interest */}
      <pointLight position={[-4, 3,  3]} color="#ff7700" intensity={35} distance={12} />
      <pointLight position={[ 4, 2, -4]} color="#ffaa33" intensity={25} distance={10} />
      <pointLight position={[ 0, 5,  0]} color="#ffddaa" intensity={15} distance={14} />

      {/* ── UI labels ── */}
      <Text
        position={[0, 4.0, -1]}
        fontSize={0.56}
        color="#ffaa44"
        anchorX="center"
        outlineWidth={0.012}
        outlineColor="#2a1505"
      >
        Raycasting — Click to place cubes
      </Text>

      <Text
        position={[0, 3.55, -1]}
        fontSize={0.135}
        color="#ffcc88"
        anchorX="center"
      >
        onClick → e.point · e.stopPropagation() · useState
      </Text>

      <Text
        position={[0, 3.25, -1]}
        fontSize={0.115}
        color="#c8884a"
        anchorX="center"
      >
        {`${cubes.length} cube${cubes.length !== 1 ? 's' : ''} placed`}
      </Text>

      {/* ── Interactive floor ── */}
      <Floor onPlace={addCube} />

      {/* ── Warm grid overlay (sits just above the floor to avoid z-fighting) ── */}
      <gridHelper
        args={[14, 28, '#8b4513', '#5c2d0a']}
        position={[0, 0.002, 0]}
      />

      {/* ── Placed cubes ── */}
      {cubes.map(cube => (
        <PlacedCube
          key={cube.id}
          position={cube.position}
          color={cube.color}
          onPlace={addCube}
        />
      ))}
    </>
  )
}
