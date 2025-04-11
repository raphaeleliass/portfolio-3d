"use client"

import { useMemo } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import ShipInClouds from "../3D/models/ShipInClouds"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import OldHouse from "../3D/models/OldHouse"

useGLTF.preload("/models/places/ship_in_clouds.glb")
useGLTF.preload("/models/places/old_house.glb")

export default function Gallery() {
  const landModels = useMemo(
    () => [
      {
        model: <ShipInClouds />,
      },
      {
        model: <OldHouse />,
      },
    ],
    [],
  )

  return (
    <section className="flex min-h-dvh w-full max-w-xs flex-col items-center justify-center gap-14 text-left lg:max-w-4xl">
      <p className="mr-auto text-xl">
        é o caos que sussurra ordem, <br /> o vazio que transborda sentido,
      </p>

      <Carousel className="w-full" opts={{ watchDrag: false }}>
        <CarouselContent className="">
          {landModels.map((model, index) => (
            <CarouselItem
              className="relative aspect-video overflow-hidden shadow-lg lg:basis-2/3"
              key={index}
            >
              <Canvas camera={{ position: [0, 0, 1], fov: 60 }}>
                <directionalLight position={[1, 2, 3]} intensity={1} />
                {model.model}
                <OrbitControls
                  enableZoom={false}
                  maxPolarAngle={2}
                  minPolarAngle={1}
                />
              </Canvas>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}
