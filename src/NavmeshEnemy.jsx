import * as THREE from 'three'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Pathfinding, PathfindingHelper } from 'three-pathfinding'
import { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { DirectionContext } from './RefContext/DirectionContext'
import { Motu } from './GameAssets/Enemies/Motu'
import { MyContext } from './RefContext/Context'
import { DeliveryBoy } from './GameAssets/Scooter'
import Drone from './GameAssets/Drone'
import { BallCollider, RigidBody } from '@react-three/rapier'
import { PauseContext } from './RefContext/PauseContext'
import { interactionGroups } from '@react-three/rapier'
import { KnifeGoon } from './GameAssets/Enemies/KnifeGoon'
import Truck from './GameAssets/Truck'

// Constants for navigation and gameplay
const ZONE = ' '
const DISTANCE_THRESHOLD = 40
const RAYCAST_CHECK_DISTANCE = 15

export default function NavmeshEnemy({ truckUrl='/models/updatedGameAssets/Gadi01-transformed.glb', car, motu, drone, truck, knifeGoon, position = [-17.5, -4, 3.5], speed = 10 }) {
    // Speed settings based on input prop
    const RANDOM_MOVEMENT_SPEED = speed / 2;
    const CHASE_SPEED = speed;

    // Context and refs setup
    const { coordinates, setIsPlayerDied, powerup, setLives } = useContext(DirectionContext);
    const { playerRef, piyushMazeRef } = useContext(MyContext);
    const customEnemyRef = useRef(new THREE.Group());
    const rigidBodyRef = useRef();
    const { setPause, setResetNavmeshEnemy, resetNavmeshEnemy } = useContext(PauseContext);

    // Collision tracking ref to prevent multiple life decrements
    const isCollidingRef = useRef(false);

    // Pathfinding setup
    const { scene } = useThree()
    const pathfinder = useRef()
    const helper = useRef()
    const { nodes: navNodes } = useGLTF('/models/Scene/navmesh.gltf')
    const navmeshTransform = useRef(new THREE.Matrix4())

    // Position tracking refs
    const playerPosition = useRef(new THREE.Vector3(...position))
    const targetPosition = useRef(new THREE.Vector3())
    const initialEnemyPosition = useRef(new THREE.Vector3(...position));
    const groupID = useRef()
    const path = useRef()

    // Random movement state
    const [direction, setDirection] = useState({ x: 1, y: 0, z: 1 });
    const [checkDirection, setCheckDirection] = useState(false);
    const intersectionPointRef = useRef({
        forward: null,
        backward: null,
        left: null,
        right: null
    });

    // Initialize intersection points for raycasting
    useEffect(() => {
        intersectionPointRef.current = {
            forward: null,
            backward: null,
            left: null,
            right: null
        };
    }, []);

    // Initialize pathfinding system
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
        const zone = Pathfinding.createZone(geometry)
        pathfinder.current.setZoneData(ZONE, zone)
        groupID.current = pathfinder.current?.getGroup(ZONE, playerPosition.current)
        helper.current.setPlayerPosition(playerPosition.current).setTargetPosition(playerPosition.current)
    }, [])

    // Update path when player coordinates change
    useEffect(() => {
        if (!coordinates || !pathfinder.current || !helper.current) return;

        const approachVector = new THREE.Vector3(coordinates.x, -4, coordinates.z);
        targetPosition.current?.copy(approachVector);
        helper.current.reset().setPlayerPosition(playerPosition.current);

        const targetGroupID = pathfinder.current?.getGroup(ZONE, targetPosition.current, true);
        const closestTargetNode = pathfinder.current?.getClosestNode(targetPosition?.current, ZONE, targetGroupID, true);

        if (closestTargetNode) {
            const calculatedPath = pathfinder.current?.findPath(
                playerPosition.current,
                targetPosition.current,
                ZONE,
                groupID.current
            );

            if (calculatedPath && calculatedPath.length) {
                path.current = calculatedPath;
            }
        }
    }, [coordinates]);

    // Periodic direction check for random movement
    useEffect(() => {
        const interval = setInterval(() => {
            setCheckDirection(prev => !prev);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Function to update raycasts for collision detection
    const updateRaycasts = () => {
        if (!rigidBodyRef.current || !piyushMazeRef.current) return;

        const origin = new THREE.Vector3(
            rigidBodyRef.current.translation().x,
            rigidBodyRef.current.translation().y,
            rigidBodyRef.current.translation().z
        );

        const performRaycast = (direction, key) => {
            const raycaster = new THREE.Raycaster(origin, direction);
            raycaster.firstHitOnly = true;
            const intersects = raycaster.intersectObject(piyushMazeRef.current, true);
            intersectionPointRef.current[key] = intersects.length > 0 ? intersects[0].point : null;
        };

        performRaycast(new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4).normalize(), 'forward');
        performRaycast(new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4).normalize(), 'backward');
        performRaycast(new THREE.Vector3(-1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4).normalize(), 'left');
        performRaycast(new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4).normalize(), 'right');

        return calculateDirections();
    };

    // Calculate available movement directions based on raycast results
    const calculateDirections = () => {
        if (!rigidBodyRef.current || !intersectionPointRef.current) return [false, false, false, false];

        const currentPos = rigidBodyRef.current.translation();
        const checkDistance = (point) => {
            if (!point) return true;
            return Math.sqrt(
                Math.pow(point.x - currentPos.x, 2) +
                Math.pow(point.z - currentPos.z, 2)
            ) > RAYCAST_CHECK_DISTANCE;
        };

        return [
            checkDistance(intersectionPointRef.current.forward),
            checkDistance(intersectionPointRef.current.backward),
            checkDistance(intersectionPointRef.current.right),
            checkDistance(intersectionPointRef.current.left)
        ];
    };

    // Determine random movement direction based on available directions
    function determineDirection(availableDirections) {
        const [forward, backward, right, left] = availableDirections;
        const possibleDirections = [];

        if (forward) possibleDirections.push({ x: -1, y: 0, z: -1 });
        if (backward) possibleDirections.push({ x: 1, y: 0, z: 1 });
        if (right) possibleDirections.push({ x: 1, y: 0, z: -1 });
        if (left) possibleDirections.push({ x: -1, y: 0, z: 1 });

        if (possibleDirections.length > 0) {
            const randomIndex = Math.floor(Math.random() * possibleDirections.length);
            return possibleDirections[randomIndex];
        }
        return null;
    }

    // Handle collision outside useFrame to prevent multiple life decrements
    const handleCollision = () => {
        if (!isCollidingRef.current) {
            isCollidingRef.current = true;
            setIsPlayerDied(true);
            setResetNavmeshEnemy(true);
            setLives(prevLives => prevLives + 1);
            setPause(true);
        }
    };

    // Reset collision state when enemy resets
    useEffect(() => {
        if (resetNavmeshEnemy) {
            isCollidingRef.current = false;
        }
    }, [resetNavmeshEnemy]);

    // Update direction based on raycast results
    useEffect(() => {
        if (rigidBodyRef.current) {
            const availableDirections = updateRaycasts();
            const newDirection = determineDirection(availableDirections);
            if (newDirection) {
                setDirection(newDirection);
            }
        }
    }, [checkDirection]);

    // Main game loop
    useFrame(() => {
        if (!rigidBodyRef.current) return;

        const currentPos = rigidBodyRef.current.translation();
        playerPosition.current.set(currentPos.x, currentPos.y, currentPos.z);

        const distance = playerPosition.current?.distanceTo(
            new THREE.Vector3(coordinates?.x, -4, coordinates?.z)
        );

        if (resetNavmeshEnemy) {
            setTimeout(() => {
                const resetPos = initialEnemyPosition.current;
                rigidBodyRef.current.setTranslation({
                    x: resetPos.x,
                    y: resetPos.y,
                    z: resetPos.z
                });
                rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 });
                path.current = [];
                setResetNavmeshEnemy(false);
            }, 100);
            return;
        }

        if (distance < 7 && !powerup) {
            handleCollision();
            return;
        } else {
            isCollidingRef.current = false;
        }

        if (distance > DISTANCE_THRESHOLD) {
            rigidBodyRef.current.setLinvel({
                x: direction.x * RANDOM_MOVEMENT_SPEED,
                y: 0,
                z: direction.z * RANDOM_MOVEMENT_SPEED
            });
        } else if (path.current?.length > 0) {
            const targetPos = path.current[0];
            const velocity = new THREE.Vector3(
                targetPos.x - currentPos.x,
                0,
                targetPos.z - currentPos.z
            );

            if (velocity.lengthSq() > 0.05) {
                velocity.normalize();
                const finalVelocity = velocity.multiplyScalar(CHASE_SPEED);
                rigidBodyRef.current.setLinvel({
                    x: finalVelocity.x,
                    y: 0,
                    z: finalVelocity.z
                });
            } else {
                path.current.shift();
            }
        }

        if (customEnemyRef.current) {
            customEnemyRef.current.position.set(currentPos.x, initialEnemyPosition.current.y, currentPos.z);
            const vel = rigidBodyRef.current.linvel();
            if (Math.abs(vel.x) > 0.1 || Math.abs(vel.z) > 0.1) {
                const angle = Math.atan2(-vel.z, vel.x) - Math.PI / 4;
                customEnemyRef.current.rotation.y = angle;
            }
        }
    });

    return (
        <group>
            <RigidBody
                ref={rigidBodyRef}
                type="dynamic"
                position={position}
                lockRotations={true}
                enabledTranslations={[true, false, true]}
                collider={false}
                gravityScale={0}
            >
                <BallCollider
                    args={[4.5]}
                    lockRotations={true}
                    collisionGroups={interactionGroups(2, [3, 2])}
                />
            </RigidBody>
            <group ref={customEnemyRef} castShadow scale={1.2}>
                <group rotation={[0, 0, 0]}>
                    {car && <DeliveryBoy />}
                    {motu && <Motu />}
                    {drone && <Drone />}
                    {truck && <Truck truckUrl={truckUrl} />}
                    {knifeGoon && <KnifeGoon />}
                </group>
            </group>
        </group>
    );
}