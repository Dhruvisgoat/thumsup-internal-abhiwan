import React, { useRef, useContext, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from "@react-three/drei";
import { MyContext } from './RefContext/Context';
import { ViewContext } from './RefContext/ViewContext';
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'
import { useGraph } from '@react-three/fiber';
import { Camera } from 'three';
import { DirectionContext } from './RefContext/DirectionContext';

// const { playerRef, directionRef, intersectionPointRef,directionState } = useContext(MyContext);
export function Character4(props) {
    const { playerRef, directionRef, intersectionPointRef, skinnedMeshRef, originalMaterialRef, jumpRef } = useContext(MyContext);
    const { viewMode } = useContext(ViewContext);
    const { isPlayerDied } = useContext(DirectionContext);

    const group = React.useRef()
    // const { scene, animations } = useGLTF('/models/characters/Boy with all animations-transformed.glb')
    const { scene, animations } = useGLTF('/models/characters/thumsboyblue-transformed.glb')
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes, materials } = useGraph(clone)
    const { actions } = useAnimations(animations, group)

    // console.log('character rendered')
    const [, get] = useKeyboardControls();

    // Ref to keep track of the character's current rotation
    const rotationRef = useRef([0, Math.PI, 0]);

    // Ref to store the previous translation to compare with the current one
    const prevPositionRef = useRef({ x: 0, y: 0, z: 0 });

    // console.log('character re renderd');

    //adding forward , backward, left, right distances 

    const [coordinates, setCoordinates] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            // console.log('actions');
            // console.log(actions);
            if (playerRef.current) {

                const x = parseFloat(playerRef.current.translation().x) || 0;
                const y = parseFloat(playerRef.current.translation().y) || 0;
                const z = parseFloat(playerRef.current.translation().z) || 0;
                // setCoordinates({ x, y, z });
            }
        }, 100); // Update every 100 milliseconds

        return () => clearInterval(interval);
    }, [playerRef, intersectionPointRef]);

    const cameraDirection = new THREE.Vector3();


    useEffect(() => {
        rotationRef.current = [0, Math.PI, 0]; // Facing forward
    }, [isPlayerDied])


    useEffect(() => {
        if (group.current) {
            group.current.rotation.y = Math.PI; // Face forward initially
        }
    }, [isPlayerDied]);

    useFrame((state) => {
        const { forward, backward, left, right, jump } = get();

        // Get rotation from the player's movement direction
        if (group.current && playerRef.current) {
            const velocity = playerRef.current.linvel();
            const speed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2); // Calculate overall speed

            // Dynamically adjust animation speed based on velocity
            const animationSpeed = speed * 0.03; // Scale down velocity for animation timeScale
            Object.values(actions).forEach(action => {
                if (action) action.timeScale = animationSpeed || 1; // Default to 1 if speed is zero
            });

            const isMoving = Math.abs(velocity.x) > 0.1 || Math.abs(velocity.z) > 0.1;

            if (isMoving && !isPlayerDied) {
                const angle = Math.atan2(velocity.x, velocity.z);
                group.current.rotation.y = angle - Math.PI / 4;
            }
        }

        if (jumpRef.current || jump) {
            actions["Run"].stop();
            actions["Jump"].setLoop(THREE.LoopOnce).reset().play();
        } else {
            actions["Run"].play();
        }
    });


    return (
        <>

            <group ref={group} {...props} dispose={null} scale={[10, 10, 10]} position={[0, -3.5, 0]} >
                {/* <group name="Scene">
                    <group name="Armature003" >
                        <primitive object={nodes.mixamorigHips} />
                        <skinnedMesh ref={skinnedMeshRef} name="model_0021" geometry={nodes.model_0021.geometry} material={materials['Material.038']} skeleton={nodes.model_0021.skeleton} />
                        <skinnedMesh name="model_0022" geometry={nodes.model_0022.geometry} material={materials['Material.040']} skeleton={nodes.model_0022.skeleton} />
                        <skinnedMesh name="model_0023" geometry={nodes.model_0023.geometry} material={materials['Material.001']} skeleton={nodes.model_0023.skeleton} />
                        <skinnedMesh name="model_0024" geometry={nodes.model_0024.geometry} material={materials['Material.039']} skeleton={nodes.model_0024.skeleton} />
                        <skinnedMesh name="model_0025" geometry={nodes.model_0025.geometry} material={materials['Material.026']} skeleton={nodes.model_0025.skeleton} />
                        <skinnedMesh name="model_0026" geometry={nodes.model_0026.geometry} material={materials['Material.027']} skeleton={nodes.model_0026.skeleton} />
                        <skinnedMesh name="model_0027" geometry={nodes.model_0027.geometry} material={materials['Material.028']} skeleton={nodes.model_0027.skeleton} />
                    </group>
                </group> */}
                <group name="Scene">
                    <group name="Armature003" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                        <primitive object={nodes.mixamorigHips} />
                        <skinnedMesh name="model_0022" ref={skinnedMeshRef}
                            geometry={nodes.model_0022.geometry}
                            material={materials['Material.003']}
                            skeleton={nodes.model_0022.skeleton} />
                    </group>
                </group>
            </group>
        </>
    );
}

useGLTF.preload('/models/characters/Boy with all animations-transformed.glb');
