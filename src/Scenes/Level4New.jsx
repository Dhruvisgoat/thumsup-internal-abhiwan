import React, { useRef, useContext, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';
import { MyContext } from '../RefContext/Context';
import { CuboidCollider } from '@react-three/rapier';

function Level4New({ displayBlockers = false }) {
    const { piyushMazeRef } = useContext(MyContext);

    useEffect(() => {
        if (piyushMazeRef.current) {
            piyushMazeRef.current.traverse((child) => {
                if (child.isMesh) {
                    if (!displayBlockers) {
                        child.material.transparent = true;
                        child.material.opacity = 0; // Make the mesh invisible
                        child.material.depthWrite = false;
                    }
                }
            });
        }
    }, [piyushMazeRef]);

    // console.log('maze Rerendered');

    const Model = ({ props }) => {
        const { scene: scene1 } = useGLTF('/models/Scene/411o3-transformed.glb'); // Update with your model path
        const { scene: scene2 } = useGLTF('/models/Scene/map4 blockades.glb'); // Update with your model path

        return (
            <>
                <group rotation={[0, Math.PI / 4, 0]}>
                    <RigidBody colliders={"trimesh"} type="fixed" >
                        <primitive ref={piyushMazeRef}  {...props} object={scene2.clone()} scale={[7, 10, 7]} position={[0, -5, 0]} material={null} />
                    </RigidBody>
                    <primitive  {...props} object={scene1.clone()} scale={[7, 7, 7]} material={null}
                        // position={[0, -5, 0]}
                        position={[5, -5, -10]}
                        rotation={[0, Math.PI / 4 * 4, 0]}
                    />
                </group>
                <CuboidCollider args={[300, 2, 300]} />
            </>
        );
    }
    return (
        <Model />
    )
}

useGLTF.preload('/models/Scene/411o3-transformed.glb')

export default Level4New

