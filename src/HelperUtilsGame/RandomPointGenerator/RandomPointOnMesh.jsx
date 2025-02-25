
import ReactDOM from "react-dom";
import React, { useRef, useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { Object3D, Vector3 } from "three";
import { useGLTF } from "@react-three/drei";

function SampledSurface(props) {

    const objects = useRef();
    const { instance } = props;


    useEffect(() => {
        if (objects.current && objects.current.children[0] && instance.current) {
            const sampler = new MeshSurfaceSampler(
                objects.current.children[0]
            ).build();
            const _position = new Vector3();
            const _normal = new Vector3();
            const dummy = new Object3D();

            for (let i = 0; i < 150; i++) {
                sampler.sample(_position, _normal);
                _normal.add(_position);

                dummy.position.copy(_position);
                dummy.lookAt(_normal);
                dummy.updateMatrix();
                dummy.lookAt(new Vector3(0, 1, 0)); // Adjust based on the intended orientation


                instance.current.setMatrixAt(i, dummy.matrix);
            }
            instance.current.instanceMatrix.needsUpdate = true;
            objects.current.add(instance.current);
        }
    }, [props.children]);

    return (
        <group {...props} ref={objects}>
            {props.children}
        </group>
    );
}


const RandomPointOnMesh = () => {
    const { scene: blockades } = useGLTF('/models/Scene/thumsupMap-blockades.glb');
    const { nodes: navNodes, scene: navmeshLevel } = useGLTF('/models/Scene/navmesh.gltf')

    const instance = useRef();

    const [trigger, setTrigger] = useState(0);

    // Force a re-render when the component loads
    useEffect(() => {
        setTrigger((prev) => prev + 1);
    }, []);

    return (
        <group key={trigger}>
            <instancedMesh ref={instance} args={[null, null, 150]}>
                <boxBufferGeometry args={[0.2, 0.2, 0.2]} />
                <meshBasicMaterial attach="material" color={"red"} side={"THREE.DoubleSide"} />
            </instancedMesh>
            {/* <group>
        <primitive rotation={[0, Math.PI / 4, 0]} scale={[3, 5, 3]} position={[0, -5, 0]} object={blockades} />
      </group> */}

            <group scale={[3, 1, 3]}
                position={[0, -4.5, 0]}
                rotation={[0, Math.PI / 4, 0]}>

                <SampledSurface instance={instance}>
                    {/* <mesh>
          <sphereBufferGeometry args={[2, 10]} />
          <meshStandardMaterial color={0x333333} />
        </mesh> */}

                    <mesh
                        geometry={navNodes.mesh_0?.geometry}
                        // scale={[3, 1, 3]}
                        // position={[0, -4.5, 0]}
                        // rotation={[0, Math.PI / 4, 0]}
                        material={new THREE.MeshBasicMaterial({
                            color: 0x0000ff,
                            transparent: true,
                            opacity: 0,
                            wireframe: false,
                            side: THREE.DoubleSide
                        })}
                    />
                </SampledSurface>
            </group>
        </group >
    );
};

export default RandomPointOnMesh;
