import React, { createContext, useRef, useState } from 'react';
import * as THREE from "three";

// Create a Context
export const MyContext = createContext();

// Create a Provider component
export const MyProvider = ({ children }) => {
  const playerRef = useRef();// to track player's moment details 
  const directionRef = useRef(null); // Ref to store movement direction in mobile
  const piyushMazeRef = useRef(null);// to get the scene's ref
  const intersectionPointRef = useRef(null);// to get the point where the raycast hits the wall 
  // const distanceFromEnemyRef = useRef({ id:0, distance: 1000 }); // Store id and distance together
  const distanceFromEnemyRef = useRef([]); // Store id and distance together
  const speedRef = useRef(10);
  const skinnedMeshRef = useRef();
  const originalMaterialRef = useRef({});
  const jumpRef = useRef(false);
  const cameraLookDirectionRef = useRef();
  const playerMeshRef = useRef();
  const stopRef = useRef();
  const capAudioRef = useRef(false);

  // const distancesFromEnemyRef = useRef({ id:0, distance: 1000 }); // Store id and distance together
  // const [directionState, setDirectionState] = useState(new THREE.Vector3(0, 0, 0));


  const audioRefs = useRef({});
  const setAudioRef = (audioSource, ref) => {
    audioRefs.current[audioSource] = ref;
  };

  const getAudioRef = (audioSource) => {
    return audioRefs.current[audioSource];
  };

  return (
    <MyContext.Provider value={{
      playerMeshRef,
      jumpRef,
      originalMaterialRef,
      skinnedMeshRef,
      audioRefs, setAudioRef, getAudioRef,
      playerRef, directionRef, piyushMazeRef, intersectionPointRef, distanceFromEnemyRef, speedRef,
      cameraLookDirectionRef,
      stopRef, capAudioRef
      // directionState, setDirectionState
    }}>
      {children}
    </MyContext.Provider>
  );
};
