import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Drink_Combo(props) {
  const { nodes, materials } = useGLTF('/models/gameAssets/Drink Combo-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} >
        <mesh geometry={nodes.Mesh033.geometry} material={materials['Material.008']} />
        <mesh geometry={nodes.Mesh033_1.geometry} material={materials['curve wall.003']} />
        <mesh geometry={nodes.Mesh033_2.geometry} material={materials['soda.002']} />
        <mesh geometry={nodes.Mesh033_3.geometry} material={materials['Assets_COMBINED:aiStandardSurface3.003']} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/gameAssets/Drink Combo-transformed.glb')
