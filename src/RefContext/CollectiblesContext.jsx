// CollectiblesContext.js
import React, { createContext, useState } from 'react';
import { useMemo } from 'react';
import * as THREE from 'three'

export const CollectiblesContext = createContext();

export const CollectiblesProvider = ({ children }) => {

    const [constantCapsPositions,setConstantCapsPositions]=useState([]);

    const [capsPositions, setCapsPositions] = useState([
         ]);

    const [biryaniPositions, setBiryaniPositions] = useState([
    ]);

    const [bottlePositions, setBottlePositions] = useState([
    ]);

    const [comboPositions, setComboPositions] = useState([
    ]);

    const [drinkComboPositions, setDrinkComboPositions] = useState([
    ]);

    const scale = new THREE.Vector3(3, 1, 3);
    const rotation = [0, (5 * Math.PI) / 4, Math.PI];

    const scaledRotatedCapsPositions = useMemo(() => {
        return capsPositions.map((cap) => {
            const pos = new THREE.Vector3(...cap.position);

            // Apply scaling
            pos.multiply(scale);

            // Apply rotation
            pos.applyEuler(new THREE.Euler(...rotation));

            return { ...cap, position: pos.toArray() };
        });
    }, [capsPositions]);


    const removeCap = (id) => {
        setCapsPositions((prev) => prev.filter((cap) => cap.id !== id));
    }

    const removeBottle = (id) => {
        setBottlePositions((prev) => prev.filter((bottle) => bottle.id !== id));
    };

    const removeCombo = (id) => {
        setComboPositions((prev) => prev.filter((combo) => combo.id !== id));
    };

    const removeDrinkCombo = (id) => {
        setDrinkComboPositions((prev) => prev.filter((drinkCombo) => drinkCombo.id !== id));
    };

    const removeBiryani = (id) => {
        setBiryaniPositions((prev) => prev.filter((biryani) => biryani.id !== id));
    };

    return (
        <CollectiblesContext.Provider value={{
            setBiryaniPositions,
            setBottlePositions,
            setComboPositions,
            setDrinkComboPositions,
            setCapsPositions,
            bottlePositions,
            comboPositions,
            drinkComboPositions,
            biryaniPositions,
            removeBottle,
            removeCombo,
            removeDrinkCombo,
            removeBiryani,
            // capsPositions: scaledRotatedCapsPositions,
            capsPositions,
            removeCap,
            constantCapsPositions,
            setConstantCapsPositions
        }}>
            {children}
        </CollectiblesContext.Provider>
    );
};
