// import React, { useEffect, useContext } from 'react';
// import { DirectionContext } from './RefContext/DirectionContext';
// import { TrafficCone } from './GameAssets/Traffic Cone';

// const HurdlePositions = [
//     [-36, -1, 62],
//     [30, -1, 56],
//     [78, -1, -6],
//     [68, -1, 19]
// ];

// function Hurdles() {
//     const { setIsPlayerDied, coordinates } = useContext(DirectionContext);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (coordinates) {
//                 HurdlePositions.forEach((hurdle) => {
//                     const distance = Math.sqrt(
//                         Math.pow(hurdle[0] - coordinates.x, 2) +
//                         Math.pow(hurdle[1] - coordinates.y, 2) +
//                         Math.pow(hurdle[2] - coordinates.z, 2)
//                     );

//                     if (distance <= 5) {
//                         setIsPlayerDied(true);
//                     }
//                 });
//             } else {
//                 console.log('coordinates is not defined');
//             }
//         }, 100);

//         return () => clearInterval(interval);
//     }, [coordinates, setIsPlayerDied]);

//     return (
//         <>
//             {HurdlePositions.map((pos, index) => (
//                 <TrafficCone key={index} position={pos} scale={100} />
//             ))}
//         </>
//     );
// }

// export default Hurdles;


//more optimised approach 

import React, { useEffect, useContext } from 'react';
import { DirectionContext } from './RefContext/DirectionContext';
import { TrafficCone } from './GameAssets/Traffic Cone';
import { useGLTF } from '@react-three/drei';
import { BudhaEnemy } from './GameAssets/Enemies/BudhaEnemy';
import { CartoonEnemy } from './GameAssets/Enemies/CartoonEnemy';

function Hurdle1(props) {
    const { scene } = useGLTF('models/updatedGameAssets/hurdles1-transformed.glb')
    return <primitive {...props} object={scene.clone()} />
}

function Hurdle2(props) {
    const { scene } = useGLTF('models/updatedGameAssets/hurdles2-transformed.glb')
    return <primitive {...props} object={scene.clone()} />
}

function Hurdle3(props) {
    const { scene } = useGLTF('models/updatedGameAssets/hurdles3-transformed.glb')
    return <primitive {...props} object={scene.clone()} />
}

// function Hurdle4(props) {
//     const { scene } = useGLTF('models/updatedGameAssets/hurdles4-transformed.glb')
//     return <primitive {...props} object={scene.clone()} />
// }

const HurdlePositions = [

    //for map1
    // [-36, -1, 62],
    // [30, -1, 56],
    // [78, -1, -6],
    // [68, -1, 19]

    //for map3
    // [-23 -1, 55],
    // [-33, -1, 26],

    //for map4 
    [14, 0, 23],
    [-20, 0, 48],
    [37, 0, -65],
    [-35, 0, 13]

];

function Hurdles() {
    const { setIsPlayerDied, coordinates, powerup } = useContext(DirectionContext);

    useEffect(() => {
        if (!coordinates) {
            console.log('coordinates is not defined');
            return;
        }

        HurdlePositions.forEach((hurdle) => {
            const distanceSquared =
                Math.pow(hurdle[0] - coordinates.x, 2) +
                Math.pow(hurdle[1] - coordinates.y, 2) +
                Math.pow(hurdle[2] - coordinates.z, 2);

            if (distanceSquared <= 5 & !powerup) { // Check against 5^2 to avoid sqrt
                setIsPlayerDied(true);
            }
        });
    }, [coordinates, setIsPlayerDied]);

    return (
        <>
            {/* {HurdlePositions.map((pos, index) => (
                // <TrafficCone key={index} position={pos} scale={100} />
            ))} */}
            <Hurdle1 position={[14, -3, 22]} scale={4} rotation={[0, Math.PI / 4, 0]} />
            <Hurdle2 position={[-20, -3, 48]} scale={4} rotation={[0, Math.PI / 4, 0]} />
            <Hurdle3 position={[37, -3, -65]} scale={4} rotation={[0, Math.PI / 4, 0]} />
            <Hurdle3 position={[-35, -3, 13]} scale={4} rotation={[0, Math.PI / 4, 0]} />

        </>
    );
}

export default Hurdles;

