"use client"
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import React, { useMemo } from "react"

export default function Shapes() {
  const models = useMemo(
    () => [
      {
        geometry: <boxGeometry args={[2, 2, 2]} />,
        rotation: [1, 0, 1],
      },
      {
        geometry: <sphereGeometry args={[1.5, 100, 100]} />,
        rotation: [0, 0, 0],
      },
      {
        geometry: <coneGeometry args={[1.5, 2, 5]} />,
        rotation: [0, 0, 0],
      },
      {
        geometry: <torusKnotGeometry args={[1, 0.4, 200, 200]} />,
        rotation: [0, 0, 0],
      },
    ],
    [],
  )

  return (
    <section className="relative container mt-32 flex min-h-dvh flex-col items-center justify-center gap-20">
      <h3 className="text-xl">Conceitual</h3>

      {/* Shapes scene mapping */}
      <div className="grid h-full w-full max-w-sm grid-cols-1 gap-14 lg:max-w-4xl lg:grid-cols-2">
        {models.map((model, index) => (
          <div
            className="relative aspect-square rounded bg-gray-300 shadow-lg"
            key={index}
          >
            <div className="absolute inset-0">
              <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <directionalLight intensity={1} position={[1, 1, 5]} />
                <ambientLight intensity={0.5} />
                <Environment preset="sunset" />

                <mesh
                  scale={1.2}
                  rotation={[...model.rotation] as [number, number, number]}
                >
                  {model.geometry}
                  <meshStandardMaterial
                    color={"white"}
                    metalness={1}
                    roughness={1}
                  />
                </mesh>

                <OrbitControls enableZoom={false} maxPolarAngle={1.4} />
                <ContactShadows position={[0, -2, 0]} opacity={0.2} blur={3} />
              </Canvas>
            </div>
          </div>
        ))}

        <p>
          um sopro de intangível poesia,
          <br />
          onde formas se dissolvem em metáforas.
        </p>
      </div>
    </section>
  )
}
