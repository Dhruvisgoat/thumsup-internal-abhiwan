import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Biker(props) {

    const { nodes, materials, scene } = useGLTF('/models/updatedGameAssets/deliveryBoyNew-transformed.glb')

    return (
        <primitive  {...props} dispose={null} scale={10} rotation={[0, 3*Math.PI / 4, 0]} position={[0, 0, 0]} object={scene.clone()} />
    )
}

// useGLTF.preload('/models/updatedGameAssets/DeliveryBoy1-transformed.glb')
