import CityLevelHeader from "../../components/CityLevelHeader/CityLevelHeader";
import "./LevelSelection.css"
import level1 from "../../assets/UI/level/level1.png"
import unlocked from "../../assets/UI/level/locked.png"

// import unlocked from "../../assets/UI/extra/unlocked.png
// import unlocked from "../../assets/UI/extra/unlocked.png"

import { useNavigate } from "react-router-dom";

const LevelSelection = () => {
    const navigate = useNavigate()
    return (
        <>
            <CityLevelHeader />
            <div className="LevelSeclection">
                <div className="levelDiv">
                    <div className="levelCard" onClick={() => { navigate("/game1") }}
                    >
                        <div className="levelImg uiButton " style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'center' }}>
                            <img src={level1} />
                            <div className="levelName">
                                Level 1
                            </div>
                        </div>
                    </div>
                    <div className="levelCard" onClick={() => { navigate("/game2") }}  >
                        <div className="levelImg uiButton">
                            <img src={unlocked} />
                        </div>
                    </div>
                    <div className="levelCard" onClick={() => { navigate("/game3") }} >
                        <div className="levelImg uiButton">
                            <img src={unlocked} />
                        </div>
                    </div>
                    <div className="levelCard" onClick={() => { navigate("/game4") }} >
                        <div className="levelImg uiButton">
                            <img src={unlocked} />
                        </div>
                    </div>
                    <div className="levelCard" onClick={() => { navigate("/game5") }} >
                        <div className="levelImg uiButton ">
                            <img src={unlocked} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LevelSelection