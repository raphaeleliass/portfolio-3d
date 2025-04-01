import { useGLTF } from "@react-three/drei"
import React from "react"

export default function OldHouse() {
  const { scene } = useGLTF("/models/places/old_house.glb")

  return (
    <group position={[0, 0, -6]}>
      <primitive object={scene} />
    </group>
  )
}
