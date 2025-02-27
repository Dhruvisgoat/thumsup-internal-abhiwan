// import CocaCola from "./Collectibles/CocaCola";
// import Combo from "./Collectibles/Combo";
// import DrinkCombo from "./Collectibles/DrinkCombo";
// import Biryanii from "./Collectibles/Biraynii";
// import { useContext } from "react";
// import { CollectiblesContext } from "./RefContext/CollectiblesContext";
// import Cap from "./Collectibles/Cap";
// import { useMemo } from "react";
// import * as THREE from "three";
// import DieSprite from "./Sprites/DieSprite";

// const Sphere = ({ color = "white", position = [0, -100, 0] }) => {
//     return (
//         <group position={position}>
//             <mesh position={[0, -1, 0]}>
//                 <sphereGeometry args={[4, 32, 32]} />
//                 <meshStandardMaterial color={color} transparent={true} opacity={0.2} />
//             </mesh>
//         </group>

//     );
// };

// const CollectiblesRenderer = (props) => {
//     const {
//         bottlePositions,
//         comboPositions,
//         drinkComboPositions,
//         biryaniPositions,
//         constantCapsPositions
//     } = useContext(CollectiblesContext);

//     return (
//         <>
//             <Cap capsPositions={constantCapsPositions} />

//             {bottlePositions.map((bottle, index) => (
//                 <>
//                     <CocaCola {...props} key={`bottle-${bottle.id}`} position={bottle.position} />
//                     <Sphere position={bottle.position} key={`sphere-bottle-${index}` } color="grey" />
//                 </>
//             ))}

//             {biryaniPositions.map((biryani, index) => (
//                 <>
//                     <Biryanii {...props} key={`biryani-${biryani.id}`} position={biryani.position} />
//                     <Sphere position={biryani.position} key={`sphere-biryani-${index}`} color="grey" />
//                 </>
//             ))}

//             {comboPositions.map((combo, index) => (
//                 <>
//                     <Combo {...props} key={`combo-${combo.id}`} position={combo.position} />
//                     <Sphere position={combo.position} key={`sphere-combo-${index}`} color="#c8102e" />
//                 </>
//             ))}

//             {drinkComboPositions.map((drinkCombo, index) => (
//                 <>
//                     <DrinkCombo {...props} key={`drinkCombo-${drinkCombo.id}`} position={drinkCombo.position} />
//                     <Sphere position={drinkCombo.position} key={`sphere-drinkCombo-${index}`} color="#0057b8" />
//                 </>
//             ))}
//         </>
//     );
// };

// export default CollectiblesRenderer;















import CocaCola from "./Collectibles/CocaCola";
import Combo from "./Collectibles/Combo";
import DrinkCombo from "./Collectibles/DrinkCombo";
import Biryanii from "./Collectibles/Biraynii";
import { useContext } from "react";
import { CollectiblesContext } from "./RefContext/CollectiblesContext";
import Cap from "./Collectibles/Cap";
import { useMemo } from "react";
import * as THREE from "three";
import DieSprite from "./Sprites/DieSprite";
import { CapRemoveIdContext } from "./RefContext/CapRemoveId";
import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { DirectionContext } from "./RefContext/DirectionContext";

const Sphere = ({ color = "white", position = [0, -100, 0] }) => {
    return (
        <group position={position} scale={1.2}>
            <mesh position={[0, -1, 0]}>
                <sphereGeometry args={[4, 32, 32]} />
                <meshStandardMaterial color={color} transparent={true} opacity={0.2} />
            </mesh>
        </group>

    );
};

function InstanceCocaCola({ bottle, index, audio }) {
    const { bottleIdRef, bottleCountRef } = useContext(CapRemoveIdContext);
    const { setCollectedCountCoke, volume } = useContext(DirectionContext);
    const [render, setRender] = useState(true);

    useEffect(() => {
        setCollectedCountCoke((prev) => prev + 1);
        // bottleCountRef.current += 1;
    }, [render])

    useFrame(() => {
        if (bottleIdRef.current === bottle.id && render) {
            setRender(false);
            audio.currentTime = 0; // Reset audio to the start
            audio.volume = volume/100; // Set the volume
            audio.play(); // Play the audio
        }
    });

    return (
        <>
            {render && (
                <>
                    <CocaCola key={`bottle-${bottle.id}`} position={bottle.position} />
                    <Sphere position={bottle.position} key={`sphere-bottle-${index}`} color="grey" />
                </>
            )}
        </>
    )
}

function InstanceBiryani({ biryani, index, audio }) {
    const { biryaniIdRef, biryaniCountRef } = useContext(CapRemoveIdContext);
    const { setCollectedCountBiryani,volume } = useContext(DirectionContext);
    const [render, setRender] = useState(true);

    useEffect(() => {
        setCollectedCountBiryani((prev) => prev + 1);
        // biryaniCountRef.current += 1;
    }, [render])

    useFrame(() => {
        if (biryaniIdRef.current === biryani.id && render) {
            setRender(false);
            audio.currentTime = 0; // Reset audio to the start
            audio.volume = volume/100; // Set the volume
            audio.play(); // Play the audio
        }
    });

    return (
        <>
            {render && (
                <>
                    <Biryanii index={index} key={`biryani-${biryani.id}`} position={biryani.position} />
                    <Sphere position={biryani.position} key={`sphere-biryani-${index}`} color="grey" />
                </>
            )}
        </>
    )
}

const CollectiblesRenderer = (props) => {
    const {
        bottlePositions,
        comboPositions,
        drinkComboPositions,
        biryaniPositions,
        constantCapsPositions
    } = useContext(CollectiblesContext);

    const bottleAudio = useMemo(() => new Audio("/audio/drinkCoke.mp3"), []);
    const biryaniAudio = useMemo(() => new Audio("/audio/eatSound.mp3"), []);
    const comboAudio = useMemo(() => new Audio("/audio/collected.mp3"), []);
    const drinkComboAudio = useMemo(() => new Audio("/audio/collectBottle.mp3"), []);

    return (
        <>
            <Cap capsPositions={constantCapsPositions} />

            {
                bottlePositions.map((bottle, index) => (
                    <InstanceCocaCola bottle={bottle} index={index} audio={bottleAudio} />
                ))
            }

            {
                biryaniPositions.map((biryani, index) => (
                    <InstanceBiryani biryani={biryani} index={index} audio={biryaniAudio} />
                ))
            }

            {comboPositions.map((combo, index) => (
                <>
                    <Combo {...props} key={`combo-${combo.id}`} position={combo.position} />
                    <Sphere position={combo.position} key={`sphere-combo-${index}`} color="#c8102e" />
                </>
            ))}

            {drinkComboPositions.map((drinkCombo, index) => (
                <>
                    <DrinkCombo {...props} key={`drinkCombo-${drinkCombo.id}`} position={drinkCombo.position} />
                    <Sphere position={drinkCombo.position} key={`sphere-drinkCombo-${index}`} color="#0057b8" />
                </>
            ))}


            {/* {bottlePositions.map((bottle, index) => (
                <>
                    <CocaCola {...props} key={`bottle-${bottle.id}`} position={bottle.position} />
                    <Sphere position={bottle.position} key={`sphere-bottle-${index}`} color="grey" />
                </>
            ))} */}

            {/* {biryaniPositions.map((biryani, index) => (
                <>
                    <Biryanii {...props} key={`biryani-${biryani.id}`} position={biryani.position} />
                    <Sphere position={biryani.position} key={`sphere-biryani-${index}`} color="grey" />
                </>
            ))} */}


        </>
    );
};

export default CollectiblesRenderer;
