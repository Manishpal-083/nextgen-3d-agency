import { Float, Sphere, Icosahedron, Box } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

const Models = ({ isMobile }) => {
  const groupRef = useRef()

  // Gentle parallax effect using framerate-independent damp instead of lerp
  useFrame((state, delta) => {
    if (groupRef.current && !isMobile) {
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, (state.mouse.x * Math.PI) / 10, 2, delta)
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, (state.mouse.y * Math.PI) / 10, 2, delta)
    }
  })

  // Glass Material for Sphere
  const glassMaterial = {
    roughness: 0,
    transmission: 1,
    thickness: 1,
    metalness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0,
    ior: 1.5,
  }

  // Premium Metallic Material - simplified on mobile
  const metallicMaterialParams = {
    roughness: isMobile ? 0.3 : 0.2,
    metalness: isMobile ? 0.6 : 0.8,
    clearcoat: isMobile ? 0 : 1,
    clearcoatRoughness: 0.1,
  }

  return (
    <group ref={groupRef}>
      {/* Front Glass Sphere - lower segment count on mobile */}
      <Float speed={2} rotationIntensity={isMobile ? 1 : 1.5} floatIntensity={isMobile ? 1.5 : 3}>
        <Sphere position={[3.5, 1, -2]} args={[1.2, isMobile ? 32 : 64, isMobile ? 32 : 64]}>
          <meshPhysicalMaterial {...glassMaterial} color="#ffffff" />
        </Sphere>
      </Float>

      {/* Floating Card / Box */}
      <Float speed={2.5} rotationIntensity={isMobile ? 1.5 : 2.5} floatIntensity={isMobile ? 1 : 2}>
        <Box position={[-4, -1, -3]} args={[1.8, 2.5, 0.1]} radius={0.1}>
          <meshPhysicalMaterial color="#00F5FF" {...metallicMaterialParams} />
        </Box>
      </Float>

      {/* Gradient Blob / Abstract Shape - simplify detail on mobile */}
      <Float speed={1.5} rotationIntensity={isMobile ? 1 : 2} floatIntensity={isMobile ? 2 : 4}>
        <Icosahedron position={[1.5, -2.5, -1.5]} args={[1, isMobile ? 0 : 1]}>
          <meshPhysicalMaterial color="#6C63FF" {...metallicMaterialParams} />
        </Icosahedron>
      </Float>

      {/* Extra floating ring for premium feel */}
      <Float speed={3} rotationIntensity={isMobile ? 1.5 : 3} floatIntensity={isMobile ? 1 : 2}>
        <mesh position={[-2, 2, -4]}>
          <torusGeometry args={[0.8, 0.05, isMobile ? 32 : 64, isMobile ? 50 : 100]} />
          <meshPhysicalMaterial color="#ffffff" {...metallicMaterialParams} metalness={1} roughness={0} />
        </mesh>
      </Float>
    </group>
  )
}

export default Models