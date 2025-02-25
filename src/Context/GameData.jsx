import { createContext, useEffect, useState } from "react"

export const GameInfo = createContext(null)

const GameData = ({ children }) => {

    const [gameInfo, setGameInfo] = useState({
        character: "",
        name: null
    })

    useEffect(() => {
        localStorage.setItem("gameinfo", JSON.stringify(gameInfo));
    }, [gameInfo]);

    return (
        <GameInfo.Provider value={{ gameInfo, setGameInfo }}>
            {children}
        </GameInfo.Provider>
    )
}

export default GameData