"use client"

import { useGSAP } from "@gsap/react"
import HeroScene from "../3D/scenes/HeroScene"
import gsap from "gsap"
import { Pointer } from "lucide-react"
import { useEffect, useState } from "react"

export default function Hero() {
  const [showPointer, setShowPointer] = useState(true)

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setShowPointer(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fade-in animation for the hero section
  useGSAP(() => {
    gsap.fromTo(
      "#hero",
      { opacity: 0 },
      { opacity: 1, duration: 1.3, delay: 0.3, ease: "power1.inOut" },
    )

    gsap.fromTo(
      "#draggable-indicator",
      { opacity: 0 },
      { opacity: 1, delay: 2 },
    )
  })

  const handleDrag = () => {
    setShowPointer(false)
  }

  return (
    <div
      className="flex h-dvh w-full flex-col items-center justify-around py-12"
      id="hero"
    >
      <h1 className="text-4xl font-semibold drop-shadow-xl">Arte 3D</h1>

      <HeroScene ondrag={handleDrag} />

      <div className="absolute top-3/4 flex flex-col items-center gap-2">
        <Pointer
          className={`animate-draggable-indicator transition-all duration-300 ease-in-out ${showPointer ? "scale-100" : "scale-0"}`}
          color="gray"
          id="draggable-indicator"
        />
      </div>

      <p>Volume & Conceito</p>
    </div>
  )
}
