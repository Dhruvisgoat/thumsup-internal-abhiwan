import React, { useRef, useContext, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';
import { MyContext } from './RefContext/Context';
import { useKeyboardControls } from '@react-three/drei';
import { DirectionContext } from './RefContext/DirectionContext';

// Extend BufferGeometry to include BVH capabilities
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

function EnemyRaycast({ position, raycastRef, display = false, enemyGroupRef, id, xMove, zMove }) {

    const { isPlayerDied } = useContext(DirectionContext);

    useEffect(() => {
        if (isPlayerDied ) {
            raycastRef.current?.setTranslation(new THREE.Vector3(position[0], position[1], position[2])); // set enemy to original poisition
            // set enemy to original poisition
        }
    }, [isPlayerDied]);

    const forwardArrow = useRef();
    const backwardArrow = useRef();
    const leftArrow = useRef();
    const rightArrow = useRef();
    const groupRef = useRef();

    const forwardMeshRef = useRef();
    const backwardMeshRef = useRef();
    const leftMeshRef = useRef();
    const rightMeshRef = useRef();

    const [, get] = useKeyboardControls();
    const intersectionPointRef = useRef();
    const { piyushMazeRef } = useContext(MyContext);

    useEffect(() => {

        if (groupRef.current && display) {
            const direction = new THREE.Vector3(1, 0, 0);
            const origin = new THREE.Vector3(0, 0, 0);
            const length = 50;
            const color = 0xffff00;

            forwardArrow.current = new THREE.ArrowHelper(direction, origin, length, color);
            backwardArrow.current = new THREE.ArrowHelper(direction, origin, length, color);
            leftArrow.current = new THREE.ArrowHelper(direction, origin, length, color);
            rightArrow.current = new THREE.ArrowHelper(direction, origin, length, color);

            groupRef.current.add(forwardArrow.current, backwardArrow.current, leftArrow.current, rightArrow.current);
        }

        // Initialize intersectionPointRef with an object structure
        intersectionPointRef.current = {
            forward: null,
            backward: null,
            left: null,
            right: null
        };
    }, [piyushMazeRef, intersectionPointRef]);

    useFrame((state) => {
        if (raycastRef.current && piyushMazeRef.current && intersectionPointRef.current) {
            const origin = new THREE.Vector3(raycastRef.current.translation().x, raycastRef.current.translation().y, raycastRef.current.translation().z);

            // Function to perform raycast and update intersection point
            const performRaycast = (direction, key, arrowRef) => {
                const raycaster = new THREE.Raycaster(origin, direction);
                raycaster.firstHitOnly = true;
                const intersects = raycaster.intersectObject(piyushMazeRef.current, true);

                // Update intersection points and arrows only if intersectionPointRef.current is initialized
                if (intersectionPointRef.current) {
                    intersectionPointRef.current[key] = intersects.length > 0 ? intersects[0].point : null;
                }
                if (arrowRef.current && display) {
                    arrowRef.current.position.copy(origin);
                    arrowRef.current.setDirection(direction);
                }
            };

            // Perform raycasts for all four directions
            performRaycast(new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4).normalize(), 'forward', forwardArrow);
            performRaycast(new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4).normalize(), 'backward', backwardArrow);
            performRaycast(new THREE.Vector3(-1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4).normalize(), 'left', leftArrow);
            performRaycast(new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4).normalize(), 'right', rightArrow);

            // Update mesh positions based on intersection points
            if (intersectionPointRef.current.forward) forwardMeshRef.current.position.copy(intersectionPointRef.current.forward);
            if (intersectionPointRef.current.backward) backwardMeshRef.current.position.copy(intersectionPointRef.current.backward);
            if (intersectionPointRef.current.left) leftMeshRef.current.position.copy(intersectionPointRef.current.left);
            if (intersectionPointRef.current.right) rightMeshRef.current.position.copy(intersectionPointRef.current.right);
        }
    });


    const rayCastChoosedDirection = { x: 1, y: 0, z: 1 };

    function determineDirection(a, b, c, d) {
        const possibleDirections = [];

        if (a) {
            possibleDirections.push({ x: -1, y: 0, z: -1 });
        }

        if (b) {
            possibleDirections.push({ x: 1, y: 0, z: 1 });
        }

        if (c) {
            possibleDirections.push({ x: 1, y: 0, z: -1 });
        }

        if (d) {
            possibleDirections.push({ x: -1, y: 0, z: 1 });
        }

        // Check if any directions are possible
        if (possibleDirections.length > 0) {
            // Randomly choose from the possible directions
            const randomIndex = Math.floor(Math.random() * possibleDirections.length);
            return possibleDirections[randomIndex];
        }

        // Return null or a default direction if no conditions are true
        return null;
    }

    const { playerRef, distanceFromEnemyRef } = useContext(MyContext);

    const speed = 6;
    const [direction, setDirection] = useState({ x: 1, y: 0, z: 1 });
    const [turnDirections, setTurnDirections] = useState([true, true, true, true]);
    const turnDirectionRef = useRef([true, true, true, true]);
    const [isTurn, setIsTurn] = useState(false);
    const [checkDirection, setCheckDirection] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCheckDirection(prev => !prev);
        }, 3000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setDirection(determineDirection(turnDirectionRef.current[0], turnDirectionRef.current[1], turnDirectionRef.current[2], turnDirectionRef.current[3]));
        console.log(turnDirectionRef.current);
        console.log(direction);
    }, [checkDirection, isTurn])


    useFrame(() => {

        const forwardDistance = intersectionPointRef.current?.forward ? Math.sqrt(Math.pow(intersectionPointRef.current?.forward?.x - raycastRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.forward.y - raycastRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.forward.z - raycastRef.current?.translation().z, 2)).toFixed(1) : 'N/A';
        const isForwardDistanceGreaterThan3 = forwardDistance === 'N/A' || parseFloat(forwardDistance) > 6;
        const backwardDistance = intersectionPointRef.current?.backward ? Math.sqrt(Math.pow(intersectionPointRef.current?.backward.x - raycastRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.backward.y - raycastRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.backward.z - raycastRef.current?.translation().z, 2)).toFixed(1) : 'N/A';
        const isBackwardDistanceGreaterThan3 = backwardDistance === 'N/A' || parseFloat(backwardDistance) > 6;
        const leftDistance = intersectionPointRef.current?.left ? Math.sqrt(Math.pow(intersectionPointRef.current?.left.x - raycastRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.left.y - raycastRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.left.z - raycastRef.current?.translation().z, 2)).toFixed(1) : 'N/A';
        const isLeftDistanceGreaterThan3 = leftDistance === 'N/A' || parseFloat(leftDistance) > 6;
        const rightDistance = intersectionPointRef.current?.right ? Math.sqrt(Math.pow(intersectionPointRef.current?.right.x - raycastRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.right.y - raycastRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.right.z - raycastRef.current?.translation().z, 2)).toFixed(1) : 'N/A';
        const isRightDistanceGreaterThan3 = rightDistance === 'N/A' || parseFloat(rightDistance) > 6;

        // (a || b) && (c || d);

        setIsTurn((isForwardDistanceGreaterThan3 || isBackwardDistanceGreaterThan3) && (isLeftDistanceGreaterThan3 || isRightDistanceGreaterThan3));
        // console.log(isForwardDistanceGreaterThan3 || isBackwardDistanceGreaterThan3) && (isLeftDistanceGreaterThan3 || isRightDistanceGreaterThan3);
        // console.log(isTurn, forwardDistance, backwardDistance, rightDistance, leftDistance);

        turnDirectionRef.current = [isForwardDistanceGreaterThan3, isBackwardDistanceGreaterThan3, isRightDistanceGreaterThan3, isLeftDistanceGreaterThan3,];

        // if ((isTurn)) {
        //     setTurnDirections([isForwardDistanceGreaterThan3, isBackwardDistanceGreaterThan3, isLeftDistanceGreaterThan3, isRightDistanceGreaterThan3]);
        // }

        if (raycastRef.current) {
            raycastRef.current.setLinvel({
                x: direction.x * speed,
                y: 0,
                z: direction.z * speed
            });

            // Update the position of the enemy
            enemyGroupRef.current.position.x = raycastRef.current?.translation().x;
            enemyGroupRef.current.position.y = -4;
            enemyGroupRef.current.position.z = raycastRef.current?.translation().z;

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
            <group ref={groupRef}>
                <mesh ref={forwardMeshRef}>
                    {display && <>
                        <sphereGeometry attach="geometry" args={[1, 32, 32]} />
                        <meshStandardMaterial attach="material" color="hotpink" />
                    </>}
                </mesh>
                <mesh ref={backwardMeshRef}>
                    {display && <>
                        <sphereGeometry attach="geometry" args={[1, 32, 32]} />
                        <meshStandardMaterial attach="material" color="hotpink" />
                    </>}
                </mesh>
                <mesh ref={leftMeshRef}>
                    {display && <>
                        <sphereGeometry attach="geometry" args={[1, 32, 32]} />
                        <meshStandardMaterial attach="material" color="hotpink" />
                    </>}
                </mesh>
                <mesh ref={rightMeshRef}>
                    {display && <>
                        <sphereGeometry attach="geometry" args={[1, 32, 32]} />
                        <meshStandardMaterial attach="material" color="hotpink" />
                    </>}
                </mesh>
            </group>
        </>
    );
}

export default EnemyRaycast;


