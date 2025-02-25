import { useFrame } from "@react-three/fiber";
import { useContext, useEffect, useRef } from "react";
import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { useKeyboardControls } from "@react-three/drei";
import { BallCollider, interactionGroups, RigidBody, useRapier } from "@react-three/rapier";
import { MyContext } from "./RefContext/Context";
import { DirectionContext } from "./RefContext/DirectionContext";
import { ViewContext } from "./RefContext/ViewContext";
import { DirContext } from "./RefContext/dirContext";
import { PauseContext } from "./RefContext/PauseContext";
import { isBrowser } from "react-device-detect";

const Player = ({ position }) => {
    const { playerMeshRef, playerRef, directionRef, intersectionPointRef, speedRef, jumpRef, cameraLookDirectionRef, stopRef } = useContext(MyContext);
    const { isPlayerDied, setIsPlayerDied } = useContext(DirectionContext);
    const { directionState, setDirectionState } = useContext(DirContext);
    const { viewMode } = useContext(ViewContext);
    const { setPause } = useContext(PauseContext);
    const rapier = useRapier();
    const [, get] = useKeyboardControls();
    
    // Add a ref to store the last pressed key
    const lastKeyRef = useRef(null);
    
    // Handle player death
    useEffect(() => {
        if (isPlayerDied) {
            setDirectionState(new THREE.Vector3(0, 0, 0));

            if (!isBrowser) {
                stopRef.current = true;
                playerRef.current?.setLinvel({ x: 0, y: 0, z: 0 });
                directionRef.current = 'Up';
            }

            setTimeout(() => {
                setIsPlayerDied(false);
            }, 1000);

            setTimeout(() => {
                setPause(false);
            }, 1000);
        }
    }, [isPlayerDied, setDirectionState, setPause, playerRef, stopRef, directionRef]);

    useFrame((state) => {
        // Skip movement processing if player is dead
        if (isPlayerDied) return;

        state.camera.fov = 100;
        state.camera.updateProjectionMatrix();

        // Calculate distances and checks
        const forwardDistance = intersectionPointRef.current?.forward ? Math.sqrt(Math.pow(intersectionPointRef.current?.forward?.x - playerRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.forward.y - playerRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.forward.z - playerRef.current?.translation().z, 2)).toFixed(1) : 'N/A';
        const isForwardDistanceGreaterThan3 = forwardDistance === 'N/A' || parseFloat(forwardDistance) > 7;
        const backwardDistance = intersectionPointRef.current?.backward ? Math.sqrt(Math.pow(intersectionPointRef.current?.backward.x - playerRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.backward.y - playerRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.backward.z - playerRef.current?.translation().z, 2)).toFixed(1) : 'N/A';
        const isBackwardDistanceGreaterThan3 = backwardDistance === 'N/A' || parseFloat(backwardDistance) > 7;
        const leftDistance = intersectionPointRef.current?.left ? Math.sqrt(Math.pow(intersectionPointRef.current?.left.x - playerRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.left.y - playerRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.left.z - playerRef.current?.translation().z, 2)).toFixed(1) : 'N/A';
        const isLeftDistanceGreaterThan3 = leftDistance === 'N/A' || parseFloat(leftDistance) > 7;
        const rightDistance = intersectionPointRef.current?.right ? Math.sqrt(Math.pow(intersectionPointRef.current?.right.x - playerRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.right.y - playerRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.right.z - playerRef.current?.translation().z, 2)).toFixed(1) : 'N/A';
        const isRightDistanceGreaterThan3 = rightDistance === 'N/A' || parseFloat(rightDistance) > 7;

        const velocity = playerRef.current.linvel();
        let newDirection = new THREE.Vector3();
        const { forward, backward, left, right, jump } = get();

        // Update last pressed key
        if (forward || directionRef.current === 'Up') lastKeyRef.current = 'forward';
        else if (backward || directionRef.current === 'Down') lastKeyRef.current = 'backward';
        else if (left || directionRef.current === 'Left') lastKeyRef.current = 'left';
        else if (right || directionRef.current === 'Right') lastKeyRef.current = 'right';

        // Check if movement in the desired direction is possible
        const canMove = {
            forward: isForwardDistanceGreaterThan3,
            backward: isBackwardDistanceGreaterThan3,
            left: isLeftDistanceGreaterThan3,
            right: isRightDistanceGreaterThan3
        };

        if (viewMode === '3rd') {
            // Third-person camera movement logic
            if (lastKeyRef.current === 'forward' && canMove.forward) {
                newDirection.set(
                    Math.sign(cameraLookDirectionRef.current.x),
                    cameraLookDirectionRef.current.y,
                    Math.sign(cameraLookDirectionRef.current.z)
                );
            } else if (lastKeyRef.current === 'backward' && canMove.backward) {
                newDirection.set(
                    -Math.sign(cameraLookDirectionRef.current.x),
                    cameraLookDirectionRef.current.y,
                    -Math.sign(cameraLookDirectionRef.current.z)
                );
            } else if (lastKeyRef.current === 'left' && canMove.left) {
                newDirection.set(
                    Math.sign(cameraLookDirectionRef.current.z),
                    cameraLookDirectionRef.current.y,
                    -Math.sign(cameraLookDirectionRef.current.x)
                );
            } else if (lastKeyRef.current === 'right' && canMove.right) {
                newDirection.set(
                    -Math.sign(cameraLookDirectionRef.current.z),
                    cameraLookDirectionRef.current.y,
                    Math.sign(cameraLookDirectionRef.current.x)
                );
            }
        } else {
            // First-person fixed direction movement
            if (lastKeyRef.current === 'forward' && canMove.forward) {
                newDirection.set(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4);
            } else if (lastKeyRef.current === 'backward' && canMove.backward) {
                newDirection.set(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4);
            } else if (lastKeyRef.current === 'left' && canMove.left) {
                newDirection.set(-1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4);
            } else if (lastKeyRef.current === 'right' && canMove.right) {
                newDirection.set(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4);
            }
        }

        // If we can't move in the current direction, maintain the previous valid direction
        if (!newDirection.equals(new THREE.Vector3(0, 0, 0))) {
            setDirectionState(newDirection);
        }

        // Apply movement only if player is not dead
        if (!isPlayerDied) {
            const movement = directionState.clone().multiplyScalar(speedRef.current);
            playerRef.current.setLinvel({ x: movement.x, y: 0, z: movement.z });
        }

        // Handle jumping
        const rayOrigin = playerRef.current.translation();
        const rayDirection = new RAPIER.Vector3(0, -1, 0);
        const world = rapier.world.raw();
        const ray = world.castRay(new RAPIER.Ray(rayOrigin, rayDirection));
        const grounded = ray && ray.collider && Math.abs(velocity.y) <= 0.01;

        if (!isPlayerDied && (jump || jumpRef.current) && grounded) {
            playerRef.current.setLinvel({ x: velocity.x, y: 15, z: velocity.z });
        }

        if (stopRef.current || isPlayerDied) {
            playerRef.current.setLinvel({ x: 0, y: 0, z: 0 });
        }
    });

    return (
        <RigidBody ref={playerRef} position={position} colliders={false} mass={1} lockRotations={true}>
            <group ref={playerMeshRef}>
                <BallCollider args={[1.7]} collisionGroups={interactionGroups(1, [0, 2])} />
            </group>
        </RigidBody>
    );
};

const PlayerWrapper = ({ position }) => {
    const { isPlayerDied } = useContext(DirectionContext);
    return <Player key={isPlayerDied ? 'dead' : 'alive'} position={position} />;
};

export { PlayerWrapper as Player };