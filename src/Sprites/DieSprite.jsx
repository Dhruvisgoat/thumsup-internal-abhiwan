import { Sprite } from 'three';
import { useRef, useMemo, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { useContext } from 'react';
import { TextureLoader } from 'three';
import { DirectionContext } from '../RefContext/DirectionContext';
import { MyContext } from '../RefContext/Context';

function DieSprite() {
  const { isPlayerDied, coordinates } = useContext(DirectionContext);
  const { playerRef } = useContext(MyContext);
  const spriteRef = useRef();

  const texture = useMemo(() => useLoader(TextureLoader, 'Sprites/bigboom.png'), []);

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
  const interval = useRef(0.1); // Interval between frames
  const elapsedTime = useRef(0);
  const animationTime = useRef(0); // Tracks total animation time
  const isAnimating = useRef(false); // Controls animation state

  useFrame((_, delta) => {
    // if (!isAnimating.current || !spriteRef.current) return;

    elapsedTime.current += delta;
    animationTime.current += delta;

    if (elapsedTime.current > interval.current) {
      elapsedTime.current = 0;
      currentFrame.current = (currentFrame.current + 1) % spriteFrames.length;

      const [u, v, uWidth, vHeight] = spriteFrames[currentFrame.current];
      texture.offset.set(u, v);
      texture.repeat.set(uWidth, vHeight);
    }

    // Stop animation after 5 seconds
    if (animationTime.current >= 0.6) {
      isAnimating.current = false;
      spriteRef.current.visible = false;
    }
  });

  useEffect(() => {
    if (spriteRef.current) {
      if (isPlayerDied === true) {
        currentFrame.current = 0;
        isAnimating.current = true;
        animationTime.current = 0;
        spriteRef.current.visible = true;
        // spriteRef.current.position.set(coordinates.x, 0, coordinates.z);
        spriteRef.current.position.set(0, 0, 0);
      } else {
        // isAnimating.current = false;
        // spriteRef.current.visible = false;
      }
    }
  }, [isPlayerDied]);

  return (
    <sprite
      ref={spriteRef}
      visible={false}
      // scale={10}
      scale={4}
      position={[0, 5, 0]}
    >
      <spriteMaterial
        map={texture}
        opacity={0.9}
        transparent={true}
        alphaTest={0.5}
        depthWrite={true}
        depthTest={true}
      />
    </sprite>
  );
}

export default DieSprite;

























