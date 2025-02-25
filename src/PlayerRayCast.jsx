import React, { useRef, useContext, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';
import { MyContext } from './RefContext/Context';
import { useKeyboardControls } from '@react-three/drei';

// Extend BufferGeometry to include BVH capabilities
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

function PlayerRaycast({ display = false }) {
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
    const { piyushMazeRef, playerRef, intersectionPointRef, directionRef } = useContext(MyContext);

    useEffect(() => {
        // Compute the BVH bounds tree for the PiyushMaze model
        if (piyushMazeRef?.current) {
            piyushMazeRef?.current.traverse((obj) => {
                if (obj.geometry) {
                    obj.geometry.computeBoundsTree();
                }
            });
        }
        // Initialize ArrowHelper
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
        if (playerRef.current && piyushMazeRef.current && intersectionPointRef.current) {
            const origin = new THREE.Vector3(playerRef.current.translation().x, 2, playerRef.current.translation().z);

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


    return (
        <>
            <group ref={groupRef}>
                <mesh ref={forwardMeshRef}>
                    {display && <>
                        <sphereGeometry attach="geometry" args={[0.6, 32, 32]} />
                        <meshStandardMaterial attach="material" color="red" />
                    </>}
                </mesh>
                <mesh ref={backwardMeshRef}>
                    {display && <>
                        <sphereGeometry attach="geometry" args={[0.6, 32, 32]} />
                        <meshStandardMaterial attach="material" color="red" />
                    </>}
                </mesh>
                <mesh ref={leftMeshRef}>
                    {display && <>
                        <sphereGeometry attach="geometry" args={[0.6, 32, 32]} />
                        <meshStandardMaterial attach="material" color="red" />
                    </>}
                </mesh>
                <mesh ref={rightMeshRef}>
                    {display && <>
                        <sphereGeometry attach="geometry" args={[0.6, 32, 32]} />
                        <meshStandardMaterial attach="material" color="red" />
                    </>}
                </mesh>
            </group>
        </>
    );
}

export default PlayerRaycast;