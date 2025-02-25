import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// second final commit
import HomePage from "./pages/HomePage/HomePage";
import MenuPage from "./pages/MenuPage/MenuPage";
import MapPage from "./pages/MenuPage/MenuPage";
import Leaderboard from "./pages/LeaderboardPage/Leaderboard";
import UILayout from "./Layout/UILayout";
import CharacterSelectionPage from "./pages/CreateProfile/CharacterSelectionPage";
import LevelSelection from "./pages/LevelSelection/LevelSelection";
import Instructions from "./components/Instructions/Instructions";
import { Toaster } from "react-hot-toast";
import Settings from "./pages/SettingsPop/Settings";
import GameData from "./Context/GameData";
import Map from "./pages/Map/Map";
import { Suspense, useEffect, lazy } from "react";
import Game from "./games/Game";
import Game2 from "./games/Game2";
import Game3 from "./games/Game3";
import Game4 from "./games/Game4";
import Game5 from "./games/Game5";
import { Howl, Howler } from 'howler';
  
// const Game = lazy(() => import("./games/Game"));
// const Game2 = lazy(() => import("./games/Game2"));
// const Game3 = lazy(() => import("./games/Game3"));
// const Game4 = lazy(() => import("./games/Game4"));
// const Game5 = lazy(() => import("./games/Game5"));


// const preloadComponents = () => {
//   import("./games/Game");
//   import("./games/Game2");
//   import("./games/Game3");
//   import("./games/Game4");
//   import("./games/Game5");
// };




const App = () => {

  // Add this effect
  useEffect(() => {

    var sound = new Howl({
      src: ['/audio/pop.mp3']
    });

    // sound.play();

    const handleClick = (event) => {
      const uiButtonElement = event.target.closest('.uiButton');
      if (uiButtonElement) {
        // const audio = new Audio('/audio/pop.mp3');
        // audio.currentTime = 0; // Reset playback positio
        // audio.play().catch(() => { /* Handle errors silently */ });
        sound.play();
      }
    };



    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <>
      <GameData >
        <Router>
          <Routes>
            <Route path="" element={<UILayout />} >
              <Route path="/" element={<HomePage />} />
              <Route path="/create/profile" element={<CharacterSelectionPage />} />
              <Route path="/edit" element={<CharacterSelectionPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/instructions" element={<Instructions />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/play" element={<Map />} />
              <Route path="/game1" element={<Game />} />
              <Route path="/game2" element={<Game2 />} />
              <Route path="/game3" element={<Game3 />} />
              <Route path="/game4" element={<Game4 />} />
              <Route path="/game5" element={<Game5 />} />

              <Route
                path="/map"
                element={<MapPage onCitySelect={setSelectedCity} />}
              />
              {/* <Route
                path="/play"
                element={<PlayPage selectedCity={selectedCity} />}
              /> */}
              <Route
                path="/level"
                element={<LevelSelection />}
              />
              <Route
                path="/leaderboard"
                element={<Leaderboard />}
              />
            </Route>
          </Routes>
        </Router>
      </GameData>

      <Toaster />
    </>
  );
};

export default App;
