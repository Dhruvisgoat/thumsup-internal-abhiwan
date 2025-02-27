/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 Delivery Boy1.glb -T 
Files: Delivery Boy1.glb [3.38MB] > C:\Users\ADMIN\Downloads\Delivery Boy1-transformed.glb [152.66KB] (95%)
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function DeliveryBoy(props) {

    const { nodes, materials, scene } = useGLTF('/models/updatedGameAssets/bycycle-transformed.glb')

    return (
        // <primitive  {...props} dispose={null} scale={[15,8,10]} rotation={[0, 3*Math.PI/4, 0]} position={[0, -4, 0]} object={scene.clone()} />
        <primitive  {...props} dispose={null} scale={[1, 1, 1]} rotation={[0, Math.PI / 4, 0]} position={[0, -3, 0]} object={scene.clone()} />
    )
}

useGLTF.preload('/models/updatedGameAssets/DeliveryBoy1-transformed.glb')
