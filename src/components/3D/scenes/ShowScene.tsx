// gsap imports
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// modelos 3d
import QueenModel from "../models/QueenModel"

// fiber && drei imports
import { Canvas } from "@react-three/fiber"
import {
  ContactShadows,
  Float,
  OrbitControls,
  useGLTF,
} from "@react-three/drei"

// registro do plugin scrolltrigger
gsap.registerPlugin(ScrollTrigger)

// pré-carregamento dos modelos 3d
useGLTF.preload("/models/characters/the_queen_of_swords.glb")

export default function ShowScene() {
  return (
    <div className="h-2/3">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <directionalLight position={[1, 5, 1]} intensity={4} />
        <ambientLight intensity={3} />
        <Float speed={5} rotationIntensity={0.2} floatIntensity={0.5}>
          <QueenModel />
        </Float>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={1.5}
          minPolarAngle={1.5}
        />

        <ContactShadows position={[0, -2.5, 0]} opacity={0.3} blur={3} />
      </Canvas>
    </div>
  )
}
