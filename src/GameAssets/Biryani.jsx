import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Biryani(props, index) {
  const { nodes, materials, scene } = useGLTF('/models/updatedGameAssets/biryaniPlate-transformed.glb')

  return (

    <group {...props} dispose={null}>
      <primitive object={scene.clone()} scale={200} position={[0, -5, 0]} />
    </group>
  )
}

useGLTF.preload('/models/gameAssets/biryani-bowl-transformed.glb')
