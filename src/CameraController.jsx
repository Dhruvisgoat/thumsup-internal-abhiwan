import React, { useContext, useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MyContext } from './RefContext/Context';
import { ViewContext } from './RefContext/ViewContext';
import { OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import { DirContext } from './RefContext/dirContext';

const CameraController = () => {
  const { directionState } = useContext(DirContext);
  const { cameraLookDirectionRef, playerRef } = useContext(MyContext);
  const { viewMode, isIsometric } = useContext(ViewContext);
  const { camera } = useThree();
  const cameraRef = useRef();
  const cameraPositionRef = useRef(new THREE.Vector3());
  const cameraTargetRef = useRef(new THREE.Vector3());
  const [direction, setDirection] = useState('Stationary');

  const dampingFactor = 0.3;
  const rotatingDampingFactor = 0.3;

  useEffect(() => {
    const { x, z } = directionState;
    if (x > 0 && z > 0) setDirection('down');
    else if (x < 0 && z < 0) setDirection('up');
    else if (x < 0 && z > 0) setDirection('left');
    else if (x > 0 && z < 0) setDirection('right');
    else setDirection('Stationary');
  }, [directionState]);

  const getOffset = () => {
    if (viewMode === '3rd') {
      return {
        up: new THREE.Vector3(13, 8, 13),
        left: new THREE.Vector3(13, 8, -13),
        right: new THREE.Vector3(-13, 8, 13),
        down: new THREE.Vector3(-13, 8, -13),
      }[direction] || new THREE.Vector3(23, 10, 23);
    }
    if (viewMode === 'side') return new THREE.Vector3(10, 60, 20);
    if (viewMode === 'top') return new THREE.Vector3(1, 200, 1);
    return new THREE.Vector3(23, 30, 23);
  };

  useFrame(() => {
    if (!playerRef.current) return;
    const playerPos = new THREE.Vector3(
      playerRef.current.translation().x,
      1,
      playerRef.current.translation().z
    );
    const desiredPosition = playerPos.clone().add(getOffset());
    cameraPositionRef.current.lerp(desiredPosition, rotatingDampingFactor);
    cameraTargetRef.current.lerp(playerPos, dampingFactor);

    if (isIsometric) {
      camera.zoom = viewMode === 'top' ? 2 : viewMode === 'side' ? 3.25 * Math.pow(window.innerWidth, 0.13) : 20;
    }

    if (viewMode === 'top') {
      camera.position.set(0, 200, 0);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      camera.rotation.z = Math.PI / 4;
      camera.zoom = 2.5;
    } else {
      camera.position.copy(cameraPositionRef.current);
      camera.lookAt(cameraTargetRef.current.clone().setY(cameraTargetRef.current.y + 0));
      // camera.fov = 105;
      camera.aspect = window.innerWidth / window.innerHeight * 1.2;
      camera.updateProjectionMatrix();
    }

    cameraLookDirectionRef.current = new THREE.Vector3()
      .subVectors(cameraTargetRef.current, cameraPositionRef.current)
      .setY(0)
      .normalize();
  });

  useEffect(() => {
    if (playerRef.current) {
      const playerPos = new THREE.Vector3(
        playerRef.current.translation().x,
        playerRef.current.translation().y,
        playerRef.current.translation().z
      );
      const initialCameraPos = playerPos.clone().add(getOffset());
      camera.position.copy(initialCameraPos);
      camera.lookAt(playerPos);
      cameraPositionRef.current.copy(initialCameraPos);
      cameraTargetRef.current.copy(playerPos);
    }
  }, [camera, playerRef]);

  return (
    <group>
      {isIsometric ? (
        <OrthographicCamera ref={cameraRef} far={10000} near={-10000} makeDefault />
      ) : (
        <PerspectiveCamera ref={cameraRef} makeDefault />
      )}
    </group>
  );
};

export default CameraController;