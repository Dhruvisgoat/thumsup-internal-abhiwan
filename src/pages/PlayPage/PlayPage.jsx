import React, { useState } from "react";

import "./PlayPage.css";
import ClickableMap from "../ClickableMap/ClickableMap";
import { IoIosArrowBack } from "react-icons/io";

const players = [
  { id: 1, name: "Male Player 1", image: "/images/male1.png" },
  { id: 2, name: "Male Player 2", image: "/images/male2.png" },
  { id: 3, name: "Female Player 1", image: "/images/female1.png" },
  { id: 4, name: "Female Player 2", image: "/images/female2.png" },
];

const PlayPage = ({ onPlayerSelect }) => {
  const [citySelected, setCitySelected] = useState(false);
  const [selectedState, setSelectedState] = useState("");

  const handleStateClick = (state) => {
    console.log(`State selected: ${state}`);
    setSelectedState(state);
    setCitySelected(true);
  };
  const handleBackClick = () => {
    // Logic for handling back action
    console.log("Back button clicked");
  };

  return (
    <div className="play-page">
      {!citySelected && (
        <div className="map-container">
          <ClickableMap
            onStateClick={handleStateClick}
            onBackClick={handleBackClick}
          />
        </div>
      )}

      {citySelected && (
        <div className="player-selection">
          {players.map((player) => (
            <div
              key={player.id}
              className="player-card"
              onClick={() => onPlayerSelect(player.id)}
            >
              <img
                src={player.image}
                alt={player.name}
                className="player-image"
              />
              <p>{player.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayPage;
