import React, { useContext, useEffect } from 'react';
import { MyContext } from './RefContext/Context';
import { DirectionContext } from './RefContext/DirectionContext';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

function PowerUp() {
    const { speedRef, skinnedMeshRef } = useContext(MyContext);
    const { materials } = useGLTF('/models/characters/thumsboyblue-transformed.glb');
    const { powerup, setPowerup, invisiblePowerup, setInvisiblePowerup, isPlayerDied, powerupCount, invisiblePowerupCount } = useContext(DirectionContext);

    useEffect(() => {
        if (isPlayerDied) {
            setInvisiblePowerup(false);
        }
    }, [isPlayerDied]);

    useEffect(() => {
        if (invisiblePowerup) {
            speedRef.current = 50;

            const timer = setTimeout(() => {
                setInvisiblePowerup(false);
            }, 10000);
            // Clean up the timer if the component unmounts
            return () => clearTimeout(timer);
        }
        else {
            speedRef.current = 35;
        }
    }, [invisiblePowerup, invisiblePowerupCount]);



    useEffect(() => {
        let flickerInterval = null;

        // if (!isPlayerDied) {
        //     skinnedMeshRef.current.material.transparent = true;
        //     skinnedMeshRef.current.material.opacity = 0.5;
        //     skinnedMeshRef.current.material.color.set("#ffffff");
        //     skinnedMeshRef.current.material.emissive = new THREE.Color("#ffffff");
        //     skinnedMeshRef.current.material.emissiveIntensity = 3;

        //     let isOpaque = false;
        //     flickerInterval = setInterval(() => {
        //         isOpaque = !isOpaque;
        //         skinnedMeshRef.current.material.opacity = isOpaque ? 0.5 : 0.2;
        //     }, 200);

        //     const flickerDuration = setTimeout(() => {
        //         clearInterval(flickerInterval);
        //         skinnedMeshRef.current.material = materials['Material.003']; // Apply original material
        //         skinnedMeshRef.current.material.transparent = true;
        //         skinnedMeshRef.current.material.opacity = 1;
        //         skinnedMeshRef.current.material.color.set("#ffffff");
        //         skinnedMeshRef.current.material.emissive = new THREE.Color(0x000000);
        //         skinnedMeshRef.current.material.emissiveIntensity = 0;
        //     }, 1000);

        //     return () => {
        //         clearInterval(flickerInterval);
        //         clearTimeout(flickerDuration);
        //     };
        // }

        if (powerup && !isPlayerDied) {
            skinnedMeshRef.current.material.transparent = true;
            skinnedMeshRef.current.material.opacity = 0.5;
            skinnedMeshRef.current.material.color.set("#62a2d6");
            skinnedMeshRef.current.material.emissive = new THREE.Color("#0589f3");
            skinnedMeshRef.current.material.emissiveIntensity = 3;

            const timer = setTimeout(() => {
                setPowerup(false);
            }, 10000);

            // Start flickering opacity for the last 3 seconds
            const flickerStart = setTimeout(() => {
                let isOpaque = false;
                flickerInterval = setInterval(() => {
                    isOpaque = !isOpaque;
                    skinnedMeshRef.current.material.opacity = isOpaque ? 0.5 : 0.2;
                }, 200);
            }, 7000);

            // Cleanup
            return () => {
                clearTimeout(timer);
                clearTimeout(flickerStart);
                clearInterval(flickerInterval);
            };
        } else {
            skinnedMeshRef.current.material = materials['Material.003']; // Apply original material
            skinnedMeshRef.current.material.transparent = true;
            skinnedMeshRef.current.material.opacity = 1;
            skinnedMeshRef.current.material.color.set("#ffffff");
            skinnedMeshRef.current.material.emissive = new THREE.Color(0x000000);
            skinnedMeshRef.current.material.emissiveIntensity = 0;

            if (flickerInterval) {
                clearInterval(flickerInterval);
            }
        }

    }, [powerup, isPlayerDied, powerupCount]);


    useEffect(() => {
        let flickerInterval = null;

        if (!isPlayerDied) {
            skinnedMeshRef.current.material.transparent = true;
            skinnedMeshRef.current.material.opacity = 0.5;
            skinnedMeshRef.current.material.color.set("#ffffff");
            skinnedMeshRef.current.material.emissive = new THREE.Color("#ffffff");
            skinnedMeshRef.current.material.emissiveIntensity = 3;

            let isOpaque = false;
            flickerInterval = setInterval(() => {
                isOpaque = !isOpaque;
                skinnedMeshRef.current.material.opacity = isOpaque ? 0.5 : 0.2;
            }, 200);

            const flickerDuration = setTimeout(() => {
                clearInterval(flickerInterval);
                skinnedMeshRef.current.material = materials['Material.003']; // Apply original material
                skinnedMeshRef.current.material.transparent = true;
                skinnedMeshRef.current.material.opacity = 1;
                skinnedMeshRef.current.material.color.set("#ffffff");
                skinnedMeshRef.current.material.emissive = new THREE.Color(0x000000);
                skinnedMeshRef.current.material.emissiveIntensity = 0;
            }, 1000);

            return () => {
                clearInterval(flickerInterval);
                clearTimeout(flickerDuration);
            };
        }

    }, [isPlayerDied])

    return null;
}

export default PowerUp;
