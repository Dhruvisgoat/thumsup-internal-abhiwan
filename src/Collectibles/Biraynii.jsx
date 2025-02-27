import React from 'react'
import { RigidBody } from '@react-three/rapier';
import { useGLTF } from "@react-three/drei";
import { CuboidCollider } from '@react-three/rapier';
import { Biryani } from '../GameAssets/Biryani';

const Biryanii = ({ index, position, ...props }) => {

    return (
        <>
            <group {...props} position={position} rotation={[0, Math.PI / 4, 0]}>
                <Biryani index={index} scale={0.6} position={[0, -3, 0]} />
                <CuboidCollider args={[0.5, 2, 0.5]} />
            </group>
        </>
    );
}


export default Biryanii

