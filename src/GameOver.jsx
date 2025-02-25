import React, { useEffect, useContext } from 'react';
import { DirectionContext } from './RefContext/DirectionContext';
import { PauseContext } from './RefContext/PauseContext';
import { useThree, useFrame } from '@react-three/fiber';

function GameOver() {
    const { gl } = useThree();
    const { timeLeft, isVictory, lives } = useContext(DirectionContext);
    const { setPause } = useContext(PauseContext);

    useFrame(() => {
        if (timeLeft <= 0 || isVictory || lives === 3) {
            setTimeout(() => {
                setPause(true);
            }, 1000);
        }
    });

    // useEffect(() => {
    //     const handleVisibilityChange = () => {
    //         if (document.visibilityState === 'hidden') {
    //             setPause(true); // Pause the game when the tab is hidden
    //         }
    //         else {
    //             setPause(false);
    //         }
    //     };
    //     document.addEventListener('visibilitychange', handleVisibilityChange);
    //     return () => {
    //         document.removeEventListener('visibilitychange', handleVisibilityChange);
    //     };
    // }, [setPause]);

    return null;
}

export default GameOver;


