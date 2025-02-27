import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Biryani(props, index) {
  console.log(index);

  const { nodes, materials, scene } = useGLTF(`/models/updatedGameAssets/biryani1-transformed.glb`)

  return (

    <group {...props} dispose={null}>
      <primitive object={scene.clone()} scale={200} position={[-12, -5, 0]} />
    </group>
  )
}

useGLTF.preload('/models/gameAssets/biryani-bowl-transformed.glb')
