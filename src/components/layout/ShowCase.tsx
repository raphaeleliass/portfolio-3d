"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ShowScene from "../models/ShowScene"

export default function ShowCase() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to("#frame", {
      position: "fixed",
      y: 30,
      opacity: 1,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: "#hero",
        start: "30% top",
        end: "70% top",
        scrub: true,
        toggleActions: "play none none reverse",
      },
    })
  })

  return (
    <section
      className="relative flex min-h-dvh flex-col items-center justify-center"
      id="section1"
    >
      <div
        className="top-1/5 h-1/2 w-2/3 border-2 border-zinc-700 bg-transparent opacity-0 lg:top-1/8 lg:h-2/3 lg:w-1/3"
        id="frame"
      />

      <div className={`h-dvh w-full bg-blue-300`} id={`subsection1`}>
        #subsection2
      </div>
      <div className={`h-dvh w-full bg-green-300`} id={`subsection2`}>
        #subsection2
      </div>
      <div className={`h-dvh w-full bg-red-300`} id={`subsection3`}>
        #subsection2
      </div>

      <ShowScene />
    </section>
  )
}
