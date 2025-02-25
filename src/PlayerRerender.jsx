import React from 'react'
import { MyContext } from "./RefContext/Context";
import { DirectionContext } from "./RefContext/DirectionContext";
import { useContext, useEffect } from "react";
import * as THREE from 'three'
import { DirContext } from './RefContext/dirContext';

function PlayerRerender() {

    const { playerRef } = useContext(MyContext);
    const { isPlayerDied, setIsPlayerDied, powerup } = useContext(DirectionContext);
    const { setDirectionState } = useContext(DirContext);

    useEffect(() => {
        if (isPlayerDied) {
            playerRef.current?.setLinvel({ x: 0, y: 0, z: 0 });
            setDirectionState(new THREE.Vector3(0, 0, 0));
            setTimeout(() => {
                setIsPlayerDied(false);
            }, 2000);
        }
    }, [isPlayerDied, playerRef, setDirectionState, setIsPlayerDied]);

    return (<>
    </>
    )
}

export default PlayerRerender