"use client"
import Hero from "@/components/layout/Hero"
import ShowCase from "@/components/layout/ShowCase"
import { Html, useProgress } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useEffect, useState } from "react"

// 🔹 Componente de Loading separado
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
    <main className="z-40">
      <article className="relative">
        <Hero />
        <ShowCase />
      </article>
      <div className="mt-32 h-dvh text-6xl">olá</div>
    </main>
  )
}
