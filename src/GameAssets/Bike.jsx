import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useEffect } from 'react'
import * as THREE from 'three'

export function Bike(props) {
    const group = React.useRef()    
    const { scene, animations } = useGLTF('/models/gameAssets/bike-transformed.glb')
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes, materials } = useGraph(clone)
    const { actions } = useAnimations(animations, group)

    useEffect(() => {

        if (actions && actions["M_rig_Action_S"]) {
            const action = actions["M_rig_Action_S"];
            action.play();
            action.setLoop(THREE.LoopRepeat, Infinity); // Set the animation to loop if needed
        }
    }, [actions]); // Run this effect once when actions are available

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Sketchfab_Scene">
                <primitive object={nodes._rootJoint} />
                <skinnedMesh name="Object_12" geometry={nodes.Object_12.geometry} material={materials.Jo_material} skeleton={nodes.Object_12.skeleton} rotation={[-Math.PI / 2, 0, 0]} scale={0.752} />
                <skinnedMesh name="Object_14" geometry={nodes.Object_14.geometry} material={materials.Jo_material} skeleton={nodes.Object_14.skeleton} rotation={[-Math.PI / 2, 0, 0]} scale={0.752} />
                <skinnedMesh name="Object_16" geometry={nodes.Object_16.geometry} material={materials.Jo_material} skeleton={nodes.Object_16.skeleton} rotation={[-Math.PI / 2, 0, 0]} scale={0.752} />
                <skinnedMesh name="Object_18" geometry={nodes.Object_18.geometry} material={materials.Jo_material} skeleton={nodes.Object_18.skeleton} rotation={[-Math.PI / 2, 0, 0]} scale={0.752} />
            </group>
        </group>
    )
}

useGLTF.preload('/models/gameAssets/bike-transformed.glb')
