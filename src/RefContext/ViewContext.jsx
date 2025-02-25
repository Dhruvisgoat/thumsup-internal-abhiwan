import React, { createContext, useState } from 'react';

// Create a Context
export const ViewContext = createContext();

// Create a Provider component
export const ViewProvider = ({ children }) => {

    const [viewMode, setViewMode] = useState("side"); // Default mode
    const toggleViewMode = (newMode) => setViewMode(newMode);
    const [isIsometric, setIsIsometric] = useState(true);

    return (
        <ViewContext.Provider value={{
            isIsometric, setIsIsometric, viewMode, setViewMode, toggleViewMode
        }}>
            {children}
        </ViewContext.Provider>
    );
};