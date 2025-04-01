import { useGLTF } from "@react-three/drei"

export default function ShipInClouds() {
  const { scene } = useGLTF("/models/places/ship_in_clouds.glb")

  return (
    <group position={[0, 0, 2]}>
      <primitive object={scene} />
    </group>
  )
}
