// import React, { useRef, useContext, useEffect } from 'react'
// import { RigidBody } from '@react-three/rapier'
// import { useFrame } from '@react-three/fiber'
// import { CuboidCollider } from '@react-three/rapier';

// function Enemy() {
//     const speed = 5;
//     const enemyRef = useRef();


//     useFrame(() => {
//         enemyRef.current.setLinvel({ x: 1 * speed, y: 0, z: 0 * speed });
//     })

//     return (
//         <RigidBody ref={enemyRef} type="dynamic" mass={10} position={[0, 1, 0]}>
//             <mesh>
//                 <boxGeometry attach="geometry" args={[1.5, 2, 1.5]} />
//                 <meshStandardMaterial attach="material" color="red" />
//             </mesh>
//             <CuboidCollider args={[1, 1, 1]} />
//         </RigidBody>
//     )
// }

// export default Enemy








// import React, { useRef, useEffect, useState, useMemo, useContext } from 'react';
// import { BallCollider, RigidBody } from '@react-three/rapier';
// import { useFrame } from '@react-three/fiber';
// import { useAnimations } from '@react-three/drei';
// import { useGLTF } from '@react-three/drei';
// import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
// import { useGraph } from '@react-three/fiber';
// import { MyContext } from './RefContext/Context';
// import { Car } from './GameAssets/Car';
// import { Motu } from './GameAssets/Enemies/Motu';
// import { KnifeGoon } from './GameAssets/Enemies/KnifeGoon';
// import { DeliveryBoy } from './GameAssets/Scooter';
// import Truck from './GameAssets/Truck';
// import Drone from './GameAssets/Drone';

// export function useSkinnedMeshClone(path) {
//     const { scene, materials, animations } = useGLTF(path);
//     const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
//     const { nodes } = useGraph(clonedScene);
//     return { scene: clonedScene, materials, animations, nodes };
// }

// export default function Enemy({ position, id, car, motu, knifeGoon,truck,drone, xMove, zMove }) {
//     const { playerRef, distanceFromEnemyRef } = useContext(MyContext);

//     const SPEED = 3;
//     const enemyRef = useRef();
//     const [direction, setDirection] = useState({ x: 1, y: 0, z: 0 });

//     const group = useRef();
//     const enemyGroupRef = useRef();

//     const { scene, materials, animations, nodes } = useSkinnedMeshClone('/models/characters/ghost.glb');
//     const { actions } = useAnimations(animations, group);

//     useEffect(() => {

//         let directions = [];

//         if (xMove) {
//             directions = directions.concat([
//                 { x: 1, y: 0, z: 1 },
//                 { x: -1, y: 0, z: -1 },
//             ]);
//         }

//         if (zMove) {
//             directions = directions.concat([
//                 { x: 1, y: 0, z: -1 },
//                 { x: -1, y: 0, z: 1 },
//             ]);
//         }

//         // const directions = [
//         //     { x: 1, y: 0, z: 1 },
//         //     { x: -1, y: 0, z: -1 },
//         //     { x: 1, y: 0, z: -1 },
//         //     { x: -1, y: 0, z: 1 },
//         // ];

//         // change direction randomly 

//         //     const changeDirection = () => {
//         //         const newDirection = directions[Math.floor(Math.random() * directions.length)];
//         //         setDirection(newDirection);
//         //     };

//         //     changeDirection();
//         //     const intervalId = setInterval(changeDirection, 2000);
//         //     return () => clearInterval(intervalId);


//         //change direction alternatively

//         let directionIndex = 0;
//         if (directions.length > 0) {
//             const changeDirection = () => {
//                 setDirection(directions[directionIndex]);
//                 directionIndex = (directionIndex + 1) % directions.length; // Toggle index between 0 and 1
//             };

//             changeDirection();
//             const intervalId = setInterval(changeDirection, 6000);
//             return () => clearInterval(intervalId);
//         }
//     }, [xMove, zMove]); // Re-run effect only when xMove or zMove changes

//     useFrame(() => {
//         if (enemyRef.current) {
//             enemyRef.current.setLinvel({
//                 x: direction.x * SPEED,
//                 y: 0,
//                 z: direction.z * SPEED
//             });

//             // Update the position of the enemy
//             enemyGroupRef.current.position.x = enemyRef.current?.translation().x;
//             enemyGroupRef.current.position.y = -4;
//             enemyGroupRef.current.position.z = enemyRef.current?.translation().z;

//             // Calculate distance to the player
//             const playerPosition = playerRef.current.translation();
//             const enemyPosition = enemyGroupRef.current.position;
//             const distance = Math.sqrt(
//                 Math.pow(playerPosition.x - enemyPosition.x, 2) +
//                 Math.pow(playerPosition.y - enemyPosition.y, 2) +
//                 Math.pow(playerPosition.z - enemyPosition.z, 2)
//             );

//             distanceFromEnemyRef.current[id] = distance;

//             if (distanceFromEnemyRef.current.distance < 2.5) return;

//             // Calculate the rotation based on movement direction
//             // const angle = Math.atan2(direction.z, direction.x);
//             const angle = Math.atan2(-direction.z, direction.x) - Math.PI / 4;

//             enemyGroupRef.current.rotation.y = angle;
//         }
//     });

//     return (
//         <>
//             <RigidBody ref={enemyRef} type="dynamic" mass={1} position={position} >
//                 <mesh />
//                 <BallCollider args={[1.3]} />
//             </RigidBody>
//             <group ref={enemyGroupRef} scale={1.2} >

//                     {car && <DeliveryBoy />}
//                     {motu && <Motu />}
//                     {knifeGoon && <KnifeGoon />}
//                     {truck && <Truck />}
//                     {drone && <Drone />}
//                 {/* <primitive object={scene} scale={0.02} rotation={[0, Math.PI / 4, 0]} /> */}
//             </group>
//         </>
//     );
// }

// useGLTF.preload('/models/characters/ghost.glb');























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
import Drone from './GameAssets/Drone';
import Truck from './GameAssets/Truck';
import EnemyRaycast from './EnemyRaycast';
import { DirectionContext } from './RefContext/DirectionContext';
import * as THREE from 'three';

export function useSkinnedMeshClone(path) {
    const { scene, materials, animations } = useGLTF(path);
    const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes } = useGraph(clonedScene);
    return { scene: clonedScene, materials, animations, nodes };
}

export default function Enemy({ position, id, car, motu, knifeGoon, truck, drone, xMove, zMove, speed = 6 }) {

    const { playerRef, distanceFromEnemyRef } = useContext(MyContext);
    // const speed = 6;
    const enemyRef = useRef();
    const [direction, setDirection] = useState({ x: 1, y: 0, z: 0 });
    const group = useRef();
    const enemyGroupRef = useRef();

    // const { isPlayerDied } = useContext(DirectionContext);

    // useEffect(() => {
    //     if (isPlayerDied) {
    //         enemyRef.current?.setTranslation(new THREE.Vector3(position[0], position[1], position[2])); // set enemy to original poisition
    //         // set enemy to original poisition
    //     }
    // }, [isPlayerDied]);


    return (
        <>
            <RigidBody ref={enemyRef} type="dynamic" mass={1} position={position} >
                <BallCollider args={[1.5]} />
            </RigidBody>

            <group>
                <EnemyRaycast position={position} display={false} id={id} raycastRef={enemyRef} enemyGroupRef={enemyGroupRef} xMove={xMove} zMove={zMove} />
            </group>

            <group ref={enemyGroupRef} scale={1.2}>

                {car &&
                    // <Car />
                    <DeliveryBoy scale={1.2} />
                }
                {motu &&
                    <Motu scale={1.2} />
                    // <Drone />
                    // <Truck />
                }

                {knifeGoon &&
                    <KnifeGoon scale={1.2} />
                }

                {truck &&
                    <Truck scale={1.2} />
                }

                {
                    drone &&
                    <Drone scale={1.2} />
                }

            </group>
        </>
    );
}

useGLTF.preload('/models/characters/ghost.glb');


















































