import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from './RefContext/Context';
import { DirectionContext } from './RefContext/DirectionContext';
import { CollectiblesContext } from './RefContext/CollectiblesContext';
import PowerUp from './PowerUp';
import { DirContext } from './RefContext/dirContext';
import { CapRemoveIdContext } from './RefContext/CapRemoveId';
import { useFrame } from '@react-three/fiber';
import { PauseContext } from './RefContext/PauseContext';

function PlayerCoordinates(
  {
    display = false
  }) {

  const { setPause, pause } = useContext(PauseContext);
  const { bottlePositions, removeBottle, comboPositions, removeCombo, drinkComboPositions, removeDrinkCombo, biryaniPositions, removeBiryani, capsPositions, removeCap, constantCapsPositions } = useContext(CollectiblesContext);

  // const { playerRef, intersectionPointRef, directionState } = useContext(MyContext);
  const { playerRef, playerMeshRef, intersectionPointRef, distanceFromEnemyRef, directionRef, meshRef } = useContext(MyContext);

  const { directionState } = useContext(DirContext);
  const { isPlayerDied, setIsPlayerDied, setLives,
    collectedCountBiryani, setCollectedCountBiryani,
    collectedCountCoke, setCollectedCountCoke,
    collectedCount, setCollectedCount, coordinates, setCoordinates, setPowerup, setInvisiblePowerup, invisiblePowerup, powerup, setCollectedCap, setPowerupCount, setInvisiblePowerupCount, } = useContext(DirectionContext);

  // const [coordinates, setCoordinates] = useState({ x: 0, y: 0, z: 0 });
  // const [collectedCount, setCollectedCount] = useState(0); // State to track the number of collected bottles
  const [direction, setDirection] = useState();

  const { setRemoveCapId, capIdRef, spritePositionRef, biryaniIdRef, bottleIdRef } = useContext(CapRemoveIdContext);
  // setDirection("player coordinates re rendered");

  useEffect(() => {
    if (directionState.x > 0 && directionState.z > 0) {
      setDirection('Moving Down');
    } else if (directionState.x < 0 && directionState.z < 0) {
      setDirection('Moving Up');
    } else if (directionState.x < 0 && directionState.z > 0) {
      setDirection('Moving Left');
    } else if (directionState.x > 0 && directionState.z < 0) {
      setDirection('Moving Right');
    } else {
      setDirection('Stationary'); // If neither condition is met
    }

    const interval = setInterval(() => {
      if (playerRef && playerRef.current) {
        const x = parseFloat(playerRef.current?.translation().x);
        const y = parseFloat(playerRef.current?.translation().y);
        const z = parseFloat(playerRef.current?.translation().z);

        setCoordinates({ x, y, z });

        // distanceFromEnemyRef.current.forEach(entry => {
        //   if (entry < 4.5 & !powerup) {
        //     // if (entry < 2 ) {
        //     // setLives(prevLives => (prevLives + 1 / 11));
        //     setLives(prevLives => (prevLives + 1 / 11));
        //     setIsPlayerDied(true);
        //     setPause(true);
        //   }
        // });

        // Check if player is within 1 meter of any bottle
        bottlePositions.forEach((bottle) => {
          const distance = Math.sqrt(
            Math.pow(bottle.position[0] - x, 2) +
            Math.pow(bottle.position[1] - y, 2) +
            Math.pow(bottle.position[2] - z, 2)
          );

          if (distance <= 4) {
            bottleIdRef.current = bottle.id;

            // removeBottle(bottle.id);
            // setCollectedCountCoke(prevCount => prevCount + 1); // Increment collected count
            spritePositionRef.current = (bottle.position);
          }
        });

        // Check if player is within 1 meter of any biryani
        biryaniPositions.forEach((bottle) => {
          const distance = Math.sqrt(
            Math.pow(bottle.position[0] - x, 2) +
            Math.pow(bottle.position[1] - y, 2) +
            Math.pow(bottle.position[2] - z, 2)
          );

          if (distance <= 4) {
            biryaniIdRef.current = bottle.id;

            // removeBiryani(bottle.id);
            // setCollectedCountBiryani(prevCount => prevCount + 1); // Increment collected count
            spritePositionRef.current = (bottle.position);
          }
        });



        // Check if player is within 1 meter of any combo
        comboPositions.forEach((bottle) => {
          const distance = Math.sqrt(
            Math.pow(bottle.position[0] - x, 2) +
            Math.pow(bottle.position[1] - y, 2) +
            Math.pow(bottle.position[2] - z, 2)
          );

          if (distance <= 3) {
            setPowerup(true);
            removeCombo(bottle.id);
            setPowerupCount(prevCount => prevCount + 1);
            spritePositionRef.current = (bottle.position);

            // setCollectedCount(prevCount => prevCount + 1); // Increment collected count
          }
        });

        // Check if player is within 1 meter of any drinnkcombo
        drinkComboPositions.forEach((bottle) => {
          const distance = Math.sqrt(
            Math.pow(bottle.position[0] - x, 2) +
            Math.pow(bottle.position[1] - y, 2) +
            Math.pow(bottle.position[2] - z, 2)
          );

          if (distance <= 3) {
            setInvisiblePowerup(true);

            removeDrinkCombo(bottle.id);
            setInvisiblePowerupCount(prevCount => prevCount + 1);
            spritePositionRef.current = (bottle.position);

            // setCollectedCount(prevCount => prevCount + 1); // Increment collected count
          }
        });

        capsPositions.forEach((bottle) => {
          const distance = Math.sqrt(
            Math.pow(bottle.position[0] - x, 2) +
            Math.pow(bottle.position[1] - y, 2) +
            Math.pow(bottle.position[2] - z, 2)
          );

          if (distance <= 3) {
            capIdRef.current = bottle.id;
          }
        });
      }
    }, 10); // Update every 100 milliseconds

    return () => clearInterval(interval);
  }, [playerRef, capIdRef, bottlePositions, removeBottle, intersectionPointRef, distanceFromEnemyRef, powerup, pause]);
  // }, []);

  // useEffect(() => {
  //     const interval = setInterval(() => {
  //     }
  //         , 100);
  //     return () => clearInterval(interval);
  // }, [directionRef]);


  return (
    <div>
      {display &&
        <div style={{
          position: 'absolute',
          top: '0%',
          right: '0%',
          zIndex: '100000',
          backgroundColor: 'white',
          opacity: '0.8',
          padding: '5px',
          borderRadius: '8px',
          fontSize: '10px'
        }}>
          {isPlayerDied ? <p>Player Died</p> : <p>Player Alive</p>}
          {/* {distanceFromEnemyRef.current.distance < 3.5 ? <p> Player Died </p> : <p> Player Alive </p>} */}
          {/* {distanceFromEnemyRef.current.distance } */}
          <p>Direction: {direction}</p>
          <p>Direction Asked:{directionRef.current}</p>
          <p>Coordinates: ({parseInt(coordinates.x)}, {parseInt(coordinates.y)}, {parseInt(coordinates.z)})</p>
          <p>Normalized Velocity: {Math.sqrt(Math.pow(playerRef.current?.linvel().x, 2) + Math.pow(playerRef.current?.linvel().z, 2)).toFixed(1)}</p>
          <p>Total Collected Bottles: {collectedCount}</p> {/* Display the count */}
          <div>
            <span>Raycast distance forward : {intersectionPointRef.current?.forward ? Math.sqrt(Math.pow(intersectionPointRef.current?.forward?.x - coordinates.x, 2) + Math.pow(intersectionPointRef.current?.forward.y - coordinates.y, 2) + Math.pow(intersectionPointRef.current?.forward.z - coordinates.z, 2)).toFixed(1) : 'N/A'}</span>
            {/* <span>[{parseInt(intersectionPointRef.current?.forward?.x)},{parseInt(intersectionPointRef.current?.forward?.y)},{parseInt(intersectionPointRef.current?.forward?.z)}]</span> */}
          </div>
          <div>
            <span>Raycast distance backward: {intersectionPointRef.current?.backward ? Math.sqrt(Math.pow(intersectionPointRef.current?.backward.x - coordinates.x, 2) + Math.pow(intersectionPointRef.current?.backward.y - coordinates.y, 2) + Math.pow(intersectionPointRef.current?.backward.z - coordinates.z, 2)).toFixed(1) : 'N/A'}</span>
            {/* <span>[{parseInt(intersectionPointRef.current?.backward?.x)},{parseInt(intersectionPointRef.current?.backward?.y)},{parseInt(intersectionPointRef.current?.backward?.z)}]</span> */}
          </div>
          <div>
            <span>Raycast distance left: {intersectionPointRef.current?.left ? Math.sqrt(Math.pow(intersectionPointRef.current?.left.x - coordinates.x, 2) + Math.pow(intersectionPointRef.current?.left.y - coordinates.y, 2) + Math.pow(intersectionPointRef.current?.left.z - coordinates.z, 2)).toFixed(1) : 'N/A'}</span>
            {/* <span>[{parseInt(intersectionPointRef.current?.left?.x)},{parseInt(intersectionPointRef.current?.left?.y)},{parseInt(intersectionPointRef.current?.left?.z)}]</span> */}
          </div>
          <div>
            <span>Raycast distance right: {intersectionPointRef.current?.right ? Math.sqrt(Math.pow(intersectionPointRef.current?.right.x - coordinates.x, 2) + Math.pow(intersectionPointRef.current?.right.y - coordinates.y, 2) + Math.pow(intersectionPointRef.current?.right.z - coordinates.z, 2)).toFixed(1) : 'N/A'}</span>
            {/* <span>[{parseInt(intersectionPointRef.current?.right?.x)},{parseInt(intersectionPointRef.current?.right?.y)},{parseInt(intersectionPointRef.current?.right?.z)}]</span> */}
          </div>
        </div>
      }
    </div>

  )
}


export default PlayerCoordinates;








