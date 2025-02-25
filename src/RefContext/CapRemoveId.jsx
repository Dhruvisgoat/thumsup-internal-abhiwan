// create a context api for the removeCapId state
import React, { createContext, useContext, useState, useRef } from "react";

export const CapRemoveIdContext = createContext();

export const CapRemoveIdProvider = ({ children }) => {
    const [removeCapId, setRemoveCapId] = useState(0);
    const capCountRef = useRef(0);
    const [capCount, setCapCount] = useState(0);
    const capIdRef = useRef();
    const spritePositionRef = useRef([0, -100, 0]);
    const bottleIdRef = useRef();
    const biryaniIdRef = useRef();

    return (
        <CapRemoveIdContext.Provider value={{ bottleIdRef, biryaniIdRef, removeCapId, setRemoveCapId, capIdRef, spritePositionRef, capCount, setCapCount, capCountRef }}>
            {children}
        </CapRemoveIdContext.Provider>
    );
}
