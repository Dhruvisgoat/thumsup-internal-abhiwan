import { useNavigate } from "react-router-dom";
import "./MenuPage.css";
import { useState } from "react";
// import ModalSetting from "../../components/SettingsModal/ModalSetting";
import MenuHeader from "../../components/MenuHeader/MenuHeader";
import menuFood from "../../assets/UI/extra/menuFood.webp"

const MenuPage = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <MenuHeader />
      <div className="menu-page">
        <img  src="/logo1.svg" alt="Logo" className="menu_logo" />
        {/* <div className="menuBtn" > */}
        <div className="menuBtn">
          <button className="uiButton" style={{ height: '50px', fontSize: '24px' }} onClick={() => navigate("/play")}>PLAY</button>
          <button className="uiButton" style={{ height: '50px', fontSize: '24px' }} onClick={() => navigate("/leaderboard")}>LEADERBOARD</button>
          <button className="uiButton" style={{ height: '50px', fontSize: '24px' }} onClick={() => { navigate("/settings") }}>SETTINGS</button>
          {/* <button onClick={() => { navigate("/instruction") }}>How To Play?</button> */}
        </div>
        {/* </div> */}




        <div className="menuFoodImg">
          <img src={menuFood} />
        </div>



      </div>



      {/* <ModalSetting
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
    </>
  );
};

export default MenuPage;
