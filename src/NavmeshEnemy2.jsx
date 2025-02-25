import * as THREE from 'three'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF } from '@react-three/drei'
import { Pathfinding, PathfindingHelper } from 'three-pathfinding'
import { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { DirectionContext } from './RefContext/DirectionContext'
import { Motu } from './GameAssets/Enemies/Motu'
import { MyContext } from './RefContext/Context'
import { DeliveryBoy } from './GameAssets/Scooter'
import { KnifeGoon } from './GameAssets/Enemies/KnifeGoon'
import Truck from './GameAssets/Truck'
import Drone from './GameAssets/Drone'

const ZONE = ' '
const SPEED = 15
const OFFSET = 0.2

export default function NavmeshEnemy2({ car, motu, knifeGoon, truck, drone, position = [-17.5, -4, 3.5] }) {
    const { coordinates, setIsPlayerDied, powerup } = useContext(DirectionContext);
    const { playerRef } = useContext(MyContext);
    const [flee, setFlee] = useState(false);
    // const customEnemyRef = useRef()
    const customEnemyRef2 = useRef(new THREE.Group()); // Unique for each instance

    const { scene } = useThree()
    const pathfinder = useRef()
    const helper = useRef()

    const { nodes: navNodes, scene: navmeshLevel } = useGLTF('/models/Scene/navmesh.gltf')
    const navmeshTransform = useRef(new THREE.Matrix4())

    // const playerPosition = useRef(new THREE.Vector3(-17.5, -4, 3.5))
    const playerPosition = useRef(new THREE.Vector3(...position))
    const targetPosition = useRef(new THREE.Vector3())
    const initialEnemyPosition = useRef(new THREE.Vector3(...position));
    // const initialEnemyPosition = useRef(new THREE.Vector3(-17.5, -4, 3.5));
    const level = useRef()
    const navmesh2 = useRef()
    const groupID = useRef()
    const path = useRef()

    // New ref to track movement direction
    const movementDirection = useRef(new THREE.Vector3())

    useEffect(() => {
        pathfinder.current = new Pathfinding()
        helper.current = new PathfindingHelper()

        const geometry = navNodes.mesh_0.geometry.clone()

        navmeshTransform.current.compose(
            new THREE.Vector3(0, -4.5, 0),
            new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 4, 0)),
            new THREE.Vector3(3, 1, 3)
        )

        geometry.applyMatrix4(navmeshTransform.current)

        console.time('createZone()')
        const zone = Pathfinding.createZone(geometry)
        console.timeEnd('createZone()')

        pathfinder.current.setZoneData(ZONE, zone)
        groupID.current = pathfinder.current?.getGroup(ZONE, playerPosition.current)

        helper.current
            .setPlayerPosition(playerPosition.current)
            .setTargetPosition(playerPosition.current)
    }, [])

    useEffect(() => {
        if (!coordinates || !pathfinder.current || !helper.current) return;

        // Ensure targetPosition.current is a THREE.Vector3 instance
        const fleeVector = new THREE.Vector3(
            playerPosition.current?.x - (coordinates?.x),
            -4,
            playerPosition.current?.z - (coordinates?.z)
        );

        // Corrected approachVector construction
        const approachVector = new THREE.Vector3(coordinates.x, -4, coordinates.z);

        // Update target position based on flee state
        // if (flee) {
        // targetPosition.current?.copy(fleeVector);
        // } else {
        targetPosition.current?.copy(approachVector);
        // }

        helper.current.reset().setPlayerPosition(playerPosition.current);

        const targetGroupID = pathfinder.current?.getGroup(ZONE, targetPosition.current, true);
        const closestTargetNode = pathfinder.current?.getClosestNode(targetPosition?.current, ZONE, targetGroupID, true);

        helper.current.setTargetPosition(targetPosition.current);
        if (closestTargetNode) {
            helper.current.setNodePosition(closestTargetNode?.centroid);
        }

        const calculatedPath = pathfinder.current?.findPath(
            playerPosition.current,
            targetPosition.current,
            ZONE,
            groupID.current
        );

        if (calculatedPath && calculatedPath.length) {
            path.current = calculatedPath;
            helper.current.setPath(calculatedPath);
        } else {
            const closestPlayerNode = pathfinder.current?.getClosestNode(playerPosition.current, ZONE, groupID.current);
            const clamped = new THREE.Vector3();

            pathfinder.current?.clampStep(
                playerPosition.current,
                targetPosition.current?.clone(),
                closestPlayerNode,
                ZONE,
                groupID.current,
                clamped
            );
            helper.current.setStepPosition(clamped);
        }
    }, [coordinates, ZONE, groupID, path, playerPosition, targetPosition, pathfinder, helper, flee]);



    useFrame((_, delta) => {
        if (!pathfinder.current || !(path.current || []).length) return;

        let targetPosition = path.current[0];

        const velocity = targetPosition.clone().sub(playerPosition.current);
        // make velocity negative in x and z direction to move in opposite direction

        // Calculate the distance between the enemy and the target position
        const distance = playerPosition.current?.distanceTo(new THREE.Vector3(coordinates?.x, -4, coordinates?.z));

        let currentSpeed = SPEED; // Default speed

        if (distance < 40) {

            setFlee(false);

            currentSpeed = SPEED; // Increase speed when distance is less than 40

            if (distance < 1 && !powerup) {
                setIsPlayerDied(true);

                // Reset enemy to initial position
                playerPosition.current.copy(initialEnemyPosition.current);
                customEnemyRef2.current.position.copy(playerPosition.current);

                // Clear the path and reinitialize it
                path.current = [];
                helper.current.reset().setPlayerPosition(playerPosition.current);

                return; // Exit to avoid further movement logic
            }
            customEnemyRef2.current.scale.set(1.2, 1.2, 1.2);
        } else {
            setFlee(true);
            customEnemyRef2.current.scale.set(1, 1, 1);
            currentSpeed = 3; // Reduce speed when distance is greater than 40
            // return;
        }

        if (velocity.lengthSq() > 0.5 * 0.05) {
            velocity.normalize();

            // Store movement direction
            movementDirection.current.copy(velocity);

            // Move player to target
            playerPosition.current.add(velocity.multiplyScalar(delta * currentSpeed));
            customEnemyRef2.current.position.copy(playerPosition.current);

            // Rotate the enemy to face the movement direction
            if (!movementDirection.current.equals(new THREE.Vector3(0, 0, 0))) {
                const angle = Math.atan2(movementDirection.current.x, movementDirection.current.z);
                customEnemyRef2.current.rotation.y = angle;
            }

            helper.current.setPlayerPosition(playerPosition.current);
        } else {
            // Remove node from the path we calculated
            path.current.shift();
        }
    });

    return (
        <group dispose={null}>
            <mesh
                geometry={navNodes.mesh_0?.geometry}
                scale={[3, 1, 3]}
                position={[0, -4.5, 0]}
                rotation={[0, Math.PI / 4, 0]}
                ref={navmesh2}
                material={new THREE.MeshBasicMaterial({
                    color: 0x0000ff,
                    transparent: true,
                    opacity: 0,
                    // wireframe: true
                })}
            />

            {/* Custom player */}
            <group ref={customEnemyRef2} castShadow
                position={playerPosition.current}
            >
                <group rotation={[0, 5 * Math.PI / 4, 0]}>
                    {car &&
                        <DeliveryBoy />
                    }
                    {motu &&
                        <Motu />
                    }
                    {knifeGoon &&
                        <KnifeGoon />
                    }
                    {truck &&
                        <Truck />
                    }
                    {
                        drone &&
                        <Drone />
                    }
                </group>
            </group>


        </group >
    )
}









