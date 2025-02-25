import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Biryani(props) {
  // const { nodes, materials, scene } = useGLTF('/models/gameAssets/biryani-bowl-transformed.glb')
  const { nodes, materials, scene } = useGLTF('/models/updatedGameAssets/biryaniPlate-transformed.glb')

  return (

    <group {...props} dispose={null}>
      <primitive object={scene.clone()} scale={200} position={[0, -5, 0]} />
      {/* <group position={[0, 0.085, 0]} rotation={[Math.PI / 2, 0, 0]} scale={2}>
        <mesh geometry={nodes.Mesh011.geometry} material={materials.PlateMaterial} />
        <mesh geometry={nodes.Mesh011_1.geometry} material={materials['Material.005']} />
      </group>
      <mesh geometry={nodes.model_0006.geometry} material={materials['Material.008']} position={[8.231, 0.201, -0.027]} rotation={[-2.054, -1.394, 0]} scale={[-0.013, 0.013, 0.013]} /> */}
    </group>
  )
}

useGLTF.preload('/models/gameAssets/biryani-bowl-transformed.glb')
