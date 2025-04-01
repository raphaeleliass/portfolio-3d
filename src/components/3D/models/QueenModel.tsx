"use client"
import { useAnimations, useGLTF } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { Box3, LoopPingPong, Vector3, Object3D } from "three"

export default function QueenModel() {
  const [positionModel, setPositionModel] = useState<[number, number, number]>()

  // ref
  const modelRef = useRef<Object3D>(null)

  // importa o modelo e a animação
  const { scene, animations } = useGLTF(
    "/models/characters/the_queen_of_swords.glb",
  )
  const { actions } = useAnimations(animations, scene)

  // obtem valores de width e height do dispositivo
  const { viewport, size } = useThree()
  const posY = size.height < 700 ? -1.2 : -1.5

  useEffect(() => {
    // define a posição fixa do modelo
    setPositionModel([0, posY, 0])

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
  }, [scene, actions, posY])

  return (
    <group
      scale={Math.min(viewport.width, viewport.height) / 150}
      position={positionModel}
    >
      <mesh>
        <primitive rotation={[0, 0, 0]} object={scene} ref={modelRef} />
      </mesh>
    </group>
  )
}
