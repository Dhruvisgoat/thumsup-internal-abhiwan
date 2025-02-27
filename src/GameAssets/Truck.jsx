
import React from 'react'
import { useGLTF } from '@react-three/drei'

function Truck({ truckUrl, ...props }) {
    const { scene } = useGLTF(truckUrl)

    return (
        <group {...props} scale={[4.6, 8, 3.6]} rotation={[0, -5 * Math.PI / 4, 0]} >
            <primitive object={scene.clone()} />
        </group>
    )
}

export default Truck

useGLTF.preload('/models/updatedGameAssets/Gadi01-transformed.glb')