import React, { useContext, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics } from '@react-three/rapier';
import * as THREE from 'three';
import { MyContext } from '../../RefContext/Context';
import { Environment } from '@react-three/drei';
import { Sky } from '@react-three/drei';
import { DirectionContext } from '../../RefContext/DirectionContext';
import Level4 from '../../Scenes/Map';
import { DirContext } from '../../RefContext/dirContext';

function quaternionToAxisAngleY(x, y, z, w) {
    const length = Math.sqrt(x * x + y * y + z * z + w * w);
    x /= length; y /= length; z /= length; w /= length;
    return y < 0 ? -2 * Math.acos(w) : 2 * Math.acos(w);
}

function RedCube({ position, rotation }) {
    const meshRef = useRef();
    useFrame(() => {
        const playerPosition = position();
        const playerRotation = rotation();
        if (playerPosition && playerRotation) {
            meshRef.current.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
            meshRef.current.rotation.set(0, quaternionToAxisAngleY(playerRotation.x, playerRotation.y, playerRotation.z, playerRotation.w), 0);
        }
    });
    return <mesh ref={meshRef} position={[0, 0, 0]} />;
}

function MiniMapCanvas({ toggleView, far }) {
    const { playerRef } = useContext(MyContext);
    // const { directionState } = useContext(DirectionContext);
    const { directionState } = useContext(DirContext);

    const [direction, setDirection] = useState();

    useEffect(() => {
        if (directionState.x > 0 && directionState.z > 0) {
            setDirection('down');
        } else if (directionState.x < 0 && directionState.z < 0) {
            setDirection('up');
        } else if (directionState.x < 0 && directionState.z > 0) {
            setDirection('left');
        } else if (directionState.x > 0 && directionState.z < 0) {
            setDirection('right');
        } else {
            setDirection('Stationary'); // If neither condition is met
        }
    }, [directionState]);










    // useFrame((state) => {
    //     const playerPosition = playerRef.current?.translation();
    //     if (playerPosition) {
    //         state.camera.position.copy(new THREE.Vector3(playerPosition.x, playerPosition.y + far, playerPosition.z));
    //         state.camera.lookAt(playerPosition);
    //     }
    // });
    //  far = 100;
    // if (toggleView) {
    //     far = 100;
    // }
    // else {
    //     far = 10;
    // }


    let offset = new THREE.Vector3(far * 1.5, far, far * 1.5);

    useFrame((state) => {
        // state.camera.fov = 100;

        if (toggleView) {


            const playerPosition = playerRef.current?.translation();
            if (playerPosition) {
                state.camera.position.copy(new THREE.Vector3(playerPosition.x, playerPosition.y + far, playerPosition.z));
                state.camera.lookAt(playerPosition);
            }
        }

        else {
            const playerPosition = playerRef.current?.translation();
            const playerRotation = playerRef.current?.rotation();

            if (playerPosition && playerRotation) {
                // Offset the camera behind and above the player
                // const offset = new THREE.Vector3(far * 1.5, far, far * 1.5);

                if (direction === "up")
                    offset = new THREE.Vector3(far * 1.5, far, far * 1.5);
                if (direction === "left")
                    offset = new THREE.Vector3(far * 1.5, far, - far * 1.5);
                if (direction === "right")
                    offset = new THREE.Vector3(-far * 1.5, far, far * 1.5);
                if (direction === "down")
                    offset = new THREE.Vector3(-far * 1.5, far, -far * 1.5);

                offset.applyQuaternion(new THREE.Quaternion(playerRotation.x, playerRotation.y, playerRotation.z, playerRotation.w));

                // Set the camera position relative to player position and offset
                state.camera.position.copy(playerPosition).add(offset);

                // Make the camera look at the player
                state.camera.lookAt(playerPosition);
            }
        }

    });

    return (
        <>
            <Environment preset="sunset" />
            <Sky intensity={1} />
            <RedCube position={() => playerRef.current?.translation()} rotation={() => playerRef.current?.rotation()} />
            <Physics gravity={[0, -9.8, 0]}>
                {/* <Map1 /> */}
                {/* <group rotation={[0, Math.PI / 4, 0]}> */}
                    <Level4 />
                {/* </group> */}
            </Physics>
        </>
    );
}

export default MiniMapCanvas;


