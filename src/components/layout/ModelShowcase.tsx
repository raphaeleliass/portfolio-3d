import { useGSAP } from "@gsap/react"
import ShowScene from "../3D/scenes/ShowScene"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

export default function ModelShowcase() {
  const modelRef = useRef<HTMLDivElement>(null)
  const subsectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (
      !modelRef.current ||
      !subsectionRef.current ||
      !titleRef.current ||
      !textRef.current
    )
      return

    const timeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: subsectionRef.current,
          start: "top 20%",
          end: "center center",
        },
      })
      .fromTo(modelRef.current, { opacity: 0 }, { opacity: 1 })
      .fromTo(textRef.current, { opacity: 0 }, { opacity: 1 })
      .fromTo(titleRef.current, { opacity: 0 }, { opacity: 1 })

    return () => {
      timeline.scrollTrigger?.kill()
      timeline.kill()
    }
  })

  return (
    <section
      className="relative flex h-dvh min-h-dvh flex-col items-center justify-around"
      ref={subsectionRef}
    >
      <div
        className="flex h-full w-full flex-col items-center justify-center"
        ref={modelRef}
      >
        <p className="text-xl" ref={textRef}>
          Arte pode ser...
        </p>

        <ShowScene />

        <h2 className="text-lg" ref={titleRef}>
          Abstrata
        </h2>
      </div>
    </section>
  )
}
