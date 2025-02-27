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
                    scale={[0.409 * 4.5, 0.409 * 4.5, 0.409 * 4.5]}
                />
            )}
        </>
    );
}

function Caps({ capsPositions }) {
    const { nodes, materials } = useGLTF(
        // "/models/updatedGameAssets/singleCap-transformed.glb"
        "/models/updatedGameAssets/capNew-transformed.glb"
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

    // const blueMaterial = materials["Blue Correct"];
    // const greenMaterial = materials["Material.033"];

    // blueMaterial.side = THREE.DoubleSide;
    // greenMaterial.side = THREE.DoubleSide;

    const lambertMaterial = materials["lambert1"];

    return (
        <group position={[0, -2, 0]} key={trigger}>

            <PlayAudio audio={capAudio} capIdRef={capIdRef} />

            <Instances
                limit={capsPositions.length}
                geometry={nodes.Cylinder297.geometry}
                material={lambertMaterial}
            >
                {capsPositions.map((cap, i) => (
                    <InstanceCap key={i} cap={cap} audio={capAudio} />
                ))}
            </Instances>

            {/* <Instances
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
            </Instances> */}
        </group>
    );
}

export default Caps;

useGLTF.preload("/models/updatedGameAssets/singleCap-transformed.glb");
