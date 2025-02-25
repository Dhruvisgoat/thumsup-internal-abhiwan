import React, { useRef, useEffect, useState, useContext } from 'react';
import { MyContext } from './RefContext/Context';
import { DirContext } from './RefContext/dirContext';

function ImageController({ imgRef }) {
    const { playerRef } = useContext(MyContext);
    const { directionState } = useContext(DirContext);
    const directionRef = useRef();

    useEffect(() => {
        if (directionState.x > 0 && directionState.z > 0) {
            directionRef.current = 'down';
        } else if (directionState.x < 0 && directionState.z < 0) {
            directionRef.current = 'up';
        } else if (directionState.x < 0 && directionState.z > 0) {
            directionRef.current = 'left';
        } else if (directionState.x > 0 && directionState.z < 0) {
            directionRef.current = 'right';
        } else {
            directionRef.current = 'Stationary'; // If neither condition is met
        }
    }, [directionState]);


    // const velocity= {Math.sqrt(Math.pow(playerRef.current?.linvel().x, 2) + Math.pow(playerRef.current?.linvel().z, 2)).toFixed(1)}

    // Track the cumulative position instead of separate slider values
    const [position, setPosition] = useState({ x: -1040, y: -1015 });
    const [leftRightController, setLeftRightController] = useState(0);
    const [upDownController, setUpDownController] = useState(0);

    const handleLeftRightControllerChange = (e) => {
        const newControllerValue = parseInt(e.target.value);
        const prevControllerValue = leftRightController;
        const change = newControllerValue - prevControllerValue;

        setLeftRightController(newControllerValue);
        setPosition(prev => ({
            x: prev.x - change,
            y: prev.y + (change * 4)
        }));
    };

    const handleUpDownControllerChange = (e) => {
        const newControllerValue = parseInt(e.target.value);
        const prevControllerValue = upDownController;
        const change = newControllerValue - prevControllerValue;

        setUpDownController(newControllerValue);
        setPosition(prev => ({
            x: prev.x - (change * 4),
            y: prev.y - change
        }));
    };

    useEffect(() => {
        if (imgRef.current) {
            imgRef.current.style.transform = `translate(${position.y}px, ${position.x}px)`;
        }
    }, [position]);

    // update useEffect after every 100 milliseconds

    const translationRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            if (!playerRef.current) return;

            const velocity = Math.sqrt(
                Math.pow(playerRef.current.linvel().x, 2) +
                Math.pow(playerRef.current.linvel().z, 2)
            ).toFixed(1);

            if (velocity > 10) {
                if (directionRef.current === "up") {
                    translationRef.current.x += 1;
                    translationRef.current.y += 4;
                }
                else if (directionRef.current === "down") {
                    translationRef.current.x -= 1;
                    translationRef.current.y -= 4;
                }
                else if (directionRef.current === "right") {
                    translationRef.current.x -= 4;
                    translationRef.current.y -= 1;
                }
                else if (directionRef.current === "left") {
                    translationRef.current.x -= -4;
                    translationRef.current.y -= 1;
                }
                else {
                    translationRef.current.x += 0;
                    translationRef.current.y += 0;
                }
            }

            else {
                translationRef.current.x += 0;
                translationRef.current.y += 0;
            }
            imgRef.current.style.transform = `translate(${translationRef.current.x}px, ${translationRef.current.y}px)`;
        }, 10);

        return () => clearInterval(interval);
    }, [directionRef.current]);

    return (
        <div style={{ zIndex: '999999999999', position: 'absolute', height: '200px', width: '200px', backgroundColor: 'rgba(205, 177, 177, 0.1)' }}>
            <div style={{ marginTop: '15px' }}>
                <label>Left-Right Slider:</label>
                <input
                    type="range"
                    min="-300"
                    max="300"
                    value={leftRightController}
                    onChange={handleLeftRightControllerChange}
                />
                <span>{leftRightController}</span>
            </div>
            <div style={{ marginTop: '15px' }}>
                <label>Forward-Bottom Slider:</label>
                <input
                    type="range"
                    min="-300"
                    max="300"
                    value={upDownController}
                    onChange={handleUpDownControllerChange}
                />
                <span>{upDownController}</span>
            </div>
        </div>
    );
}

function BackgroundMap() {
    const imgRef = useRef(null);

    return (
        <>
            <div style={{ zIndex: '1', position: 'absolute', height: '100vh', width: '100vw', backgroundColor: 'transparent' }}>
                <img ref={imgRef} height='1500px' style={{ position: 'relative' }} src='images/map.png' />
            </div>
            <ImageController imgRef={imgRef} />
        </>
    );
}

export default BackgroundMap;