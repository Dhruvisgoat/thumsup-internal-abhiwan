import React, { useContext, useRef } from 'react'
import { MyContext } from './RefContext/Context'
import { useFrame } from '@react-three/fiber';
import { Character } from './Character';
import { Character2 } from './Character2';
import { Character3 } from './Character3';
import { Character4 } from './Character4';

function PlayerCharacter() {

    const { playerRef, jumpRef } = useContext(MyContext);
    const meshRef = useRef();

    useFrame(() => {
        // console.log(parseInt(playerRef.current?.translation().x), parseInt(playerRef.current?.translation().y), parseInt(playerRef.current?.translation().z));
        // set the rigid ball collider's position to the character for x,z not y 
        meshRef.current.position.x = (playerRef.current?.translation().x);

        // meshRef.current.position.y = (playerRef.current?.translation().y);
        meshRef.current.position.y = -1;

        meshRef.current.position.z = (playerRef.current?.translation().z);
    });

    return (
        <mesh ref={meshRef} rotation={[0, Math.PI / 4, 0]} position={[0, 0, 0]}>
            {/* <boxGeometry attach="geometry" args={[2, 2, 2]} />
            <meshStandardMaterial attach="material" color="blue" /> */}
            {/* <Character /> */}
            {/* <Character2 /> */}
            {/* <Character3 /> */}
            <Character4 />

        </mesh>
    )
}

export default PlayerCharacter