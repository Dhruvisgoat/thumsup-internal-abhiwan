import React, { useState, useEffect } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useGLTF } from "@react-three/drei";
import { CuboidCollider } from '@react-three/rapier';
import { Bottle } from '../GameAssets/Bottle';
import DieSprite from '../Sprites/DieSprite';

const CocaCola = ({ position, ...props }) => {
    // const { scene } = useGLTF('/models/gameAssets/BottleNew.glb'); // Update with your model path
    const [showDieSprite, setShowDieSprite] = useState(false);
    const { scene } = useGLTF('models/updatedGameAssets/Single_bottle-transformed.glb')

    return (
        <>
            <group {...props} position={position} rotation={[0, Math.PI / 4, 0]} scale={1}>
                <primitive object={scene.clone()} position={[0, -3, 0]} scale={1.2} />
                {/* <Bottle scale={100} position={[0, 0, 0]} /> */}
                {/* <CuboidCollider args={[0.5, 2, 0.5]} /> */}
            </group>
            {/* <DieSprite position={position} /> */}
        </>
    );
}

useGLTF.preload('/models/gameAssets/coca_cola_bottle.glb');

export default CocaCola;
