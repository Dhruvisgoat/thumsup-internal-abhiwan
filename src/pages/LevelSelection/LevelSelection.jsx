import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CityLevelHeader from "../../components/CityLevelHeader/CityLevelHeader";
import "./LevelSelection.css";
import level1 from "../../assets/UI/level/level1.png";
import unlocked from "../../assets/UI/level/locked.png";

const LevelSelection = () => {
    const navigate = useNavigate();
    const [selectedLevel, setSelectedLevel] = useState(null);

    const handleLevelClick = (level, route) => {
        setSelectedLevel(level);
        console.log("Selected Level:", level);
        navigate(route);
    };

    return (
        <>
            <CityLevelHeader />
            <div className="LevelSelection">
                <div className="levelDiv">
                    {[1, 2, 3, 4, 5].map((level) => (
                        <div key={level} className="levelCard" onClick={() => handleLevelClick(level, `/game${level}`)}>
                            <div className="levelImg uiButton">
                                <img src={level === 1 ? level1 : unlocked} />
                                <div className="levelName">Level {level}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default LevelSelection;
