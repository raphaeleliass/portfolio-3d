"use client"

import { useGSAP } from "@gsap/react"
import HeroScene from "../models/HeroScene"
import gsap from "gsap"

export default function Hero() {
  useGSAP(() => {
    gsap.fromTo(
      "#hero",
      { opacity: 0 },
      { opacity: 1, duration: 1.3, delay: 0.3, ease: "power1.inOut" },
    )
  })
  return (
    <div
      className="relative h-dvh place-content-center justify-items-center"
      id="hero"
    >
      <HeroScene />
    </div>
  )
}
