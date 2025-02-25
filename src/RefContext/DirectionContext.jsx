import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import * as THREE from "three";
import { CapRemoveIdContext } from './CapRemoveId';

// Create a Context
export const DirectionContext = createContext();

// Create a Provider component
export const DirectionProvider = ({ children }) => {
    const [isPlayerDied, setIsPlayerDied] = useState(false);
    const [collectedCap, setCollectedCap] = useState(0);
    const [restart, setRestart] = useState(false);
    const [collectedCount, setCollectedCount] = useState(0); // State to track the number of collected bottles
    const [collectedCountBiryani, setCollectedCountBiryani] = useState(0); // State to track the number of collected bottles
    const [collectedCountCoke, setCollectedCountCoke] = useState(0); // State to track the number of collected bottles
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0, z: 0 });
    const [isVictory, setIsVictory] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180);
    const [powerup, setPowerup] = useState(false);
    const [powerupCount, setPowerupCount] = useState(0);
    const [lives, setLives] = useState(0);
    const [invisiblePowerup, setInvisiblePowerup] = useState(false);
    const [invisiblePowerupCount, setInvisiblePowerupCount] = useState(0);
    const toggleViewMode = (newMode) => setViewMode(newMode);
    const [hasMoved, setHasMoved] = useState(false);
    // const [volume, setVolume] = useState(10);
    const [volume, setVolume] = useState(() => {
        const savedVolume = localStorage.getItem('volume');
        return savedVolume !== null ? parseInt(savedVolume) : 10;  // Default value is 10 if not found
    });

    const { capCountRef } = useContext(CapRemoveIdContext);

    const victoryPoint = {
        // x: -56, y: 2, z: - 56
        x: -100, y: 2, z: -100
    };
    const victoryRange = 5; // 3 meters

    const audioRefs = useRef({});
    const setAudioRef = (audioSource, ref) => {
        audioRefs.current[audioSource] = ref;
    };

    const getAudioRef = (audioSource) => {
        return audioRefs.current[audioSource];
    };

    useEffect(() => {
        const distance = Math.sqrt(
            Math.pow(coordinates.x - victoryPoint.x, 2) +
            Math.pow(coordinates.y - victoryPoint.y, 2) +
            Math.pow(coordinates.z - victoryPoint.z, 2)
        );

        if ((
            // distance <= victoryRange &&
            // collectedCountBiryani === 5 && collectedCountCoke === 5 && capCountRef.current / 2 - 946 >= 473)
            // collectedCountBiryani === 10 && collectedCountCoke === 10 && capCountRef.current / 2 - 946 >= 473)
            collectedCountBiryani === 10 && collectedCountCoke === 10 && capCountRef.current / 2 - 930 >= 468)

            && (timeLeft > 0)
        ) {
            setIsVictory(true);
            const currentRoute = window.location.pathname.trim();
            localStorage.setItem('currentRoute', currentRoute);
        }

    }, [coordinates]); // Run this effect when coordinates change

    // console.log("Direction context rendered");

    // const value =() => ({ directionState, setDirectionState }), [directionState]);

    return (
        <DirectionContext.Provider value={{
            powerupCount, setPowerupCount,
            invisiblePowerupCount, setInvisiblePowerupCount,
            lives, setLives,
            collectedCap, setCollectedCap,
            hasMoved, setHasMoved,
            volume, setVolume,
            audioRefs, setAudioRef, getAudioRef,
            collectedCountBiryani, setCollectedCountBiryani,
            collectedCountCoke, setCollectedCountCoke,
            invisiblePowerup, setInvisiblePowerup, powerup, setPowerup, isPlayerDied, setIsPlayerDied, restart, setRestart, collectedCount, setCollectedCount, coordinates, setCoordinates, isVictory, timeLeft, setTimeLeft
        }}>
            {children}
        </DirectionContext.Provider>
    );
};