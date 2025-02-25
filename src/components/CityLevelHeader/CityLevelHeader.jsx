import { MdKeyboardArrowLeft } from "react-icons/md";
import "./CityLevelHeader.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from '../../assets/UI/extra/left.png'
import backButton from '../../assets/UI/extra/backButton.svg'

const CityLevelHeader = () => {

    const [title, setTitle] = useState("")
    const [showBack, setShowBack] = useState(false)

    const navigate = useNavigate();
    // const location = useLocation();
    // const previousPath = useRef(null);

    // const handleBack = () => {
    //     if (previousPath.current) {
    //         // Navigate back to the last page visited
    //         navigate(-1);
    //     } else {
    //         console.log("No previous page in history");
    //     }
    // };


    // useEffect(() => {
    //     // Store the previous path in a ref
    //     previousPath.current = location.pathname;
    // }, [location]);



    const handleBack = () => {
        let test = location.href.split("/")
        if (
            test[test.length - 1] === "leaderboard"
            || test[test.length - 1] === "instructions"
            || test[test.length - 1] === "play"
            || test[test.length - 1] === "edit"
            || test[test.length - 1] === "settings"
        ) {
            navigate("/menu")
        }
        else if (test[test.length - 1] === "level") {
            navigate("/play")
        }

    }


    useEffect(() => {
        let test = location.href.split("/")
        console.log(test)
        setShowBack(true)
        if (test[test.length - 1] === "play") {
            setTitle("CITY SELECTION")
            return
        }
        else if (test[test.length - 1] === "level") {
            setTitle("LEVEL SELECTION")
            return
        } else if (test[test.length - 1] === "edit") {
            setTitle("")
            return
        } else if (test[test.length - 2] === "create") {
            setTitle("")
            setShowBack(false)
            return
        }
        setTitle(test[test.length - 1])
    }, [location.href])

    return (
        <div className="CityLevelHeader" style={{ zIndex: '99999', position: 'relative', height: '45px' }} >

            <div className="headerTopic text-center text-white text-uppercase " style={{ position: 'absolute', top: '20px' }}>
                {showBack && (<img className="uiButton" onClick={handleBack} src={backButton} alt="back" width={"40px"} />)}
                <h1 > {title}</h1>
            </div>

        </div>
    )
}

export default CityLevelHeader