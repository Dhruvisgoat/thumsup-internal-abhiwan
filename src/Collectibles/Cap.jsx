// import React from 'react'
// import { useGLTF } from '@react-three/drei'

// function Cap({ position, ...props }) {
//     const { nodes, materials } = useGLTF('/models/updatedGameAssets/singleCap-transformed.glb')
//     return (
//         <group {...props} position={position}>
//             {/* <group {...props} position={[position[0] * 2, position[1] * 2, position[2] * 2]}> */}
//             {/* <group scale={0.409 * 5} position={[0, -10, -1]} > */}
//             <group scale={0.409 * 5} position={[0, -3, -1]} >
//                 <mesh geometry={nodes.Cylinder1760.geometry} material={materials['Blue Correct']} />
//                 <mesh geometry={nodes.Cylinder1760_1.geometry} material={materials['Material.033']} />
//             </group>
//         </group>
//     )
// }

// export default Cap
// useGLTF.preload('models/updatedGameAssets/singleCap-transformed.glb')




import React, { useState, useEffect, useContext, useRef } from "react";
import { Instances, Instance, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { CapRemoveIdContext } from "../RefContext/CapRemoveId";
import { useFrame } from "@react-three/fiber";
import { MyContext } from "../RefContext/Context";
import { isIOS } from "react-device-detect";

function PlayAudio({ audio, capIdRef }) {
    const { capAudioRef } = useContext(MyContext);

    useEffect(() => {
        if (audio) {
            // audio.loop = true; // Enable looping
            // audio.play(); // Play the audio
        }
    }, []);

    return (<></>);
}

function InstanceCap({ cap, audio }) {
    const { capIdRef, capCountRef } = useContext(CapRemoveIdContext);
    const { capAudioRef } = useContext(MyContext);
    const [render, setRender] = useState(true);

    useEffect(() => {
        capCountRef.current += 1;
    }, [render, audio])

    useFrame(() => {
        if (capIdRef.current === cap.id && render) {
            setRender(false);
            if (!isIOS) {
                // audio.currentTime = 0; // Reset audio to the start
                // audio.volume = 0.05; // Set the volume
                // audio.play(); // Play the audio
            }

        }
    });

    return (
        <>
            {render && (
                <Instance
                    key={cap.id}
                    position={cap.position}
                    scale={[0.409 * 3, 0.409 * 3, 0.409 * 3]}
                />
            )}
        </>
    );
}

function Caps({ capsPositions }) {
    const { nodes, materials } = useGLTF(
        "/models/updatedGameAssets/singleCap-transformed.glb"
    );

    const { capIdRef } = useContext(CapRemoveIdContext);

    // Preload audio once
    const capAudio = React.useMemo(() => new Audio("/audio/capSound.mp3"), []);

    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTrigger((prev) => prev + 1);
        }, 1000);

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, []);

    const blueMaterial = materials["Blue Correct"];
    const greenMaterial = materials["Material.033"];

    blueMaterial.side = THREE.DoubleSide;
    greenMaterial.side = THREE.DoubleSide;

    return (
        <group position={[0, -2, 0]} key={trigger}>

            <PlayAudio audio={capAudio} capIdRef={capIdRef} />

            <Instances
                limit={capsPositions.length}
                geometry={nodes.Cylinder1760_1.geometry}
                material={greenMaterial}
            >
                {capsPositions.map((cap, i) => (
                    <InstanceCap key={i} cap={cap} audio={capAudio} />
                ))}
            </Instances>

            <Instances
                limit={capsPositions.length}
                geometry={nodes.Cylinder1760.geometry}
                material={blueMaterial}
            >
                {capsPositions.map((cap, i) => (
                    <InstanceCap key={i} cap={cap} audio={capAudio} />
                ))}
            </Instances>
        </group>
    );
}

export default Caps;

useGLTF.preload("/models/updatedGameAssets/singleCap-transformed.glb");
