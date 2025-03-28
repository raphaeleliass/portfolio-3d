import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import QueenModel from "./QueenModel"
import BustModel from "./BustModel"
import SkullModel from "./SkullModel"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

useGLTF.preload("/models/the_queen_of_swords.glb")
useGLTF.preload("/models/rhetorician.glb")
useGLTF.preload("/models/skull.glb")

const subsections = ["#subsection1", "#subsection2", "#subsection3"]

export default function ShowScene() {
  const divQueenRef = useRef<HTMLDivElement>(null)
  const divBustRef = useRef<HTMLDivElement>(null)
  const divSkullRef = useRef<HTMLDivElement>(null)

  const models = [
    {
      model: <QueenModel />,
      ref: divQueenRef,
    },
    {
      model: <BustModel />,
      ref: divBustRef,
    },
    {
      model: <SkullModel />,
      ref: divSkullRef,
    },
  ]

  useGSAP(() => {
    if (!divQueenRef.current) return

    gsap.fromTo(
      divQueenRef.current,
      { x: "100vw" }, // Posição inicial
      {
        x: "0vw",
        ease: "power3.inOut",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#subsection1",
          start: "center bottom",
          end: "center top",
          scrub: true,
          invalidateOnRefresh: true, // 🔥 Evita resets inesperados
        },
      },
    )

    gsap.to(divQueenRef.current, {
      x: "-100vw",
      scrollTrigger: {
        trigger: "#subsection3",
        start: "center bottom",
        end: "center top",
        scrub: true,
        toggleActions: "play none none none",
        invalidateOnRefresh: true, // 🔥 Mantém a posição correta
      },
    })
  }, [])

  return (
    <>
      {models.map((model, index) => (
        <div
          id={`model-${index}`}
          className={`fixed top-0 left-0 z-50 h-dvh w-full bg-purple-300/40 backdrop-blur-sm ${index !== 0 && "hidden"}`}
          ref={model.ref}
          key={index}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <directionalLight position={[1, 0, 0]} intensity={4} />
            <ambientLight intensity={2} />

            {model.model}

            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      ))}
    </>
  )
}
