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

// const { playerRef, directionRef, intersectionPointRef,directionState } = useContext(MyContext);
export function Character3(props) {
    const { playerRef, directionRef, intersectionPointRef, skinnedMeshRef, originalMaterialRef, jumpRef } = useContext(MyContext);
    const { viewMode } = useContext(ViewContext);

    const group = React.useRef()
    // const { scene, animations } = useGLTF('/models/characters/Boy with all animations-transformed.glb')
    const { scene, animations } = useGLTF('/models/characters/newMan-transformed.glb')
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
            console.log('actions');
            console.log(actions);
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


    useFrame((state) => {

        const { forward, backward, left, right, jump } = get();
        const currentPosition = playerRef.current.translation();

        // Adjust the rotation based on the input
        // if (forward|| directionRef.current === 'Up') {
        //   rotationRef.current = [0, Math.PI, 0]; // Facing forward
        // } else if (backward || directionRef.current === 'Down') {
        //   rotationRef.current = [0, 0, 0]; // Facing backward
        // } else if (left || directionRef.current === 'Left') {
        //   rotationRef.current = [0, -Math.PI / 2, 0]; // Facing left
        // } else if (right || directionRef.current === 'Right') {
        //   rotationRef.current = [0, Math.PI / 2, 0]; // Facing right
        // }

        const forwardDistance = intersectionPointRef.current?.forward ? Math.sqrt(Math.pow(intersectionPointRef.current?.forward?.x - playerRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.forward.y - playerRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.forward.z - playerRef.current?.translation().z, 2)).toFixed(1) : 'N/A';
        const isForwardDistanceGreaterThan3 = forwardDistance === 'N/A' || parseFloat(forwardDistance) > 7;
        // const isForwardDistanceGreaterThan3 = forwardDistance === 'N/A' || parseFloat(forwardDistance) > 5;
        const backwardDistance = intersectionPointRef.current?.backward ? Math.sqrt(Math.pow(intersectionPointRef.current?.backward.x - playerRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.backward.y - playerRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.backward.z - playerRef.current?.translation().z, 2)).toFixed(1) : 'N/A';
        const isBackwardDistanceGreaterThan3 = backwardDistance === 'N/A' || parseFloat(backwardDistance) > 7;
        // const isBackwardDistanceGreaterThan3 = backwardDistance === 'N/A' || parseFloat(backwardDistance) > 5;
        const leftDistance = intersectionPointRef.current?.left ? Math.sqrt(Math.pow(intersectionPointRef.current?.left.x - playerRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.left.y - playerRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.left.z - playerRef.current?.translation().z, 2)).toFixed(1) : 'N/A';
        const isLeftDistanceGreaterThan3 = leftDistance === 'N/A' || parseFloat(leftDistance) > 7;
        // const isLeftDistanceGreaterThan3 = leftDistance === 'N/A' || parseFloat(leftDistance) > 5;
        const rightDistance = intersectionPointRef.current?.right ? Math.sqrt(Math.pow(intersectionPointRef.current?.right.x - playerRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.right.y - playerRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.right.z - playerRef.current?.translation().z, 2)).toFixed(1) : 'N/A';
        const isRightDistanceGreaterThan3 = rightDistance === 'N/A' || parseFloat(rightDistance) > 7;
        // const isRightDistanceGreaterThan3 = rightDistance === 'N/A' || parseFloat(rightDistance) > 5;


        // if ((forward || directionRef.current === 'Up') && isForwardDistanceGreaterThan3) {
        //     rotationRef.current = [0, Math.PI, 0]; // Facing forward
        // } else if ((backward || directionRef.current === 'Down') && isBackwardDistanceGreaterThan3) {
        //     rotationRef.current = [0, 0, 0]; // Facing backward
        // } else if ((left || directionRef.current === 'Left') && isLeftDistanceGreaterThan3) {
        //     rotationRef.current = [0, -Math.PI / 2, 0]; // Facing left
        // } else if ((right || directionRef.current === 'Right') && isRightDistanceGreaterThan3) {
        //     rotationRef.current = [0, Math.PI / 2, 0]; // Facing right
        // }


        //if view is third person then camera according rotate player
        if (viewMode === '3rd') {
            if (group.current) {
                // Step 1: Get the camera's direction vector
                state.camera.getWorldDirection(cameraDirection);

                // Step 2: Calculate the yaw angle (rotation around the Y-axis)
                const targetRotationY = Math.atan2(cameraDirection.x, cameraDirection.z);

                // Step 3: Set the player's rotation to align with the camera's direction
                group.current.rotation.set(0, targetRotationY - Math.PI / 4, 0);
            }
        }


        //else rotate player according to global directions
        else {
            // if ((forward || directionRef.current === 'Up')) {
            //     rotationRef.current = [0, Math.PI, 0]; // Facing forward
            // } else if ((backward || directionRef.current === 'Down')) {
            //     rotationRef.current = [0, 0, 0]; // Facing backward
            // } else if ((left || directionRef.current === 'Left')) {
            //     rotationRef.current = [0, -Math.PI / 2, 0]; // Facing left
            // } else if ((right || directionRef.current === 'Right')) {
            //     rotationRef.current = [0, Math.PI / 2, 0]; // Facing right
            // }


            if ((forward || directionRef.current === 'Up') && isForwardDistanceGreaterThan3) {
                rotationRef.current = [0, Math.PI, 0]; // Facing forward
            } else if ((backward || directionRef.current === 'Down') && isBackwardDistanceGreaterThan3) {
                rotationRef.current = [0, 0, 0]; // Facing backward
            } else if ((left || directionRef.current === 'Left') && isLeftDistanceGreaterThan3) {
                rotationRef.current = [0, -Math.PI / 2, 0]; // Facing left
            } else if ((right || directionRef.current === 'Right') && isRightDistanceGreaterThan3) {
                rotationRef.current = [0, Math.PI / 2, 0]; // Facing right
            }
            // Apply the rotation to the group
            if (group.current) {
                // if (group.current && !isPlayerDied) {
                group.current.rotation.set(...rotationRef.current);
            }
        }


        // stop animation and play idle animation  when collision distance in the direction 
        //which it is moving is less than 2 else play the running animation 

        // if (true)

        actions["Armature.001|mixamo.com|Layer0"].play();

        // if (jumpRef.current || jump) {
        //     actions["Run"].stop();
        //     actions["Jump"].setLoop(THREE.LoopOnce).reset().play();
        // }
        // else {
        //     actions["Run"].play()
        // }


    }
    );

    return (
        <>

            <group ref={group} {...props} dispose={null} scale={[8, 6, 7]} position={[0, -3.5, 0]} >
                <group name="Scene">
                    <group name="Armature001">
                        <primitive object={nodes.Hips} />
                        <skinnedMesh name="EyeLeft001" geometry={nodes.EyeLeft001.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft001.skeleton} />
                        <skinnedMesh name="EyeRight001" geometry={nodes.EyeRight001.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight001.skeleton} />
                        <skinnedMesh name="Wolf3D_Beard001" geometry={nodes.Wolf3D_Beard001.geometry} material={materials.Wolf3D_Beard} skeleton={nodes.Wolf3D_Beard001.skeleton} />
                        <skinnedMesh name="Wolf3D_Body001" geometry={nodes.Wolf3D_Body001.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body001.skeleton} />
                        <skinnedMesh name="Wolf3D_Hair001" geometry={nodes.Wolf3D_Hair001.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair001.skeleton} />
                        <skinnedMesh name="Wolf3D_Outfit_Bottom001" geometry={nodes.Wolf3D_Outfit_Bottom001.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom001.skeleton} />
                        <skinnedMesh name="Wolf3D_Outfit_Footwear001" geometry={nodes.Wolf3D_Outfit_Footwear001.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear001.skeleton} />
                        <skinnedMesh name="Wolf3D_Outfit_Top001" geometry={nodes.Wolf3D_Outfit_Top001.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top001.skeleton} />
                        <skinnedMesh name="Wolf3D_Head001" geometry={nodes.Wolf3D_Head001.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head001.skeleton} morphTargetDictionary={nodes.Wolf3D_Head001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head001.morphTargetInfluences} />
                        <skinnedMesh name="Wolf3D_Teeth001" geometry={nodes.Wolf3D_Teeth001.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth001.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth001.morphTargetInfluences} />
                    </group>
                </group>
            </group>
        </>
    );
}

useGLTF.preload('/models/characters/newMan-transformed.glb');
