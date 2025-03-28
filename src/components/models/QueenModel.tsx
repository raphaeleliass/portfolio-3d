import { useAnimations, useGLTF } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"
import { Box3, LoopPingPong, Vector3, Object3D } from "three"

export default function QueenModel() {
  // ref
  const modelRef = useRef<Object3D>(null)

  // importa o modelo e a animação
  const { scene, animations } = useGLTF("/models/the_queen_of_swords.glb")
  const { actions } = useAnimations(animations, scene)

  // obtem valores de width e height do dispositivo
  const { viewport, size } = useThree()

  const yPos = size.width < 700 ? -0.7 : -1.5

  useEffect(() => {
    // executa as animações
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

  // animação de scroll
  useEffect(() => {
    if (!modelRef.current) return

    const model = modelRef.current

    gsap.registerPlugin(ScrollTrigger)

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#subsection1",
          start: "center bottom",
          end: "center top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      .to(model.rotation, { y: 0, ease: "power3.inOut" })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#subsection2",
          start: "center bottom",
          end: "center top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      .to(model.rotation, { y: -5, ease: "power3.inOut" })
  }, [modelRef])

  return (
    <group
      scale={Math.min(viewport.width, viewport.height) / 250}
      position={[0, yPos, 0]}
    >
      <primitive rotation={[0, 5, 0]} object={scene} ref={modelRef} />
    </group>
  )
}
