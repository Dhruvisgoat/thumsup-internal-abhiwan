import React, { useContext, useState, useEffect } from 'react';
import { DirectionContext } from '../../RefContext/DirectionContext';
import { CapRemoveIdContext } from '../../RefContext/CapRemoveId';

function ScoreAlgo() {
    const { collectedCountBiryani, collectedCountCoke, lives } = useContext(DirectionContext);
    const { capCountRef } = useContext(CapRemoveIdContext);
    const [score, setScore] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsedTime = (Date.now() - startTime) / 1000; // Elapsed time in seconds
            const capCount = (capCountRef.current / 2 - 946) || 0;
            const biryaniBonus = collectedCountBiryani * 250; // 5x bonus for biryanis
            const cokeBonus = collectedCountCoke * 250; // 5x bonus for Coke
            const timePenalty = elapsedTime > 0 ? 5000 / elapsedTime : 0; // Inversely proportional to time
            const lifePenalty = lives < 3 ? (3 - lives) * 500 : 0; // Penalty for lost lives (assuming max lives = 3)

            const newScore = Math.round(
                capCount * 100 + biryaniBonus + cokeBonus - timePenalty - lifePenalty
            )

            setScore(newScore); // Ensure score stays within 0-9999
        }, 1000); // Update score every second

        return () => clearInterval(interval);
    }, [collectedCountBiryani, collectedCountCoke, lives, capCountRef, startTime]);

    return (
        <div>
            <h3>Score: {score}</h3>
        </div>
    );
}

export default ScoreAlgo;
