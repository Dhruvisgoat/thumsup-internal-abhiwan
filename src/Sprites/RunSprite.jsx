import { Sprite } from 'three';
import { useRef, useMemo, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { useContext } from 'react';
import { TextureLoader } from 'three';
import { DirectionContext } from '../RefContext/DirectionContext';
import { MyContext } from '../RefContext/Context';

function RunSprite() {
    const { isPlayerDied, coordinates, invisiblePowerup } = useContext(DirectionContext);
    const { playerRef } = useContext(MyContext);
    const spriteRef = useRef();

    const texture = useMemo(() => useLoader(TextureLoader, 'Sprites/flash.png'), []);

    const spriteFrames = useMemo(() => {
        const frames = [];
        const xCount = 8; // Number of columns
        const yCount = 1; // Number of rows
        for (let i = 0; i < xCount; i++) {
            frames.push([i / xCount, 0, 1 / xCount, 1 / yCount]);
        }
        return frames;
    }, []);

    const currentFrame = useRef(0);
    const interval = useRef(0.05);
    const elapsedTime = useRef(0);
    const isAnimating = useRef(false);

    useFrame((_, delta) => {
        if (!isAnimating.current || !spriteRef.current) return;

        elapsedTime.current += delta;

        if (elapsedTime.current > interval.current) {
            elapsedTime.current = 0;
            currentFrame.current = (currentFrame.current + 1) % spriteFrames.length;

            const [u, v, uWidth, vHeight] = spriteFrames[currentFrame.current];
            texture.offset.set(u, v);
            texture.repeat.set(uWidth, vHeight);
        }
    });

    useEffect(() => {
        if (spriteRef.current) {
            if (invisiblePowerup) {
                isAnimating.current = true;
                spriteRef.current.visible = true;
                spriteRef.current.position.set(coordinates.x, 0, coordinates.z);
            } else {
                isAnimating.current = false;
                spriteRef.current.visible = false;
            }
        }
    }, [invisiblePowerup, coordinates]);

    return (
        <sprite
            ref={spriteRef}
            visible={false}
            scale={15}
            position={[0, 1, 0]}
            renderOrder={999} 
        >
            <spriteMaterial
                map={texture}
                depthTest={false} 
                depthWrite={false}
                // opacity={0.9}
                // transparent={true}
                // alphaTest={0.5}
                // depthWrite={true}
                // depthTest={true}
            />
        </sprite>
    );
}

export default RunSprite;