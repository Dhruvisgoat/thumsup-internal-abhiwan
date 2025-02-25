import React, { useRef, useContext, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';
import { MyContext } from '../RefContext/Context';
import { CuboidCollider } from '@react-three/rapier';

function Level3({ displayBlockers = false }) {
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

  console.log('maze Rerendered');

  const Model = ({ props }) => {
    const { scene: scene1 } = useGLTF('/models/Scene/level3final-transformed.glb'); // Update with your model path
    // const { scene: scene1 } = useGLTF('/models/Scene/Level 3try-transformed.glb'); // Update with your model path
    const { scene: scene2 } = useGLTF('/models/Scene/Level 3 blockers 2.glb'); // Update with your model path

    return (
      <>
        <group rotation={[0, Math.PI / 4, 0]}>
          <RigidBody colliders={"trimesh"} type="fixed" >
            <primitive ref={piyushMazeRef} {...props} object={scene2.clone()} scale={[70, 210, 70]} position={[0, -5, 0]} material={null} />
            {/* <primitive ref={piyushMazeRef} {...props} object={scene1.clone()} scale={[70, 70, 70]} position={[0, -5, 0]} material={null} /> */}
          </RigidBody>
          <primitive  {...props} object={scene1.clone()} scale={[70, 70, 70]} position={[0, -5, 0]} material={null} />
        </group>
        <CuboidCollider args={[300, 2, 300]} />
      </>
    );
  }
  return (
    <Model />
  )
}

useGLTF.preload('/models/Scene/level3final -transformed.glb')

export default Level3

