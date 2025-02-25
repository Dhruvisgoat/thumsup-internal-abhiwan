import Carousel from "react-multi-carousel";
import CityLevelHeader from "../CityLevelHeader/CityLevelHeader";
import { useMemo } from "react";
import "./Instructions.css";

const slides = [
  "introduction.png",
  "about.png",
  "howToPlay.png",
  "goals.png",
  "unlock.png",
  "selectState.png",
  "powerupPoints.png",
  "livesRemaining.png",
  "leaderboard.png",
];

const Instructions = () => {
  const responsive = useMemo(() => ({
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  }), []);

  return (
    <div className="instructionMain">
      <CityLevelHeader />
      <div className="instructionDiv">
        <Carousel
          swipeable
          draggable
          showDots
          responsive={responsive}
          ssr
          infinite
          keyBoardControl
          transitionDuration={300}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          className="instructionSlider"
        >
          {slides.map((slide, index) => (
            <div key={index} className="slide-container">
              <div style={{ height: "82vh", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ height: "80%", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <img height="100%" src={`./images/instruction/${slide}`} alt="instructions" />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Instructions;