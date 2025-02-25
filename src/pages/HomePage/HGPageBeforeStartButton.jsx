import { useEffect, useState } from "react";
import LoadingBar from "../../components/LoadingBar";
import "./HomePage.css";

const HGPageBeforeStartButton = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            console.log("Loading complete");
        }
    }, [isLoading]);

    return (
        <>
            <div className="home-page" style={{ zIndex: "100000" }}>
                <img src="/logo1.svg" alt="Logo" className="logo" />
                <LoadingBar setIsLoading={setIsLoading} />
            </div>
        </>
    );
};

export default HGPageBeforeStartButton;
