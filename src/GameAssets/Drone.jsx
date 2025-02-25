import React from 'react'
import { useGLTF } from '@react-three/drei'

function Drone(props) {
    const { scene } = useGLTF('/models/updatedGameAssets/Drone-transformed.glb')

    return (
        <>
            <primitive {...props} object={scene.clone()} />
        </>
    )
}

export default Drone

useGLTF.preload('/models/updatedGameAssets/Drone-transformed.glb')