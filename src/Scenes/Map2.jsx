import React from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';
import { MyContext } from '../RefContext/Context';
import { CuboidCollider } from '@react-three/rapier';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Caps } from '../GameAssets/Cap';
import { useRef } from 'react';
import RandomPointOnMesh from '../HelperUtilsGame/RandomPointGenerator/RandomPointOnMesh'
import { useState } from 'react';
import { getRandomPointOnGeometry } from '../HelperUtilsGame/RandomPointGenerator/RandomPointGenerator';
import { interactionGroups } from '@react-three/rapier';
import { openDB } from 'idb';
import * as THREE from 'three';
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";


function Map2() {

  const sceneRef = useRef();

  const { piyushMazeRef } = useContext(MyContext);
  const roundBlockadesRef = useRef();
  const sahilMazeRef = useRef();

  const [modelURL, setModelURL] = useState(null);


  // const { scene: map } = useGLTF('/models/Scene/thumsupNewmapp16jan-transformed.glb');
  const { scene: map } = useGLTF('/models/updatedGameAssets/Map_05-transformed.glb');
  //cdn image kit map url but it is old versino of map whihc consists flickering issue
  // const { scene: map } = useGLTF('https://ik.imagekit.io/59j0wnl84x/newMapThumsup-transformed.glb?updatedAt=1737357964231');
  const { scene: blockades } = useGLTF('/models/Scene/thumsupMap-blockades.glb');
  const { scene: blockadesRound } = useGLTF('/models/Scene/LL-1 Blockers(15-01).glb');
  const { scene: bigblockadesRound } = useGLTF('/models/Scene/25janBlockade.glb');
  const { scene: roadBlockades } = useGLTF('/models/Scene/thumsupMapp-roadBlockades.glb');


  useEffect(() => {

    if (piyushMazeRef.current || roundBlockadesRef.current) {

      piyushMazeRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 0; // Make the mesh invisible
          child.material.depthWrite = false;
        }
      });

      roundBlockadesRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 0; // Make the mesh invisible
          child.material.depthWrite = false;
        }
      });

      sahilMazeRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 0; // Make the mesh invisible
          child.material.depthWrite = false;
        }
      });

      map.traverse((child) => {
        if (child.isMesh) {
          child.frustumCulled = false;
          child.geometry.computeBoundingSphere();
          child.geometry.attributes.position.usage = THREE.StaticDrawUsage;
        }
      });

    }
  }, [piyushMazeRef, roundBlockadesRef, sahilMazeRef, map])







  return (
    <>
      <primitive ref={piyushMazeRef} rotation={[0, Math.PI / 4, 0]} scale={[3, 15, 3]} position={[0, -15, 0]} object={blockadesRound} />

      <RigidBody colliders={"trimesh"} type="fixed"
        collisionGroups={interactionGroups(0, [1, 2])}
      >
        {/* <primitive ref={piyushMazeRef} rotation={[0, Math.PI / 4, 0]} scale={[3, 15, 3]} position={[0, -15, 0]} object={blockadesRound} /> */}

        <primitive ref={sahilMazeRef} rotation={[0, Math.PI / 4, 0]} scale={[3, 15, 3]} position={[0, -15, 0]} object={bigblockadesRound} />

        {/* <primitive ref={piyushMazeRef} rotation={[0, Math.PI / 4, 0]} scale={[3, 15, 3]} position={[0, -15, 0]} object={blockades} /> */}
      </RigidBody>

      <RigidBody colliders={"trimesh"} type="fixed"
        collisionGroups={interactionGroups(3, [2])}
      >
        {/* <primitive ref={roundBlockadesRef} rotation={[0, Math.PI / 4, 0]} scale={[3, 15, 3]} position={[2, -15, 2]} object={roadBlockades} /> */}
        <primitive ref={roundBlockadesRef} rotation={[0, Math.PI / 4, 0]} scale={[3, 15, 3]} position={[0, -15, 0]} object={roadBlockades} />
      </RigidBody>

      <group  rotation={[0, Math.PI / 4, 0]} scale={3} position={[0, -5, 0]}>
        <primitive ref={sceneRef} object={map} />
      </group>

      {/* <RandomPointOnMesh /> */}

    </>
  )
}

useGLTF.preload('/models/updatedGameAssets/Map_05-transformed.glb');
useGLTF.preload('/models/Scene/thumsupMap-blockades.glb');
useGLTF.preload('/models/Scene/LL-1 Blockers(15-01).glb');
useGLTF.preload('/models/Scene/25janBlockade.glb');
useGLTF.preload('/models/Scene/thumsupMapp-roadBlockades.glb');

export default Map2



