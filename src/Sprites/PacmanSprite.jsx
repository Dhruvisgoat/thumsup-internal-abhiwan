import { useRef, useMemo, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { useContext } from 'react';
import { TextureLoader } from 'three';
import { MyContext } from '../RefContext/Context';
import * as THREE from 'three';

function PacmanSprite() {
    const { playerRef } = useContext(MyContext);
    const spriteRef = useRef();
    const texture = useMemo(() => useLoader(TextureLoader, 'Sprites/pacman.png'), []);

    const spriteFrames = useMemo(() => {
        const frames = [];
        const xCount = 7;
        const yCount = 1;
        for (let i = 0; i < xCount; i++) {
            frames.push([i / xCount, 0, 1 / xCount, 1 / yCount]);
        }
        return frames;
    }, []);

    const currentFrame = useRef(0);
    const interval = useRef(0.05);
    const elapsedTime = useRef(0);
    const lastRotationRef = useRef(Math.PI / 4);

    useFrame((_, delta) => {
        if (!spriteRef.current || !playerRef.current) return;

        const velocity = playerRef.current.linvel();
        const isMoving = Math.abs(velocity.x) > 10 || Math.abs(velocity.z) > 10;

        // Update position
        spriteRef.current.position.set(
            playerRef.current.translation().x,
            -1.9,
            playerRef.current.translation().z
        );

        // Update rotation only if moving; otherwise, retain last rotation
        if (isMoving) {
            lastRotationRef.current = Math.atan2(velocity.x, velocity.z) - Math.PI / 2;
        }
        spriteRef.current.rotation.y = lastRotationRef.current;

        // Handle animation frame updates only when moving
        if (isMoving) {
            elapsedTime.current += delta;
            if (elapsedTime.current > interval.current) {
                elapsedTime.current = 0;
                currentFrame.current = (currentFrame.current + 1) % spriteFrames.length;
            }
        } else {
            // Set to second frame (index 1) when not moving
            currentFrame.current = 3;
        }

        // Update texture coordinates regardless of movement
        const [u, v, uWidth, vHeight] = spriteFrames[currentFrame.current];
        texture.offset.set(u, v);
        texture.repeat.set(uWidth, vHeight);
    });

    return (
        <group ref={spriteRef}>
            <mesh scale={15} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial
                    map={texture}
                    transparent
                    depthWrite={false}
                    depthTest={false}
                    alphaTest={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}

export default PacmanSprite;