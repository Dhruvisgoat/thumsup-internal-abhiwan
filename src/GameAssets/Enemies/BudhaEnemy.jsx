import React, { useEffect, useRef } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three'

export function BudhaEnemy(props) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/Enemies/budhaEnemy-transformed.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && actions["OneHandSwordCombo"]) {
      const action = actions["OneHandSwordCombo"];
      action.play();
      action.setLoop(THREE.LoopRepeat, Infinity); // Set the animation to loop if needed
    }
  }, [actions]); // Run this effect once when actions are available

  return (
    <group ref={group} {...props} dispose={null} >
      <group name="AuxScene" >
        <group position={[-0.001, -40.523, -4.468]}>
          <primitive object={nodes.mixamorigHips} />
        </group>
        <skinnedMesh name="mixamorigShoes_Geo" geometry={nodes.mixamorigShoes_Geo.geometry} material={materials.Clothes_MAT} skeleton={nodes.mixamorigShoes_Geo.skeleton} position={[-0.001, -99.523, -4.468]} />
        <skinnedMesh name="mixamorigCigar_Geo" geometry={nodes.mixamorigCigar_Geo.geometry} material={materials.Clothes_MAT} skeleton={nodes.mixamorigCigar_Geo.skeleton} position={[-0.001, -99.523, -4.468]} />
        <skinnedMesh name="mixamorigJacket_Geo" geometry={nodes.mixamorigJacket_Geo.geometry} material={materials.Clothes_MAT} skeleton={nodes.mixamorigJacket_Geo.skeleton} position={[-0.001, -99.523, -4.468]} />
        <skinnedMesh name="mixamorigHead_Geo" geometry={nodes.mixamorigHead_Geo.geometry} material={materials.Clothes_MAT} skeleton={nodes.mixamorigHead_Geo.skeleton} position={[-0.001, -99.523, -4.468]} />
        <skinnedMesh name="mixamorigTeeth_Down_Geo" geometry={nodes.mixamorigTeeth_Down_Geo.geometry} material={materials.Clothes_MAT} skeleton={nodes.mixamorigTeeth_Down_Geo.skeleton} position={[-0.001, -99.523, -4.468]} />
        <skinnedMesh name="mixamorigHat_Geo" geometry={nodes.mixamorigHat_Geo.geometry} material={materials.Clothes_MAT} skeleton={nodes.mixamorigHat_Geo.skeleton} position={[-0.001, -99.523, -4.468]} />
        <skinnedMesh name="mixamorigTeeth_Up_Geo" geometry={nodes.mixamorigTeeth_Up_Geo.geometry} material={materials.Clothes_MAT} skeleton={nodes.mixamorigTeeth_Up_Geo.skeleton} position={[-0.001, -99.523, -4.468]} />
        <skinnedMesh name="mixamorigR_Eye_Geo" geometry={nodes.mixamorigR_Eye_Geo.geometry} material={materials.Clothes_MAT} skeleton={nodes.mixamorigR_Eye_Geo.skeleton} position={[-0.001, -99.523, -4.468]} />
        <skinnedMesh name="mixamorigL_Eye_Geo" geometry={nodes.mixamorigL_Eye_Geo.geometry} material={materials.Clothes_MAT} skeleton={nodes.mixamorigL_Eye_Geo.skeleton} position={[-0.001, -99.523, -4.468]} />
        <skinnedMesh name="mixamorigPants_Geo" geometry={nodes.mixamorigPants_Geo.geometry} material={materials.Clothes_MAT} skeleton={nodes.mixamorigPants_Geo.skeleton} position={[-0.001, -99.523, -4.468]} />
        <skinnedMesh name="mixamorigArms_Geo" geometry={nodes.mixamorigArms_Geo.geometry} material={materials.Clothes_MAT} skeleton={nodes.mixamorigArms_Geo.skeleton} position={[-0.001, -99.523, -4.468]} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/Enemies/budhaEnemy-transformed.glb');
