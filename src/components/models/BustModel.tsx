import { useGSAP } from "@gsap/react"
import { useAnimations, useGLTF } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"
import { Box3, LoopPingPong, Object3D, Vector3 } from "three"

export default function BustModel({ ...props }) {
  const { scene, animations } = useGLTF("/models/rhetorician.glb")
  const { actions } = useAnimations(animations, scene)
  const { viewport, size } = useThree()
  const modelRef = useRef<Object3D>(null)

  const posY = size.width > 700 ? 0 : -0.7

  useEffect(() => {
    // inicia a animação do modelo
    Object.values(actions).forEach((action) => {
      if (!action) return

      action.setLoop(LoopPingPong, Infinity)
      action.reset().play()
    })

    // centraliza o modelo
    const box = new Box3().setFromObject(scene)
    const center = box.getCenter(new Vector3())
    scene.position.sub(center)
  }, [scene, actions, size])

  useGSAP(() => {
    if (!modelRef.current) return

    const model = modelRef.current

    gsap.registerPlugin(ScrollTrigger)
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#subsection2",

          start: "center bottom",
          end: "center top",
          scrub: true,
        },
      })
      .to(model.rotation, { y: 0, ease: "power3.inOut" })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#subsection3",

          start: "center bottom",
          end: "center top",
          scrub: true,
        },
      })
      .to(model.rotation, { y: -5, ease: "power3.inOut" })
  })

  return (
    <group
      {...props}
      scale={Math.min(viewport.width, viewport.height) / 10}
      position={[0, posY, 0]}
    >
      <primitive object={scene} ref={modelRef} rotation={[0, 7, 0]} />
    </group>
  )
}
