import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function VFXSprite({ imageUrl, columns = 1, rows =1, fps = 5, ...props }) {
  const texture = useLoader(TextureLoader, imageUrl);
  const ref = useRef();

  // Calculate frames based on a sprite sheet grid
  const frames = useMemo(() => {
    const totalFrames = columns * rows;
    const frameWidth = 1 / columns;
    const frameHeight = 1 / rows;
    
    const frameData = [];
    for (let i = 0; i < totalFrames; i++) {
      const column = i % columns;
      const row = Math.floor(i / columns);
      
      frameData.push({
        u: column * frameWidth,
        v: 1 - (row + 1) * frameHeight, // Flip V coordinate because texture coordinates start from bottom
        width: frameWidth,
        height: frameHeight
      });
    }
    return frameData;
  }, [columns, rows]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    
    const time = Math.floor(clock.getElapsedTime() * fps) % frames.length;
    const frame = frames[time];
    
    if (texture && ref.current.material) {
      ref.current.material.map = texture;
      ref.current.material.map.offset.set(frame.u, frame.v);
      ref.current.material.map.repeat.set(frame.width, frame.height);
      ref.current.material.needsUpdate = true;
    }
  });

  return (
    <sprite ref={ref} {...props}>
      <spriteMaterial transparent={true} />
    </sprite>
  );
}

export default VFXSprite;