import { Sprite } from 'three';
import { useRef, useMemo, useEffect, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { useContext } from 'react';
import { TextureLoader } from 'three';
import { DirectionContext } from '../RefContext/DirectionContext';
import { MyContext } from '../RefContext/Context';
import { CapRemoveIdContext } from '../RefContext/CapRemoveId';

const SparkleSpriteWrapper = () => {
  const {
    collectedCountBiryani,
    collectedCountCoke,
    powerup,
    invisiblePowerup
  } = useContext(DirectionContext);

  const [showDieSprite, setShowDieSprite] = useState(false);

  useEffect(() => {
    setShowDieSprite(true); // Show component C when d changes
    const timer = setTimeout(() => setShowDieSprite(false), 300); // Remove C after 1 second

    return () => clearTimeout(timer); // Cleanup timer on component unmount or d change
  }, [collectedCountBiryani, collectedCountCoke,
    // powerup, invisiblePowerup
  ]);

  return <>{showDieSprite && <DieSprite />}</>;
};

export default SparkleSpriteWrapper;

function DieSprite({ position = [0, 3, 0] }) {
  const { coordinates } = useContext(DirectionContext);
  const { playerRef } = useContext(MyContext);
  const spriteRef = useRef();
  const { spritePositionRef } = useContext(CapRemoveIdContext);

  // Preload the texture and memoize it
  const texture = useMemo(() => useLoader(TextureLoader, 'Sprites/flash.png'), []);

  // Memoize frame calculations to avoid recalculations
  const spriteFrames = useMemo(() => {
    const frames = [];
    const xCount = 8; // Number of columns
    const yCount = 1; // Number of rows
    //   for (let i = 0; i < xCount; i++) {
    //     frames.push([i / xCount, 0, 1 / xCount, 1 / yCount]);
    //   }
    //   return frames;
    // }, []);


    for (let y = 0; y < yCount; y++) {  // Iterate over rows
      for (let x = 0; x < xCount; x++) {  // Iterate over columns
        frames.push([x / xCount, 1 - (y + 1) / yCount, 1 / xCount, 1 / yCount]);  // Correct UV for each frame
      }
    }
    return frames;
  }, []);

  // Track current frame for animation
  const currentFrame = useRef(0);
  const interval = useRef(0.02); // Set interval between frames
  const elapsedTime = useRef(0);

  useFrame((_, delta) => {
    if (!spriteRef.current) return;

    // Update animation frame based on elapsed time
    elapsedTime.current += delta;
    if (elapsedTime.current > interval.current) {
      elapsedTime.current = 0;
      currentFrame.current = (currentFrame.current + 1) % spriteFrames.length;

      // Set texture UV coordinates to the current frame
      const [u, v, uWidth, vHeight] = spriteFrames[currentFrame.current];
      texture.offset.set(u, v);
      texture.repeat.set(uWidth, vHeight);
    }
  });


  // Update sprite position based on coordinates
  useEffect(() => {
    if (spriteRef.current) {
      // spriteRef.current.position.set(coordinates.x, 0, coordinates.z);
      // spriteRef.current.position.set(13, 0, 12);
      // spriteRef.current.position.set(position[0], position[1], position[2]);
      spriteRef.current.position.set(spritePositionRef.current[0], spritePositionRef.current[1], spritePositionRef.current[2]);
    }
  }, [coordinates]);

  return (
    <>
      <sprite
        ref={spriteRef}
        scale={25}
        position={[0, 2.5, 0]}
      >
        <spriteMaterial
          map={texture}
          opacity={1}
          transparent={true}
          alphaTest={0.5}
          depthWrite={true}
          depthTest={true}
        />
      </sprite>
    </>
  );
}