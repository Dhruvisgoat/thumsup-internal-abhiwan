import React from 'react'
import { useGLTF } from '@react-three/drei'

export function TrafficCone(props) {
  const { scene } = useGLTF('/models/gameAssets/Traffic Cone-transformed.glb')
  return (
    <group position={[0, -4, 0]}>
      <primitive {...props} object={scene.clone()} />
    </group>
  )
}

useGLTF.preload('/models/gameAssets/Traffic Cone-transformed.glb')
