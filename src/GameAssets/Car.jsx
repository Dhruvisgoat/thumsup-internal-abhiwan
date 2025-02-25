import React from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'

export function Car(props) {
    const group = React.useRef()
    const { nodes, materials, animations } = useGLTF('/models/gameAssets/car-transformed.glb')
    const { actions } = useAnimations(animations, group)

       // Modify material properties after loading
       useEffect(() => {
        // Example: Change color of the material
        if (materials) {
            // Assuming 'carMaterial' is the material's name in the GLTF model
            const carMaterial = materials['PaletteMaterial001'];
            if (carMaterial) {
                carMaterial.color.set('silver');  // Set to red
                carMaterial.roughness = 0.4;      // Adjust roughness
                carMaterial.metalness = 0;      // Adjust metalness
                // carMaterial.emissive.set(0x00ff00); // Add emissive green glow
            }
        }
    }, [materials]);


    useEffect(() => {

        if (actions && actions["Car engine"]) {
            const action = actions["Car engine"];
            action.play();
            action.setLoop(THREE.LoopRepeat, Infinity); // Set the animation to loop if needed
        }
    }, [actions]); // Run this effect once when actions are available

    return (
        // <RigidBody type="fixed" colliders="cuboid">
        <group ref={group} {...props} dispose={null} scale={[0.008,0.02,0.008]} rotation={[0, Math.PI / 4, 0]}>
            <group name="Sketchfab_Scene">
                <group name="RootNode">
                    <group name="Spring" position={[155.621, 20.722, -81.958]} rotation={[-0.209, Math.PI / 2, 0]} scale={2.803}>
                        <mesh name="Spring_Light_black_0" geometry={nodes.Spring_Light_black_0.geometry} material={materials.PaletteMaterial001} />
                    </group>
                    <group name="Spring001" position={[-128.512, 20.722, -81.958]} rotation={[-0.209, Math.PI / 2, 0]} scale={2.803}>
                        <mesh name="Spring001_Light_black_0" geometry={nodes.Spring001_Light_black_0.geometry} material={materials.PaletteMaterial001} />
                    </group>
                    <group name="Spring002" position={[155.621, 20.722, 81.958]} rotation={[0.209, -Math.PI / 2, 0]} scale={2.803}>
                        <mesh name="Spring002_Light_black_0" geometry={nodes.Spring002_Light_black_0.geometry} material={materials.PaletteMaterial001} />
                    </group>
                    <group name="Spring003" position={[-128.512, 20.722, 81.958]} rotation={[0.209, -Math.PI / 2, 0]} scale={2.803}>
                        <mesh name="Spring003_Light_black_0" geometry={nodes.Spring003_Light_black_0.geometry} material={materials.PaletteMaterial001} />
                    </group>
                    <group name="Smoke001" position={[70.408, 165.259, 94.261]} scale={0}>
                        <mesh name="Smoke001_Smoke_0" geometry={nodes.Smoke001_Smoke_0.geometry} material={materials.PaletteMaterial001} />
                    </group>
                    <group name="Smoke002" position={[74.602, 165.67, 92.365]} scale={0}>
                        <mesh name="Smoke002_Smoke_0" geometry={nodes.Smoke002_Smoke_0.geometry} material={materials.PaletteMaterial001} />
                    </group>
                    <group name="Smoke003" position={[72.18, 166.534, 95.135]} scale={0}>
                        <mesh name="Smoke003_Smoke_0" geometry={nodes.Smoke003_Smoke_0.geometry} material={materials.PaletteMaterial001} />
                    </group>
                    <group name="Smoke004" position={[73.14, 165.638, 93.102]} scale={0}>
                        <mesh name="Smoke004_Smoke_0" geometry={nodes.Smoke004_Smoke_0.geometry} material={materials.PaletteMaterial001} />
                    </group>
                    <group name="Smoke005" position={[75.198, 166.038, 95.17]} scale={0}>
                        <mesh name="Smoke005_Smoke_0" geometry={nodes.Smoke005_Smoke_0.geometry} material={materials.PaletteMaterial001} />
                    </group>
                    <group name="Smoke006" position={[75.865, 167.365, 89.869]} scale={0}>
                        <mesh name="Smoke006_Smoke_0" geometry={nodes.Smoke006_Smoke_0.geometry} material={materials.PaletteMaterial001} />
                    </group>
                    <group name="Smoke007" position={[74.987, 167.942, 90.928]} scale={0}>
                        <mesh name="Smoke007_Smoke_0" geometry={nodes.Smoke007_Smoke_0.geometry} material={materials.PaletteMaterial001} />
                    </group>
                    <group name="Smoke008" position={[73.567, 166.392, 94.528]} scale={0}>
                        <mesh name="Smoke008_Smoke_0" geometry={nodes.Smoke008_Smoke_0.geometry} material={materials.PaletteMaterial001} />
                    </group>
                    <group name="Smoke009" position={[70.765, 159.593, 95.076]} scale={0}>
                        <mesh name="Smoke009_Smoke_0" geometry={nodes.Smoke009_Smoke_0.geometry} material={materials.PaletteMaterial001} />
                    </group>
                    <group name="Smoke010" position={[72.875, 163.489, 92.993]} scale={0}>
                        <mesh name="Smoke010_Smoke_0" geometry={nodes.Smoke010_Smoke_0.geometry} material={materials.PaletteMaterial001} />
                    </group>
                    <group name="Smoke011" position={[75.049, 162.613, 91.645]} scale={0}>
                        <mesh name="Smoke011_Smoke_0" geometry={nodes.Smoke011_Smoke_0.geometry} material={materials.PaletteMaterial001} />
                    </group>
                    <group name="Smoke012" position={[73.821, 161.817, 89.947]} scale={0}>
                        <mesh name="Smoke012_Smoke_0" geometry={nodes.Smoke012_Smoke_0.geometry} material={materials.PaletteMaterial001} />
                    </group>
                    <group name="Frame" rotation={[-Math.PI / 2, 0, 0]} scale={[300, 100, 50]}>
                        <mesh name="Frame_Orange_0" geometry={nodes.Frame_Orange_0.geometry} material={materials.PaletteMaterial001} />
                        <mesh name="Frame_Glass_0" geometry={nodes.Frame_Glass_0.geometry} material={materials.PaletteMaterial002} />
                        <mesh name="Frame_Light_0" geometry={nodes.Frame_Light_0.geometry} material={materials.PaletteMaterial003} />
                    </group>
                </group>
                <mesh name="Front_wheel_Black_0" geometry={nodes.Front_wheel_Black_0.geometry} material={materials.PaletteMaterial001} position={[155.621, 9.27, -127.28]} rotation={[0, 0, -1.403]} scale={[50.096, 50.096, 27.014]} />
            </group>
        </group>
        // </RigidBody>
    )
}

useGLTF.preload('/models/gameAssets/car-transformed.glb')
