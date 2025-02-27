import React from 'react'
import { RigidBody } from '@react-three/rapier';
import { useGLTF } from "@react-three/drei";
import { CuboidCollider } from '@react-three/rapier';
import { Drink_Combo } from '../GameAssets/Drink_Combo';

const DrinkCombo = ({ position, ...props }) => {

    // const { scene } = useGLTF('models/updatedGameAssets/Single_bottle-transformed.glb')
    const { scene } = useGLTF('models/updatedGameAssets/doublethumsup-transformed.glb')

    return (
        <>
            <group position={position} rotation={[0, Math.PI / 4, 0]} {...props}>
                <primitive position={[0, -3, 0]} {...props} object={scene.clone()} scale={1.3} />
                {/* <Drink_Combo scale={0.04} position={[0, -2, 0]} /> */}
            </group>

        </>
    );
}


export default DrinkCombo