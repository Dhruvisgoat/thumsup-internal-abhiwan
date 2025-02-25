// import VFXSprite from "./VFXSprite";
// import fireMetaData from "../../public/Vfxs/fire_soft.png.json"; // Import fire sprite JSON metadata
// import imageUrl from '../../public/Vfxs/glow4.png'
// import { DirectionContext } from "../RefContext/DirectionContext";
// import { useContext } from "react";
// import { MyContext } from "../RefContext/Context";

// function FireVFX(props) {

//     const { collectedCount } = useContext(DirectionContext);
//     const { playerRef } = useContext(MyContext);

//     return (
//         <VFXSprite {...props} imageUrl={imageUrl} metaData={fireMetaData} />
//     );
// }

// export default FireVFX;



import { useEffect, useState, useRef } from "react";
import VFXSprite from "./VFXSprite";
import fireMetaData from "../../public/Vfxs/fire_soft.png.json";
import imageUrl from '../../public/Vfxs/glow4.png';
import { DirectionContext } from "../RefContext/DirectionContext";
import { useContext } from "react";
import { MyContext } from "../RefContext/Context";

function FireVFX(props) {
    const VFXSpriteRef = useRef();
    const { collectedCount } = useContext(DirectionContext);
    const { playerRef } = useContext(MyContext);
    const [showVFX, setShowVFX] = useState(false);

    useEffect(() => {
        if (collectedCount > 0) {
            setShowVFX(true);

            const timer = setTimeout(() => {
                setShowVFX(false);
            }, 1000); // Display VFX for 1 second
            return () => clearTimeout(timer); // Cleanup timer on unmount or change
        }
    }, [collectedCount, playerRef]);

    return (
        showVFX && playerRef.current ? (
            <VFXSprite
                ref={VFXSpriteRef}
                {...props}
                imageUrl={imageUrl}
                metaData={fireMetaData}
                position={[1,1,2]} // Set position to player's current location
            />
        ) : null
    );
}

export default FireVFX;
