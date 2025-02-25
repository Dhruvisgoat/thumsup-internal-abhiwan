import React, { useRef, useContext, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';
import { MyContext } from '../RefContext/Context';
import { CuboidCollider } from '@react-three/rapier';

function Map({ displayBlockers = false }) {
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
        const { scene: scene1 } = useGLTF('/models/Scene/map811-transformed.glb'); // Update with your model path

        const { scene: scene2 } = useGLTF('/models/Scene/Final level blockades (12_11).glb'); // Update with your model path

        return (
            <>
                <group rotation={[0, Math.PI / 4, 0]}>
                    <RigidBody colliders={"trimesh"} type="fixed" >
                        {/* <primitive ref={piyushMazeRef}  {...props} object={scene2.clone()} scale={[7, 20, 7]} material={null} */}
                        <primitive ref={piyushMazeRef}  {...props} object={scene2.clone()} scale={[7, 20, 7]} material={null}
                            // position={[5, -5, -10]}
                            position={[5, -15, -10]}
                            rotation={[0, -Math.PI / 4 * 4, 0]}
                        />
                    </RigidBody>
                    <primitive  {...props} object={scene1.clone()} scale={[7, 7, 7]} material={null}
                        // position={[0, -5, 0]}
                        position={[5, -5, -10]}
                        rotation={[0, Math.PI / 4 * 4, 0]}
                    />

                    {/* <Instances>
                        {(instances) => (
                            <InstancedScene instances={instances} scale={[7, 7, 7]} material={null}
                                position={[5, -5, -10]}
                                rotation={[0, Math.PI / 4 * 4, 0]} />
                        )}
                    </Instances> */}

                </group>

                <CuboidCollider args={[300, 1, 300]} position={[0, 7, 0]} />
                <CuboidCollider args={[300, 1, 300]} position={[0, -4, 0]} />
                <CuboidCollider args={[300, 1, 300]} position={[0, -10, 0]} />
                {/* <CuboidCollider args={[300, 10, 300]} /> */}
            </>
        );
    }
    return (
        <Model />
    )
}

useGLTF.preload('/models/updatedGameAssets/model1211-transformed.glb')

export default Map

