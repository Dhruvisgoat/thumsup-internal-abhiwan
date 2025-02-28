import React from 'react'
import { useGLTF } from '@react-three/drei'

export function TomatoBiker(props) {

    const { nodes, materials, scene } = useGLTF('/models/updatedGameAssets/tomatoBoy-transformed.glb')

    return (
        <primitive  {...props} dispose={null} scale={[15,10,12]} rotation={[0, 3*Math.PI / 4, 0]} position={[0, 0, 0]} object={scene.clone()} />
    )
}
