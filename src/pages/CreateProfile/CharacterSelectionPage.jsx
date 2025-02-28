import { useContext, useEffect, useState } from "react";
import "./CharacterSelectionPage.css";

// import profile from "../../assets/UI/character/profile.png"
import char1 from "../../assets/UI/character/char1.png";
import char2 from "../../assets/UI/character/char2.png";
import char3 from "../../assets/UI/character/char3.png";
import char4 from "../../assets/UI/character/char4.png";
import pencil from "../../assets/UI/character/pencil.png";

import coin from "../../assets/UI/extra/coin.svg";
import char1Half from "../../assets/UI/character/char1Half.png";
import char2Half from "../../assets/UI/character/char2Half.png";
import char3Half from "../../assets/UI/character/char3Half.png";
import char4Half from "../../assets/UI/character/char4Half.png";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GameInfo } from "../../Context/GameData";

import CityLevelHeader from "../../components/CityLevelHeader/CityLevelHeader";

const CharacterSelectionPage = () => {
  const [username, setUsername] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [hoveredCharacter, setHoveredCharacter] = useState(null);

  const { gameInfo, setGameInfo } = useContext(GameInfo);
  const [edit, setEdit] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hover, setHover] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!location.href.includes("edit") && token) {
      navigate("/menu");
      return;
    }

    if (location.href.includes("edit")) {
      setEdit(true);
    }

    if (gameInfo.name) {
      setUsername(gameInfo.name);
    }

    if (gameInfo.character) {
      setSelectedCharacter(gameInfo.character); // Set the previously selected character
    }

  }, []);

  // const handleNext = () => {
  //   setShowError(true);

  //   if (!username) {
  //     toast.error("PLEASE ENTER USERNAME", {
  //       duration: 1000,
  //     });
  //     return;
  //   }
  //   if (!selectedCharacter) {
  //     toast.error("PLEASE SELECT CHARACTER", {
  //       duration: 1000,
  //     });
  //     return;
  //   }

  //   if (username.length < 3) {
  //     toast.error("USERNAME IS TOO SHORT.")
  //     return
  //   }

  //   setGameInfo({ ...gameInfo, character: selectedCharacter, name: username });

  //   navigate("/menu");
  // };




  const handleNext = async () => {
    setShowError(true);

    if (!username) {
      toast.error("PLEASE ENTER USERNAME", { duration: 1000 });
      return;
    }
    if (!selectedCharacter) {
      toast.error("PLEASE SELECT CHARACTER", { duration: 1000 });
      return;
    }
    if (username.length < 3) {
      toast.error("USERNAME IS TOO SHORT.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const url = edit
        ? "http://localhost:3001/user/update/profile"
        : "http://localhost:3001/user/create/profile";

      const headers = edit
        ? { "Content-Type": "application/json", Authorization: token }
        : { "Content-Type": "application/json" };

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ name: username, character: selectedCharacter }),
      });

      if (!response.ok) {
        throw new Error(edit ? "Failed to update profile" : "Failed to create profile");
      }

      const data = await response.json();
      if (!edit) {
        localStorage.setItem("authToken", data.token);
      }

      toast.success(edit ? "Profile updated successfully!" : "Profile created successfully!", {
        duration: 1000,
      });

      setGameInfo({ ...gameInfo, character: selectedCharacter, name: username });
      navigate("/menu");
    } catch (error) {
      toast.error(error.message || "Something went wrong", { duration: 1000 });
    }
  };




  const characters = [
    { id: 1, imgSrc: char1, alt: "Character 1" },
    { id: 2, imgSrc: char2, alt: "Character 2" },
    { id: 3, imgSrc: char3, alt: "Character 3" },
    { id: 4, imgSrc: char4, alt: "Character 4" },
  ];

  return (
    <>
      <CityLevelHeader />
      <div className="charactr-selectionMainDiv">
        <div className="character-selection-container">
          {edit && (
            <div className="collectedPoints">
              <img className="mx-1" src={coin} width={15} />
              1000
            </div>
          )}
          <div className="avatar-section">
            <div className="styleRoundedImageBorder">
              <img
                src={
                  selectedCharacter === 1
                    ? char1Half
                    : selectedCharacter === 2
                      ? char2Half
                      : selectedCharacter === 3
                        ? char3Half
                        : selectedCharacter === 4
                          ? char4Half
                          : char1Half
                }
                alt="Avatar"
                className="avatar-image"
              />
            </div>
          </div>
          <div className="avatarOuterDiv">
            <div className="avatarPosition">

              <input
                type="text"
                placeholder="YOUR USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={15}
                className={`username-input ${showError && (!username || username.length < 3) ? "noDataBorder" : "dataBorder"}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleNext();
                  }
                }}
                onFocus={(e) => {
                  e.target.placeholder = "";
                }}
                onBlur={(e) => {
                  if (!e.target.value) {
                    e.target.placeholder = "YOUR USERNAME";
                  }
                }}
              />

              {/* <img
                src={pencil}
                // alt={character.alt}
                className="inputPencilImage"
              /> */}
              <svg className="inputPencilImage" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_diiii_77_85)">
                  <rect x="1.99609" y="0.0395508" width="26.1161" height="26.1161" rx="13.058" fill="#142A75" />
                  <rect x="2.39407" y="0.437528" width="25.3201" height="25.3201" rx="12.6601" stroke="url(#paint0_linear_77_85)" stroke-width="0.795954" />
                  <path d="M15.5857 10.1L18.052 12.5663L12.2973 18.3209H9.83105V15.8546L15.5857 10.1ZM16.4078 9.27791L17.6409 8.04477C17.868 7.81776 18.236 7.81776 18.463 8.04477L20.1072 9.68896C20.3342 9.91597 20.3342 10.284 20.1072 10.511L18.874 11.7442L16.4078 9.27791Z" fill="white" />
                </g>
                <defs>
                  <filter id="filter0_diiii_77_85" x="-2.77963" y="-2.61363" width="32.753" height="32.4838" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="2.35045" />
                    <feGaussianBlur stdDeviation="0.587612" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_77_85" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_77_85" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feMorphology radius="0.930509" operator="erode" in="SourceAlpha" result="effect2_innerShadow_77_85" />
                    <feOffset dx="1.86102" />
                    <feGaussianBlur stdDeviation="2.32627" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_77_85" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="-1.39576" dy="-1.86102" />
                    <feGaussianBlur stdDeviation="0.930509" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0" />
                    <feBlend mode="normal" in2="effect2_innerShadow_77_85" result="effect3_innerShadow_77_85" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="-4.77572" dy="3.71445" />
                    <feGaussianBlur stdDeviation="2.44093" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect3_innerShadow_77_85" result="effect4_innerShadow_77_85" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-2.65318" />
                    <feGaussianBlur stdDeviation="1.59191" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect4_innerShadow_77_85" result="effect5_innerShadow_77_85" />
                  </filter>
                  <linearGradient id="paint0_linear_77_85" x1="2.44107" y1="0.905809" x2="29.1125" y2="2.41924" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#838383" />
                    <stop offset="0.136293" stop-color="#FDFDFD" />
                    <stop offset="0.33341" stop-color="#5E5E5E" />
                    <stop offset="0.485" stop-color="white" />
                    <stop offset="0.69" stop-color="#818181" />
                    <stop offset="0.9" stop-color="white" />
                  </linearGradient>
                </defs>
              </svg>

            </div>

            <div className="character-grid">
              {characters.map((character) => (
                <div
                  key={character.id}
                  onMouseEnter={() => {
                    setHoveredCharacter(character.id);
                    setHover(true)
                  }
                  }   // Add hover state on mouse enter
                  onMouseLeave={() => {
                    setHoveredCharacter(null);
                    setHover(false)
                  }
                  }

                  className={`uiButton character-box ${(
                    selectedCharacter === character.id || hoveredCharacter === character.id || !selectedCharacter
                  ) ? "selected" : "unselected"}`}


                  // className="character-box unselected "

                  // className={`character-box ${hover ? "selected" : "unselected"}`}

                  // className={`character-box ${selectedCharacter === character.id || !selectedCharacter
                  //   ? "selected"
                  //   : "unselected"
                  //   }`}

                  onClick={() => setSelectedCharacter(character.id)}
                >
                  <img
                    src={character.imgSrc}
                    alt={character.alt}
                    className="character-image"
                  />
                </div>
              ))}
            </div>
          </div>

          <button className="next-button uiButton" onClick={handleNext}>
            <span
              style={{ filter: "drop-shadow(0px 1.63884px 3.27769px #000000)", fontSize: '16px' }}
            >
              {edit ? "SAVE" : "NEXT"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CharacterSelectionPage;
