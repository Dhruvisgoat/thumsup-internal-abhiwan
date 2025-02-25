// import React, { useRef, useContext, useEffect, useState } from 'react';
// import { useGLTF, useAnimations } from '@react-three/drei';
// import { useFrame } from '@react-three/fiber';
// import { useKeyboardControls } from "@react-three/drei";
// import { MyContext } from './RefContext/Context';
// import { DirectionContext } from './RefContext/DirectionContext';
// import * as THREE from 'three'

// export function Character(props) {
//   // const { playerRef, directionRef, intersectionPointRef,directionState } = useContext(MyContext);
//   const { playerRef, directionRef, intersectionPointRef, skinnedMeshRef, originalMaterialRef } = useContext(MyContext);
//   const { directionState, powerup } = useContext(DirectionContext);

//   // console.log('character rendered')

//   const [, get] = useKeyboardControls();
//   const group = useRef();
//   const { scene, materials, animations, nodes } = useGLTF('/models/characters/girl-transformed.glb');
//   const { actions } = useAnimations(animations, group);

//   // Ref to keep track of the character's current rotation
//   const rotationRef = useRef([0, Math.PI, 0]);

//   // Ref to store the previous translation to compare with the current one
//   const prevPositionRef = useRef({ x: 0, y: 0, z: 0 });

//   // console.log('character re renderd');

//   //adding forward , backward, left, right distances 












//   const [coordinates, setCoordinates] = useState({ x: 0, y: 0, z: 0 });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (playerRef.current) {
//         const x = parseFloat(playerRef.current.translation().x) || 0;
//         const y = parseFloat(playerRef.current.translation().y) || 0;
//         const z = parseFloat(playerRef.current.translation().z) || 0;
//         // setCoordinates({ x, y, z });
//       }
//     }, 100); // Update every 100 milliseconds

//     return () => clearInterval(interval);
//   }, [playerRef, intersectionPointRef]);













//   // useEffect(() => {
//   //   if (skinnedMeshRef.current) {
//   //     // Log the entire skeleton hierarchy
//   //     console.log('Skeleton Bones:', skinnedMeshRef.current.skeleton.bones);

//   //     // If you want to see each bone name and its index
//   //     skinnedMeshRef.current.skeleton.bones.forEach((bone, index) => {
//   //       console.log(`Bone ${index}: ${bone.name}`);
//   //     });

//   //     // Log all the children nodes of the skinned mesh
//   //     console.log('Children of Skinned Mesh:', skinnedMeshRef.current.children);

//   //     // If you want to see each child's details
//   //     skinnedMeshRef.current.children.forEach((child, index) => {
//   //       console.log(`Child ${index}:`, child);
//   //     });
//   //   }
//   // }, []);





//   useFrame(() => {

//     const { forward, backward, left, right, jump } = get();
//     const currentPosition = playerRef.current.translation();

//     // Adjust the rotation based on the input
//     // if (forward|| directionRef.current === 'Up') {
//     //   rotationRef.current = [0, Math.PI, 0]; // Facing forward
//     // } else if (backward || directionRef.current === 'Down') {
//     //   rotationRef.current = [0, 0, 0]; // Facing backward
//     // } else if (left || directionRef.current === 'Left') {
//     //   rotationRef.current = [0, -Math.PI / 2, 0]; // Facing left
//     // } else if (right || directionRef.current === 'Right') {
//     //   rotationRef.current = [0, Math.PI / 2, 0]; // Facing right
//     // }


//     const forwardDistance = intersectionPointRef.current?.forward ? Math.sqrt(Math.pow(intersectionPointRef.current?.forward?.x - playerRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.forward.y - playerRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.forward.z - playerRef.current?.translation().z, 2)).toFixed(1) : 'N/A'
//     const isForwardDistanceGreaterThan3 = forwardDistance === 'N/A' || parseFloat(forwardDistance) > 2;
//     const backwardDistance = intersectionPointRef.current?.backward ? Math.sqrt(Math.pow(intersectionPointRef.current?.backward.x - playerRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.backward.y - playerRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.backward.z - playerRef.current?.translation().z, 2)).toFixed(1) : 'N/A'
//     const isBackwardDistanceGreaterThan3 = backwardDistance === 'N/A' || parseFloat(backwardDistance) > 2;
//     const leftDistance = intersectionPointRef.current?.left ? Math.sqrt(Math.pow(intersectionPointRef.current?.left.x - playerRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.left.y - playerRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.left.z - playerRef.current?.translation().z, 2)).toFixed(1) : 'N/A'
//     const isLeftDistanceGreaterThan3 = leftDistance === 'N/A' || parseFloat(leftDistance) > 2;
//     const rightDistance = intersectionPointRef.current?.right ? Math.sqrt(Math.pow(intersectionPointRef.current?.right.x - playerRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.right.y - playerRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.right.z - playerRef.current?.translation().z, 2)).toFixed(1) : 'N/A'
//     const isRightDistanceGreaterThan3 = rightDistance === 'N/A' || parseFloat(rightDistance) > 2;


//     if ((forward || directionRef.current === 'Up') && isForwardDistanceGreaterThan3) {
//       rotationRef.current = [0, Math.PI, 0]; // Facing forward
//     } else if ((backward || directionRef.current === 'Down') && isBackwardDistanceGreaterThan3) {
//       rotationRef.current = [0, 0, 0]; // Facing backward
//     } else if ((left || directionRef.current === 'Left') && isLeftDistanceGreaterThan3) {
//       rotationRef.current = [0, -Math.PI / 2, 0]; // Facing left
//     } else if ((right || directionRef.current === 'Right') && isRightDistanceGreaterThan3) {
//       rotationRef.current = [0, Math.PI / 2, 0]; // Facing right
//     }

//     // Apply the rotation to the group
//     if (group.current) {
//       // if (group.current && !isPlayerDied) {
//       group.current.rotation.set(...rotationRef.current);
//     }

//     // stop animation and play idle animation  when collision distance in the direction 
//     //which it is moving is less than 2 else play the running animation 

//     // actions["Running"].play();

//     if (((directionState.x < 0 && directionState.z < 0) && isForwardDistanceGreaterThan3) || ((directionState.x > 0 && directionState.z > 0) && isBackwardDistanceGreaterThan3) || ((directionState.x > 0 && directionState.z < 0) && isRightDistanceGreaterThan3) || ((directionState.x < 0 && directionState.z > 0) && isLeftDistanceGreaterThan3)) {
//       // if (powerup) {
//       //   actions["Running"].play();
//       //   actions["Idle"].stop();
//       //   actions["Walking"].stop();
//       // }
//       // else{
//       //   actions["Running"].stop();
//       //   actions["Walking"].play();
//       //   actions["Idle"].stop();
//       // }

//       actions["Running"].play();
//       actions["Idle"].stop();
//     }
//     else {
//       actions["Running"].stop();


//       actions["Walking"].stop();
//       actions["Idle"].play();
//     }
//     if (jump) {
//       actions["Idle"].stop();
//       actions["Jumping"].setLoop(THREE.LoopOnce).reset().play()
//     }

//     // Update the previous position for the next frame
//     prevPositionRef.current = { ...currentPosition };
//   }
//   );

//   return (
//     <>
//       <group
//         ref={group}
//         {...props}
//         dispose={null}
//         scale={[0.1, 0.1, 0.1]}
//         position={[0, 4, 0]}
//         rotation={[0, Math.PI, 0]} // Initial rotation
//       >
//         {/* {!isPlayerDied && ( */}

//         {/* {!invisiblePowerup && */}

//         <group name="AuxScene">
//           <group position={[-0.001, -73.663, 2.168]}>
//             <primitive object={nodes.mixamorigHips} />
//             <skinnedMesh
//               ref={skinnedMeshRef}
//               name="Ch46"
//               geometry={nodes.Ch46.geometry}
//               // material={materials.Ch46_body}
//               skeleton={nodes.Ch46.skeleton}
//             />
//           </group>
//           {/* <mesh position={[0, 80, 0]}>
//               <coneGeometry args={[12, 20, 6]} rotateX={[0,Math.PI/2,0]}/>
//               <meshBasicMaterial color="red" />
//               </mesh> */}
//         </group>


//         {/* } */}
//         {/* )} */}
//       </group>
//     </>
//   );
// }

// useGLTF.preload('/models/characters/girl-transformed.glb');













import React, { useRef, useContext, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from "@react-three/drei";
import { MyContext } from './RefContext/Context';
import { DirectionContext } from './RefContext/DirectionContext';
import * as THREE from 'three'
import { DirContext } from './RefContext/dirContext';

export function Character(props) {
  // const { playerRef, directionRef, intersectionPointRef,directionState } = useContext(MyContext);
  const { playerRef, directionRef, intersectionPointRef, skinnedMeshRef, originalMaterialRef } = useContext(MyContext);
  // const { directionState, powerup } = useContext(DirectionContext);
  const { directionState, powerup } = useContext(DirContext);

  // console.log('character rendered')
  const [, get] = useKeyboardControls();
  const group = useRef();
  const { scene, materials, animations, nodes } = useGLTF('/models/characters/girl-transformed.glb');
  const { actions } = useAnimations(animations, group);

  // Ref to keep track of the character's current rotation
  const rotationRef = useRef([0, Math.PI, 0]);

  // Ref to store the previous translation to compare with the current one
  const prevPositionRef = useRef({ x: 0, y: 0, z: 0 });

  // console.log('character re renderd');

  //adding forward , backward, left, right distances 

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const x = parseFloat(playerRef.current.translation().x) || 0;
        const y = parseInt(playerRef.current.translation().y) || 0;
        const z = parseFloat(playerRef.current.translation().z) || 0;
        // setCoordinates({ x, y, z });
      }
    }, 100); // Update every 100 milliseconds

    return () => clearInterval(interval);
  }, [playerRef, intersectionPointRef]);




  useFrame(() => {

    const { forward, backward, left, right, jump } = get();
    const currentPosition = playerRef.current.translation();

    // Adjust the rotation based on the input
    // if (forward|| directionRef.current === 'Up') {
    //   rotationRef.current = [0, Math.PI, 0]; // Facing forward
    // } else if (backward || directionRef.current === 'Down') {
    //   rotationRef.current = [0, 0, 0]; // Facing backward
    // } else if (left || directionRef.current === 'Left') {
    //   rotationRef.current = [0, -Math.PI / 2, 0]; // Facing left
    // } else if (right || directionRef.current === 'Right') {
    //   rotationRef.current = [0, Math.PI / 2, 0]; // Facing right
    // }


    const forwardDistance = intersectionPointRef.current?.forward ? Math.sqrt(Math.pow(intersectionPointRef.current?.forward?.x - playerRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.forward.y - playerRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.forward.z - playerRef.current?.translation().z, 2)).toFixed(1) : 'N/A'
    const isForwardDistanceGreaterThan3 = forwardDistance === 'N/A' || parseFloat(forwardDistance) > 2;
    const backwardDistance = intersectionPointRef.current?.backward ? Math.sqrt(Math.pow(intersectionPointRef.current?.backward.x - playerRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.backward.y - playerRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.backward.z - playerRef.current?.translation().z, 2)).toFixed(1) : 'N/A'
    const isBackwardDistanceGreaterThan3 = backwardDistance === 'N/A' || parseFloat(backwardDistance) > 2;
    const leftDistance = intersectionPointRef.current?.left ? Math.sqrt(Math.pow(intersectionPointRef.current?.left.x - playerRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.left.y - playerRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.left.z - playerRef.current?.translation().z, 2)).toFixed(1) : 'N/A'
    const isLeftDistanceGreaterThan3 = leftDistance === 'N/A' || parseFloat(leftDistance) > 2;
    const rightDistance = intersectionPointRef.current?.right ? Math.sqrt(Math.pow(intersectionPointRef.current?.right.x - playerRef.current?.translation().x, 2) + Math.pow(intersectionPointRef.current?.right.y - playerRef.current?.translation().y, 2) + Math.pow(intersectionPointRef.current?.right.z - playerRef.current?.translation().z, 2)).toFixed(1) : 'N/A'
    const isRightDistanceGreaterThan3 = rightDistance === 'N/A' || parseFloat(rightDistance) > 2;


    if ((forward || directionRef.current === 'Up') && isForwardDistanceGreaterThan3) {
      rotationRef.current = [0, Math.PI, 0]; // Facing forward
    } else if ((backward || directionRef.current === 'Down') && isBackwardDistanceGreaterThan3) {
      rotationRef.current = [0, 0, 0]; // Facing backward
    } else if ((left || directionRef.current === 'Left') && isLeftDistanceGreaterThan3) {
      rotationRef.current = [0, -Math.PI / 2, 0]; // Facing left
    } else if ((right || directionRef.current === 'Right') && isRightDistanceGreaterThan3) {
      rotationRef.current = [0, Math.PI / 2, 0]; // Facing right
    }

    // Apply the rotation to the group
    if (group.current) {
      // if (group.current && !isPlayerDied) {
      group.current.rotation.set(...rotationRef.current);
    }

    // stop animation and play idle animation  when collision distance in the direction 
    //which it is moving is less than 2 else play the running animation 

    // actions["Running"].play();

    if (((directionState.x < 0 && directionState.z < 0) && isForwardDistanceGreaterThan3) || ((directionState.x > 0 && directionState.z > 0) && isBackwardDistanceGreaterThan3) || ((directionState.x > 0 && directionState.z < 0) && isRightDistanceGreaterThan3) || ((directionState.x < 0 && directionState.z > 0) && isLeftDistanceGreaterThan3)) {
      // if (powerup) {
      //   actions["Running"].play();
      //   actions["Idle"].stop();
      //   actions["Walking"].stop();
      // }
      // else{
      //   actions["Running"].stop();
      //   actions["Walking"].play();
      //   actions["Idle"].stop();
      // }

      actions["Running"].play();
      actions["Idle"].stop();
    }
    else {
      actions["Running"].stop();


      actions["Walking"].stop();
      actions["Idle"].play();
    }
    if (jump) {
      actions["Idle"].stop();
      // actions["Jumping"].setLoop(THREE.LoopOnce).reset().play();
    }

    // Update the previous position for the next frame
    prevPositionRef.current = { ...currentPosition };
  }
  );

  return (
    <>
      <group ref={group}  {...props} dispose={null} position={[0, -2.5, 0]} scale={[0.05, 0.05, 0.05]} rotation={[0, Math.PI, 0]} >
        <group name="AuxScene">
          <group position={[-0.001, -73.663, 2.168]}>
            <primitive object={nodes.mixamorigHips} />
            <skinnedMesh ref={skinnedMeshRef} name="Ch46" geometry={nodes.Ch46.geometry}
              // material={materials.Ch46_body}
              skeleton={nodes.Ch46.skeleton}
            />
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload('/models/characters/girl-transformed.glb');
