import React, { createContext, useState, useEffect, useRef } from 'react';
import * as THREE from "three";

// Create a Context
export const DirContext = createContext();

// Create a Provider component
export const DirProvider = ({ children }) => {
    const [directionState, setDirectionState] = useState(new THREE.Vector3(0, 0, 0));

    return (
        <DirContext.Provider value={{
            directionState, setDirectionState
        }}>
            {children}
        </DirContext.Provider>
    );
};