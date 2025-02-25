

import React, { useRef, useEffect, useState, useMemo, useContext } from 'react';
import { BallCollider, RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useAnimations } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
import { useGraph } from '@react-three/fiber';
import { MyContext } from './RefContext/Context';
import { Car } from './GameAssets/Car';
import { Motu } from './GameAssets/Enemies/Motu';
import { KnifeGoon } from './GameAssets/Enemies/KnifeGoon';
import { DeliveryBoy } from './GameAssets/Scooter';
    
export function useSkinnedMeshClone(path) {
    const { scene, materials, animations } = useGLTF(path);
    const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes } = useGraph(clonedScene);
    return { scene: clonedScene, materials, animations, nodes };
}

export default function AiEnemy({ position, id, car, motu, knifeGoon }) {
    const { playerRef, distanceFromEnemyRef } = useContext(MyContext);

    const SPEED = 3;
    const enemyRef = useRef();
    const [direction, setDirection] = useState({ x: 1, y: 0, z: 0 });

    const group = useRef();
    const enemyGroupRef = useRef();

    const { scene, materials, animations, nodes } = useSkinnedMeshClone('/models/characters/ghost.glb');
    const { actions } = useAnimations(animations, group);

    useEffect(() => {


        const directions = [
            { x: 1, y: 0, z: 1 },
            { x: -1, y: 0, z: -1 },
            { x: 1, y: 0, z: -1 },
            { x: -1, y: 0, z: 1 },
        ];

        // change direction randomly 
        const changeDirection = () => {
            const newDirection = directions[Math.floor(Math.random() * directions.length)];
            setDirection(newDirection);
        };

        changeDirection();
        //change Direction only if in that direction raycasting distance allows it to move in that direction    
        // otherwise keep moving in the same direction

        const intervalId = setInterval(changeDirection, 2000);
        return () => clearInterval(intervalId);


        //change direction alternatively

        let directionIndex = 0;
        if (directions.length > 0) {
            const changeDirection = () => {
                setDirection(directions[directionIndex]);
                directionIndex = (directionIndex + 1) % directions.length; // Toggle index between 0 and 1
            };

            changeDirection();
            //change direction should only be called when raycasting distance allows it to move in that direction 

            const intervalId = setInterval(changeDirection, 6000);
            return () => clearInterval(intervalId);
        }
    }, []); // Re-run effect only when xMove or zMove changes

    useFrame(() => {
        if (enemyRef.current) {
            enemyRef.current.setLinvel({
                x: direction.x * SPEED,
                y: 0,
                z: direction.z * SPEED
            });

            // Update the position of the enemy
            enemyGroupRef.current.position.x = enemyRef.current?.translation().x;
            enemyGroupRef.current.position.y = -4;
            enemyGroupRef.current.position.z = enemyRef.current?.translation().z;

            // Calculate distance to the player
            const playerPosition = playerRef.current.translation();
            const enemyPosition = enemyGroupRef.current.position;
            const distance = Math.sqrt(
                Math.pow(playerPosition.x - enemyPosition.x, 2) +
                Math.pow(playerPosition.y - enemyPosition.y, 2) +
                Math.pow(playerPosition.z - enemyPosition.z, 2)
            );

            distanceFromEnemyRef.current[id] = distance;

            if (distanceFromEnemyRef.current.distance < 2.5) return;

            // Calculate the rotation based on movement direction
            // const angle = Math.atan2(direction.z, direction.x);
            const angle = Math.atan2(-direction.z, direction.x) - Math.PI / 4;

            enemyGroupRef.current.rotation.y = angle;
        }
    });

    return (
        <>
            <RigidBody ref={enemyRef} type="dynamic" mass={1} position={position} >
                <mesh />
                <BallCollider args={[1.3]} />
            </RigidBody>
            <group ref={enemyGroupRef} >

                {car &&
                    // <Car />
                    <DeliveryBoy />
                }
                {motu &&
                    <Motu />
                }

                {knifeGoon &&
                    <KnifeGoon />
                }
                {/* <primitive object={scene} scale={0.02} rotation={[0, Math.PI / 4, 0]} /> */}
            </group>
        </>
    );
}

useGLTF.preload('/models/characters/ghost.glb');
