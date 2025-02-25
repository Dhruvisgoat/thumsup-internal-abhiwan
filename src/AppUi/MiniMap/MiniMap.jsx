// import React, { useContext, useRef, useState, useEffect } from 'react';
// import { Canvas, useFrame } from "@react-three/fiber";
// import MiniMapCanvas from './MiniMapCanvas';
    

// function MiniMap() {
//     const [expandCanvas, setExpandCanvas] = useState(true);
//     const [farDistance, setFarDistance] = useState(120);

//     const canvasOpen = () => setExpandCanvas(!expandCanvas);

//     function increaseFar() {
//         if (!expandCanvas) {
//             setFarDistance(prevFar => prevFar + 20);
//         }
//     }

//     function decreaseFar() {
//         if (!expandCanvas && farDistance > 5) {
//             setFarDistance(prevFar => prevFar - 20);
//         }
//     }



//     return (
//         <div>
//             <div style={{
//                 position: 'absolute',
//                 bottom: "0vh",
//                 right: "0vw",
//                 height: expandCanvas ? "5rem" : "100vh",
//                 width: expandCanvas ? "7rem" : "100vw",
//                 zIndex: '2000',
//                 cursor: 'pointer'
//             }}>
//                 <Canvas onClick={canvasOpen} style={{ borderRadius: expandCanvas ? '100%' : '0' ,height:'100%',width:"auto" }}>
//                     <MiniMapCanvas far={expandCanvas ? 20 : farDistance} />
//                     {/* <mesh>
//                         <sphereGeometry args={[3]} />
//                     </mesh> */}
//                 </Canvas>

//                 <div style={{
//                     color: 'red', fontSize: '3vw', position: 'absolute', top: '50%', left: '50%',
//                     transform: 'translate(-50%, -50%) rotate(-90deg)'
//                 }}>
//                     {/* ➤ */}
//                     ●
//                 </div>
//                 {!expandCanvas && (
//                     <div style={{ position: 'absolute', top: '2vh', right: '2vw', zIndex: '100000' }}>
//                         {/* <button style={{ backgroundColor: 'red', color: 'white', width: '40px', height: '40px', border: 'none' }} onClick={canvasOpen}>X</button> */}
//                         <button style={{ width: '40px', height: '40px', border: 'none',margin:'10px' }} onClick={increaseFar}>-</button>
//                         <button style={{ width: '40px', height: '40px', border: 'none' }} onClick={decreaseFar}>+</button>
//                     </div>
//                 )}

//             </div>

//         </div>
//     );
// }

// export default MiniMap;

import React, { useState } from 'react';
import { Canvas } from "@react-three/fiber";
import MiniMapCanvas from './MiniMapCanvas';

function MiniMap() {
    const [expandCanvas, setExpandCanvas] = useState(true);
    const [farDistance, setFarDistance] = useState(200);
    const [toggleView, setToggleView] = useState(true);

    const canvasOpen = () => setExpandCanvas(!expandCanvas);

    function increaseFar() {
        if (!expandCanvas) {
            setFarDistance(prevFar => prevFar + 20);
        }
    }

    function decreaseFar() {
        if (!expandCanvas && farDistance > 5) {
            setFarDistance(prevFar => prevFar - 20);
        }
    }

    return (
        <div>
            <div style={{
                opacity:0.85,
                position: 'absolute',
                top: "0vh",
                right: "0vw",
                height: expandCanvas ? "150px" : "100vh",
                width: expandCanvas ? "150px" : "100vw",
                zIndex: '100',
                cursor: 'pointer',
                backgroundColor: expandCanvas ? 'rgba(10, 10, 40, 0.85)' : 'rgba(10, 10, 40, 0.95)',
                border: `1px solid black`,
                borderRadius: expandCanvas ? '5px' : '0',
                overflow: 'hidden',
            }}>
                <Canvas camera={{ fov: 75 }} onClick={canvasOpen} style={{  height: '100%', width: "auto" }}>
                    <MiniMapCanvas far={expandCanvas ? 100 : farDistance} toggleView={toggleView} />
                </Canvas>

                <div style={{
                    color: '#ff1a1a',
                    fontSize: expandCanvas ? '2vw' : '3vw',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif',
                }}>
                    ●
                </div>

                {!expandCanvas && (
                    <div style={{
                        position: 'absolute',
                        top: '2vh',
                        right: '2vw',
                        zIndex: '100000',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                     
                        <button
                            style={{
                                width: '40px',
                                height: '40px',
                                border: 'none',
                                backgroundColor: '#ff1a1a',
                                color: '#ffffff',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                borderRadius: '50%',
                                boxShadow: '0px 0px 8px rgba(255, 26, 26, 0.5)'
                            }}
                            onClick={increaseFar}
                        >-</button>

                        <button
                            style={{
                                width: '40px',
                                height: '40px',
                                border: 'none',
                                backgroundColor: '#ff1a1a',
                                color: '#ffffff',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                borderRadius: '50%',
                                boxShadow: '0px 0px 8px rgba(255, 26, 26, 0.5)'
                            }}
                            onClick={decreaseFar}
                        >+</button>

                        <button
                            style={{
                                width: '40px',
                                height: '40px',
                                border: 'none',
                                backgroundColor: '#ff1a1a',
                                color: '#ffffff',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                borderRadius: '50%',
                                boxShadow: '0px 0px 8px rgba(255, 26, 26, 0.5)'
                            }}
                            onClick={() => setToggleView(prev => !prev)}
                        >
                            {toggleView ? '3' : 'T'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MiniMap;


