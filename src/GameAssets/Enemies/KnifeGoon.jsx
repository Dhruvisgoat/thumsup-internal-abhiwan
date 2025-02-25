
import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useEffect } from 'react'
import * as THREE from 'three'


export function KnifeGoon(props) {
    const group = React.useRef()
    const { scene, animations } = useGLTF('/models/updatedGameAssets/KnifeGoon-transformed.glb')
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes, materials } = useGraph(clone)
    const { actions } = useAnimations(animations, group)

    useEffect(() => {

        if (actions && actions["Slash"]) {
            const action = actions["Slash"];
            action.play();
            action.setLoop(THREE.LoopRepeat, Infinity); // Set the animation to loop if needed
        }
        if (actions && actions["Walk"]) {
            const action = actions["Walk"];
            action.play();
            action.setLoop(THREE.LoopRepeat, Infinity); // Set the animation to loop if needed
        }
    }, [actions]); // Run this effect once when actions are available

    return (
        <group ref={group} {...props} dispose={null} scale={0.4} rotation={[0, 3 * Math.PI / 4, 0]} position={[0, -1, 0]} >
            <group name="Scene">
                <group name="Armature001" rotation={[Math.PI / 2, 0, 0]} scale={0.1}>
                    <primitive object={nodes.mixamorigHips} />
                </group>
                <skinnedMesh name="Hats" geometry={nodes.Hats.geometry} material={materials.Hatmat} skeleton={nodes.Hats.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
                <skinnedMesh name="Masks002" geometry={nodes.Masks002.geometry} material={materials.Maskmat} skeleton={nodes.Masks002.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
                <skinnedMesh name="model_0003" geometry={nodes.model_0003.geometry} material={materials['Material.001']} skeleton={nodes.model_0003.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
                <skinnedMesh name="PowerPlantA002" geometry={nodes.PowerPlantA002.geometry} material={materials['PowerPlantA.002']} skeleton={nodes.PowerPlantA002.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
            </group>
        </group>
    )
}

useGLTF.preload('/models/updatedGameAssets/KnifeGoon-transformed.glb')














