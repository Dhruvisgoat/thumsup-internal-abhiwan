import React from 'react'
import { RigidBody } from '@react-three/rapier';
import { useGLTF } from "@react-three/drei";
import { CuboidCollider } from '@react-three/rapier';
import { Biryani_Drink_combo } from '../GameAssets/Biryani_Drink_combo';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Combo = ({ position, ...props }) => {

    const { scene } = useGLTF('models/updatedGameAssets/Combo-transformed.glb')

    const texture = useLoader(TextureLoader, `thumsupAssetsImages/combo.png`)


    return (
        <>
            <group position={position} rotation={[0, Math.PI / 4, 0]} >
                {/* <primitive position={[0, -1, 0]}  object={scene.clone()} scale={70} /> */}
                <sprite scale={10}>
                    <spriteMaterial attach="material" map={texture} />
                </sprite>
            </group>
        </>
    );
}


export default Combo

