import React, { useRef, useContext } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';
import { MyContext } from '../RefContext/Context';
import { CuboidCollider } from '@react-three/rapier';
import { useEffect } from 'react';
import { Level1Environment } from './Level1Environment';
import { Billboard } from '@react-three/drei';
import { Text } from '@react-three/drei';
import * as THREE from 'three'

function PiyushMaze({ displayBlockers = false }) {

  const { piyushMazeRef } = useContext(MyContext);

  const environmentRef = useRef();

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
    // const { scene } = useGLTF('/models/Scene/PiyushMaze.glb'); // Update with your model path
    // const { scene: scene1 } = useGLTF('/models/Scene/level1Blocker.glb'); // Update with your model path
    const { scene: scene2 } = useGLTF('/models/Scene/19octblocker.glb'); // Update with your model path
    const { scene: scene3 } = useGLTF('/models/Scene/19octLevelEnv.glb'); // Update with your model path
    // const { scene: scene4 } = useGLTF('/models/Scene/newisometric.glb'); // Update with your model path

    return (
      <>
        {/* <RigidBody colliders={false} type="fixed" rotation={[0, Math.PI / 4, 0]}> */}
        <group rotation={[0, Math.PI / 4, 0]}>
          {/* <group > */}

          <RigidBody colliders={"trimesh"} type="fixed" >
            {/* <primitive ref={piyushMazeRef} {...props} object={scene1.clone()} scale={[1, 3,1]} position={[0, 1, 0]} material={null} /> */}
            <primitive ref={piyushMazeRef} {...props} object={scene2.clone()} scale={[70,210,70]} position={[0, 1, 0]} material={null} />
          </RigidBody>
          <primitive {...props} object={scene3.clone()} scale={[70,70,70]} position={[0, 1, 0]} material={null} />
          
          {/* this fixes clipping problem */}
          {/* <Level1Environment /> */}

        </group>

        <CuboidCollider args={[300, 2, 300]} />

        {/* </RigidBody> */}
      </>
    );
  }
  return (
    <Model />
  )
}

// useGLTF.preload('/models/Scene/PiyushMaze.glb')
useGLTF.preload('/models/Scene/19octblocker.glb')
useGLTF.preload('/models/Scene/19octLevelEnv.glb')

export default PiyushMaze

