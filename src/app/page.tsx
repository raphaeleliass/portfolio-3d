"use client"
import Footer from "@/components/layout/Footer"
import Gallery from "@/components/layout/Gallery"
import Hero from "@/components/layout/Hero"
import ModelShowcase from "@/components/layout/ModelShowcase"
import Shapes from "@/components/layout/Shapes"
import { Html, useProgress } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useEffect, useState } from "react"

const Loader = () => {
  const { progress } = useProgress()
  return (
    <Html className="w-60 space-y-4 text-nowrap" center>
      <p className="w-full text-center transition-all">
        {progress.toFixed(0)}%
      </p>
      <div
        className="h-1 rounded-full bg-black"
        style={{ width: `${progress.toFixed(0)}%` }}
      />
    </Html>
  )
}

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { progress } = useProgress()

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setIsLoaded(true), 500)
    }
  }, [progress])

  if (!isLoaded)
    return (
      <Canvas style={{ height: "100dvh", width: "100vw", color: "#000" }}>
        <Loader />
      </Canvas>
    )

  return (
    <>
      <main className="relative z-40 flex flex-col items-center justify-center gap-32">
        <Hero />
        <ModelShowcase />
        <Shapes />
        <Gallery />
      </main>
      <Footer />
    </>
  )
}
