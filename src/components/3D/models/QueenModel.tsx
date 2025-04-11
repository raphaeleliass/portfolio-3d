"use client"
import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { Box3, LoopPingPong, Vector3, Object3D } from "three"

export default function QueenModel() {
  // ref
  const modelRef = useRef<Object3D>(null)

  // importa o modelo e a animação
  const { scene, animations } = useGLTF(
    "/models/characters/the_queen_of_swords.glb",
  )
  const { actions } = useAnimations(animations, scene)

  // obtem valores de width e height do dispositivo
  // const { viewport, size } = useThree()
  // const posY = size.height < 700 ? -1.2 : -1.5

  useEffect(() => {
    // executa as animações
    Object.values(actions).forEach((action) => {
      if (!action) return

      action.setLoop(LoopPingPong, Infinity)
      action.reset().play()
    })

    // centraliza o modelo
    if (!modelRef.current) return
    const box = new Box3().setFromObject(modelRef.current)
    const center = box.getCenter(new Vector3())
    modelRef.current.position.sub(center)
  }, [scene, actions])

  return (
    <group >
      <mesh>
        <primitive rotation={[0, Math.PI, 0]} object={scene} ref={modelRef} />
      </mesh>
    </group>
  )
}
