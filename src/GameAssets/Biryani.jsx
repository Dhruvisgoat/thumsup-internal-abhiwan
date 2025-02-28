import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';


export function Biryani(props) {

  const texture = useMemo(() => useLoader(TextureLoader, `thumsupAssetsImages/biryanis/biryani${props.index + 1}.png`), []);

  const { nodes, materials, scene } = useGLTF(`/models/updatedGameAssets/biryani${props.index + 1}-transformed.glb`)

  return (
    <group {...props} dispose={null}>
      {/* <primitive object={scene.clone()} scale={200} position={[-12, -5, 0]} /> */}
      <sprite scale={13}>
        <spriteMaterial attach="material" map={texture} />
      </sprite>
    </group>
  )
}

useGLTF.preload('/models/gameAssets/biryani-bowl-transformed.glb')
