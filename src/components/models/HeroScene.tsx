"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import {
  ContactShadows,
  MeshTransmissionMaterial,
  Text,
} from "@react-three/drei"
import { useRef } from "react"
import { Object3D } from "three"
import { useThree } from "@react-three/fiber"
// import { useControls } from "leva"

export default function HeroScene() {
  const Torus = () => {
    const groupRef = useRef<Object3D>(null)

    // const materialProps = useControls(
    //   {
    //     thickness: { value: 0.45, min: 0, max: 3, step: 0.05 },
    //     roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    //     transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    //     ior: { value: 2.9, min: 0, max: 3, step: 0.1 },
    //     chromaticAberration: { value: 0.91, min: 0, max: 1 },
    //     backside: { value: true },
    //   },
    //   { hidden: true },
    //   { collapsed: true },
    // )

    const { viewport } = useThree()

    useFrame(() => {
      if (!groupRef.current) return

      groupRef.current.rotation.x += 0.01
      groupRef.current.rotation.y += 0.01
    })

    return (
      <group scale={viewport.width / 4}>
        <Text
          font="/font/cinzel.ttf"
          color={"#A1A1A1"}
          position={[0, 0, -1]}
          scale={0.3}
        >
          Volume & Conceito
        </Text>
        <mesh ref={groupRef} position={[0, 0, -2]} scale={0.4}>
          <torusGeometry args={[1, 0.5, 35, 100]} />
          <MeshTransmissionMaterial
            transparent
            chromaticAberration={0.91}
            transmission={1}
            thickness={0.45}
            roughness={0}
            ior={2.9}
            backside
          />
        </mesh>
      </group>
    )
  }

  return (
    <div className="absolute inset-0">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 60 }}>
        <directionalLight intensity={3} position={[0, 3, 2]} />
        <Torus />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.2} />
      </Canvas>
    </div>
  )
}
