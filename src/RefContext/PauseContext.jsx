// create a context api for the removeCapId state
import React, { createContext, useState } from "react";
export const PauseContext = createContext();

export const PauseProvider = ({ children }) => {
    const [pause, setPause] = useState(true);
    const [resetNavmeshEnemy, setResetNavmeshEnemy] = useState(false);

    return (
        <PauseContext.Provider value={{ pause, setPause, resetNavmeshEnemy, setResetNavmeshEnemy }}>
            {children}
        </PauseContext.Provider>
    );
}
