import { useGSAP } from "@gsap/react"
import { useGLTF } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"
import { Box3, Object3D, Vector3 } from "three"

export default function SkullModel({ ...props }) {
  const { scene } = useGLTF("/models/skull.glb")
  const { viewport } = useThree()
  const modelRef = useRef<Object3D>(null)

  useEffect(() => {
    // centraliza o modelo
    const box = new Box3().setFromObject(scene)
    const center = box.getCenter(new Vector3())
    scene.position.sub(center)
  }, [scene])

  useGSAP(() => {
    if (!modelRef.current) return

    const model = modelRef.current

    gsap.registerPlugin(ScrollTrigger)
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#subsection3",
   
          start: "center bottom",
          end: "center top",
          scrub: true,
        },
      })
      .to(model.rotation, { y: 0, ease: "power3.inOut" })
  })

  return (
    <group {...props} scale={Math.min(viewport.width, viewport.height) / 5}>
      <primitive object={scene} ref={modelRef} rotation={[0, 7, 0]} />
    </group>
  )
}
