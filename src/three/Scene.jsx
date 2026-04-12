import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Sparkles } from "@react-three/drei"
import Models from "./Models"

// Silence the warnings about THREE.Clock globally (from internal Drei components)
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === "string" && args[0].includes("THREE.Clock: This module has been deprecated")) return;
  originalWarn(...args);
};

const Scene = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Canvas 
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={isMobile ? 1 : [1, 2]}
      style={{ width: "100%", height: "100%", display: "block" }}
      gl={{ alpha: true, antialias: !isMobile, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        // Handle WebGL context loss gracefully
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          console.warn("WebGL Context Lost - handled by boundary");
        }, false);
        gl.domElement.addEventListener("webglcontextrestored", () => {
          console.log("WebGL Context Restored");
        }, false);
      }}
    >
      <ambientLight intensity={0.5} />
      
      {/* Dynamic Dramatic Lighting */}
      <spotLight position={[10, 10, 10]} intensity={isMobile ? 1 : 1.5} angle={0.15} penumbra={1} color="#ffffff" />
      <spotLight position={[-10, 5, -10]} intensity={isMobile ? 1 : 2} angle={0.3} penumbra={1} color="#6C63FF" />
      <pointLight position={[0, -5, 5]} intensity={1} color="#00F5FF" />

      {/* Give reflections to glass objects */}
      <Environment preset="city" />

      {/* Reduce performance intensity on mobile */}
      <Sparkles count={isMobile ? 50 : 200} scale={15} size={2} speed={0.4} opacity={0.5} color="#00F5FF" />
      <Models isMobile={isMobile} />

      {/* Minimal orbit controls just for light touch parallax, restricted to prevent breaking layout */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />
    </Canvas>
  )
}

export default Scene