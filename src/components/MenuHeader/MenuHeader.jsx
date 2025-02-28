import "./MenuHeader.css"
import info from "../../assets/UI/extra/info.png"
import { useNavigate } from "react-router-dom"
import { useContext,useEffect,useState } from "react"
import { GameInfo } from "../../Context/GameData"


import char1 from "../../assets/UI/character/char1Half.png"
import char2 from "../../assets/UI/character/char2Half.png"
import char3 from "../../assets/UI/character/char3Half.png"
import char4 from "../../assets/UI/character/char4Half.png"

const MenuHeader = () => {

  const navigate = useNavigate()

  const { gameInfo } = useContext(GameInfo)

  const charArray = [char1, char2, char3, char4]

  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      // console.log("fetch profile called");
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {

        const response = await fetch("http://localhost:3001/user/get/profile", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        console.log(data);
        setUsername(data.data.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);









  return (
    <>
      <div className="menuHeader">
        <div className="menuProfile">
          <div style={{ zIndex: '2' }}>
            <img className="uiButton" src={charArray.at((gameInfo.character) - 1)} width={50} style={{
              borderRadius: "50%",
              border: '1px solid white',
              cursor: "pointer",
              background: '#1f2d68'
            }}
              onClick={() => { navigate("/edit") }}
            />
          </div>
          <div style={{ position: 'relative', zIndex: '1' }} >
            {/* <p onClick={() => { navigate("/edit") }} style={{ position: 'absolute',   textShadow: '0px 1px 20px rgba(255, 255, 255, 0.5)', top: '-13px', left: '0px', zIndex: '2', width: '110px', textAlign: 'center' }} className="text-white px-2 uiButton">{gameInfo.name}</p> */}
            <p onClick={() => { navigate("/edit") }} style={{ position: 'absolute',   textShadow: '0px 1px 20px rgba(255, 255, 255, 0.5)', top: '-13px', left: '0px', zIndex: '2', width: '110px', textAlign: 'center' }} className="text-white px-2 uiButton">{username}</p>
            <svg onClick={() => { navigate("/edit") }} className="uiButton" style={{ position: 'absolute', top: '-17px', left: '-40px' }} width="170" height="38" viewBox="0 0 134 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_dii_1_2)">
                <path d="M2 6.28902C2 2.81569 4.81569 0 8.28902 0H125.711C129.184 0 132 2.81569 132 6.28902V25.711C132 29.1843 129.184 32 125.711 32H8.28901C4.81569 32 2 29.1843 2 25.711V6.28902Z" fill="#142A75" />
                <path d="M8.28902 0.589596H125.711C128.859 0.589596 131.41 3.14131 131.41 6.28902V25.711C131.41 28.8587 128.859 31.4104 125.711 31.4104H8.28901C5.14131 31.4104 2.5896 28.8587 2.5896 25.711V6.28902C2.5896 3.14131 5.14131 0.589596 8.28902 0.589596Z" stroke="url(#paint0_linear_1_2)" stroke-width="1.17919" />
              </g>
              <defs>
                <filter id="filter0_dii_1_2" x="-0.0677969" y="-2.75706" width="134.825" height="39.9803" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="3.48214" />
                  <feGaussianBlur stdDeviation="0.870536" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_2" result="shape" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feMorphology radius="1.37853" operator="erode" in="SourceAlpha" result="effect2_innerShadow_1_2" />
                  <feOffset dx="2.75706" />
                  <feGaussianBlur stdDeviation="3.44633" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1_2" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dx="-2.0678" dy="-2.75706" />
                  <feGaussianBlur stdDeviation="1.37853" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0" />
                  <feBlend mode="normal" in2="effect2_innerShadow_1_2" result="effect3_innerShadow_1_2" />
                </filter>
                <linearGradient id="paint0_linear_1_2" x1="4.215" y1="1.06143" x2="130.686" y2="30.2156" gradientUnits="userSpaceOnUse">
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
        </div>
        <div className="menuInfo" onClick={() => { navigate("/instructions") }} >
          {/* <img src={info} /> */}
          <svg className="uiButton" width="36" height="38" viewBox="0 0 36 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_diii_563_107)">
              <rect x="2" width="32" height="32" rx="16" fill="#142A75" />
              <rect x="2.5896" y="0.589596" width="30.8208" height="30.8208" rx="15.4104" stroke="url(#paint0_linear_563_107)" stroke-width="1.17919" />
            </g>
            <rect x="2.5" y="0.5" width="31" height="31" rx="15.5" fill="#142A75" />
            <rect x="2.5" y="0.5" width="31" height="31" rx="15.5" stroke="white" />
            <path d="M19.6902 8.55172C19.6902 8.98207 19.5405 9.35448 19.2412 9.66897C18.9418 9.97517 18.5759 10.1283 18.1435 10.1283C17.711 10.1283 17.3368 9.97517 17.0208 9.66897C16.7131 9.35448 16.5593 8.98207 16.5593 8.55172C16.5593 8.1131 16.7131 7.74483 17.0208 7.4469C17.3368 7.14897 17.711 7 18.1435 7C18.5759 7 18.9418 7.14897 19.2412 7.4469C19.5405 7.74483 19.6902 8.1131 19.6902 8.55172ZM21 25H15V24.0069L16.2474 23.9324C16.605 23.9076 16.7838 23.7214 16.7838 23.3738V14.2993H15.0249V13.4055L18.1435 12.4372H19.1538V23.3738C19.1538 23.531 19.2037 23.6634 19.3035 23.771C19.4116 23.8703 19.5405 23.9241 19.6902 23.9324L21 24.0069V25Z" fill="white" />
            <defs>
              <filter id="filter0_diii_563_107" x="-0.0677969" y="-2.75706" width="36.8249" height="39.9803" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="3.48214" />
                <feGaussianBlur stdDeviation="0.870536" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_563_107" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_563_107" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feMorphology radius="1.37853" operator="erode" in="SourceAlpha" result="effect2_innerShadow_563_107" />
                <feOffset dx="2.75706" />
                <feGaussianBlur stdDeviation="3.44633" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_563_107" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="-2.0678" dy="-2.75706" />
                <feGaussianBlur stdDeviation="1.37853" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0" />
                <feBlend mode="normal" in2="effect2_innerShadow_563_107" result="effect3_innerShadow_563_107" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="15" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0" />
                <feBlend mode="normal" in2="effect3_innerShadow_563_107" result="effect4_innerShadow_563_107" />
              </filter>
              <linearGradient id="paint0_linear_563_107" x1="2.54523" y1="1.06143" x2="35.2257" y2="2.91583" gradientUnits="userSpaceOnUse">
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
      </div>



    </>
  )
}

export default MenuHeader