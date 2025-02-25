import React, { useContext, useEffect, useState } from 'react';
import './MobileUi.css'; // Import the CSS file for styles
import { MyContext } from '../RefContext/Context';
import { isMobile } from 'react-device-detect';
import up from "../../public/images/THUMS-UP/up.png"
import down from "../../public/images/THUMS-UP/down.png"
import left from "../../public/images/THUMS-UP/left.png"
import right from "../../public/images/THUMS-UP/right.png"


function KeyButton({ label, onTouchStart, onTouchEnd, onMouseDown, onMouseUp }) {

    let imageSrc;
    switch (label) {
        case '↑':
            imageSrc = up;
            break;
        case '↓':
            imageSrc = down;
            break;
        case '←':
            imageSrc = left;
            break;
        case '→':
            imageSrc = right;
            break;
        default:
            imageSrc = null;
    }


    return (
        <button
            className="key-button"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}  // Added mouse down event
            onMouseUp={onMouseUp}      // Added mouse up event
            style={{ userSelect: 'none' }}


        >
            {/* {label} */}

            {imageSrc && <img onContextMenu={(e) => e.preventDefault()} src={imageSrc} style={{ userSelect: 'none' }} height="30px" width="30px" alt={label} />}

        </button>
    );
}

function ButtonMobileUi() {

    const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setIsLandscape(window.innerWidth > window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const { directionRef, jumpRef } = useContext(MyContext); // Access directionRef from context

    // Handlers for touch and mouse events
    // const handleTouchStart = (direction) => {
    //   directionRef.current = direction; // Set the movement direction
    //   console.log(`Touch Start: Moving ${direction}`);
    // };

    const handleTouchStart = (direction) => {
        directionRef.current = direction; // Set the movement direction
        console.log(`Touch Start: Moving ${direction}`);

        // Reset directionRef.current to null after 1 second
        setTimeout(() => {
            // directionRef.current = null;
            // console.log('Direction reset to null');
        }, 100); // 1000 milliseconds = 1 second
    };

    // Mouse event handlers
    const handleMouseDown = (direction) => {
        directionRef.current = direction; // Set the movement direction on mouse down
        console.log(`Mouse Down: Moving ${direction}`);
    };

    const handleMouseUp = () => {
        // directionRef.current = null; // Reset direction on mouse up
    };

    return (
        <div className="mobile-ui"
            style={{ left: isLandscape ? "80%" : "50%" }}
        >
            <div className="key-row">
                <KeyButton
                    label="↑"
                    onTouchStart={() => handleTouchStart('Up')}
                    // onTouchEnd={() => directionRef.current = null}
                    onMouseDown={() => handleMouseDown('Up')}  // Added mouse down handler
                    onMouseUp={handleMouseUp}                  // Added mouse up handler
                />
            </div>

            <div className="key-row">
                <KeyButton
                    label="←"
                    onTouchStart={
                        () => {
                            handleTouchStart('Left')
                        }
                    }
                    // onTouchEnd={() => directionRef.current = null}

                    onMouseDown={() => handleMouseDown('Left')} // Added mouse down handler
                    onMouseUp={handleMouseUp}                   // Added mouse up handler
                />

                <KeyButton
                    label=" JUMP"
                    onTouchStart={() => {
                        jumpRef.current = false;
                    }
                    }
                    onTouchEnd={() => {
                        jumpRef.current = true;
                        setTimeout(() => {
                            jumpRef.current = false
                        }, 100);
                    }
                    }
                />

                <KeyButton
                    label="→"
                    onTouchStart={() => handleTouchStart('Right')}
                    // onTouchEnd={() => directionRef.current = null}
                    onMouseDown={() => handleMouseDown('Right')} // Added mouse down handler
                    onMouseUp={handleMouseUp}                    // Added mouse up handler
                />

            </div>
            <div className="key-row">
                <KeyButton
                    label="↓"
                    onTouchStart={() => handleTouchStart('Down')}
                    // onTouchEnd={() => directionRef.current = null}
                    onMouseDown={() => handleMouseDown('Down')}  // Added mouse down handler
                    onMouseUp={handleMouseUp}                  // Added mouse up handler
                />
            </div>
        </div>
    );
}

export default ButtonMobileUi;

