/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 Delivery Boy1.glb -T 
Files: Delivery Boy1.glb [3.38MB] > C:\Users\ADMIN\Downloads\Delivery Boy1-transformed.glb [152.66KB] (95%)
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function DeliveryBoy(props) {
    // const { nodes, materials } = useGLTF('/models/updatedGameAssets/DeliveryBoy1-transformed.glb')
    const { nodes, materials, scene } = useGLTF('/models/updatedGameAssets/delivery-boy-new-transformed.glb')

    return (
        // <group {...props} dispose={null} scale={8} rotation={[0, Math.PI, 0]} position={[0, -4, 0]}>
        //     {/*  <group {...props} dispose={null} scale={14} rotation={[0, Math.PI, 0]} position={[0, -8, 0]}> */}
        //     {/* <group position={[0.129, 0.782, 0.006]} rotation={[Math.PI / 2, 0, -0.629]} scale={0.006}>
        //         <mesh geometry={nodes.model_2001_1.geometry} material={materials['Material.001']} />
        //         <mesh geometry={nodes.model_2001_2.geometry} material={materials['Material.002']} />
        //         <mesh geometry={nodes.model_2001_3.geometry} material={materials['Material.003']} />
        //         <mesh geometry={nodes.model_2001_4.geometry} material={materials['Material.004']} />
        //     </group> */}
        //     <primitive object={scene.clone} />
        // </group>
        <primitive  {...props} dispose={null} scale={[15,8,10]} rotation={[0, 3*Math.PI/4, 0]} position={[0, -4, 0]} object={scene.clone()} />

    )
}

useGLTF.preload('/models/updatedGameAssets/DeliveryBoy1-transformed.glb')
