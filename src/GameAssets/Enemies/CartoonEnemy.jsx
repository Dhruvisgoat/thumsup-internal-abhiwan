import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useEffect } from 'react'
import * as THREE from 'three'

export function CartoonEnemy(props) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/models/Enemies/cartoonEnemy-transformed.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)

  console.log(actions);

  useEffect(() => {
    if (actions && actions["OneHandClubCombo"]) {
      const action = actions["OneHandClubCombo"];
      action.play();
      action.setLoop(THREE.LoopRepeat, Infinity); // Set the animation to loop if needed
    }
  }, [actions]); // Run this effect once when actions are available

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="AuxScene">
        <group position={[-0.114, -40.908, -2.456]}>
          <primitive object={nodes.mixamorig1Hips} />
        </group>
        <skinnedMesh name="Ch19" geometry={nodes.Ch19.geometry} material={materials.Ch19_Body} skeleton={nodes.Ch19.skeleton} position={[-0.114, -80.908, -2.456]} />
      </group>
    </group>
  )
}

useGLTF.preload('models/Enemies/cartoonEnemy-transformed.glb')
