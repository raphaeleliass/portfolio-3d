"use client"

import { Environment, Float, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

export default function HeroScene({ ondrag }: { ondrag: () => void }) {
  return (
    <div className="h-1/2 w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true }}
        onPointerDown={ondrag} // Dispara quando o usuário clica
      >
        <ambientLight intensity={1} />
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <Environment preset="sunset" />

        <Float floatIntensity={2} speed={2} rotationIntensity={4}>
          <mesh scale={1.2}>
            <torusKnotGeometry args={[1, 0.4, 300, 16]} />
            <meshStandardMaterial color="white" metalness={1} roughness={1} />
          </mesh>
        </Float>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          onStart={ondrag} // Dispara quando começa a arrastar
        />
      </Canvas>
    </div>
  )
}
