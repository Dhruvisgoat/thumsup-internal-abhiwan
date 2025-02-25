import React from 'react'
import { useGLTF } from '@react-three/drei'

function Truck(props) {
    const { scene } = useGLTF('/models/updatedGameAssets/gadi-transformed.glb')

    return (
        <group {...props} scale={[4.6, 8, 3.6]} rotation={[0, -5 * Math.PI / 4, 0]} >
            <primitive object={scene.clone()} />
        </group>
    )
}

export default Truck

useGLTF.preload('/models/updatedGameAssets/truck-transformed.glb')