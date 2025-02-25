import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoadingBar from "../../components/LoadingBar";
import "./HomePage.css";
import { PauseContext } from "../../RefContext/PauseContext";

const HomeGamePage = ({ onShowComponentChange }) => {
  const { setPause } = useContext(PauseContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    // Notify the parent whenever `showComponent` changes
    if (onShowComponentChange) {
      onShowComponentChange(showComponent);
    }
  }, [showComponent, onShowComponentChange]);

  useEffect(() => {
    if (!isLoading) {
      console.log("Loading complete");
    }
  }, [isLoading]);

  return (
    <>
      {showComponent && (
        <div className="home-page" style={{ zIndex: "100000" }}>
          <img src="/logo1.svg" alt="Logo" className="logo" />
          {isLoading ? (
            <LoadingBar setIsLoading={setIsLoading} />
          ) : (
            <>
              <svg className="uiButton" style={{ zIndex:'10000000',cursor: 'pointer' }} onClick={() => { setShowComponent(false); setPause(false); }} width="318" height="74" viewBox="0 0 318 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_diiii_968_23)">
                  <rect x="4" y="0.382324" width="310" height="61.2346" rx="7.65432" fill="#DF0025" shape-rendering="crispEdges" />
                  <rect x="5.29603" y="1.67835" width="307.408" height="58.6425" rx="6.35829" stroke="url(#paint0_linear_968_23)" stroke-width="2.59206" shape-rendering="crispEdges" />
                  <path d="M136.655 33.4035V37.2115C136.655 37.6382 136.868 37.8515 137.295 37.8515H138.287C138.714 37.8515 138.927 37.6382 138.927 37.2115V32.6995C138.927 32.3155 138.746 32.0702 138.383 31.9635L135.215 30.9395C133.679 30.4488 132.911 29.3182 132.911 27.5475V22.7795C132.911 21.5848 133.22 20.6782 133.839 20.0595C134.479 19.4195 135.396 19.0995 136.591 19.0995H139.023C140.218 19.0995 141.124 19.4195 141.743 20.0595C142.383 20.6782 142.703 21.5848 142.703 22.7795V25.4675L138.959 26.3955V23.3875C138.959 22.9608 138.746 22.7475 138.319 22.7475H137.327C136.9 22.7475 136.687 22.9608 136.687 23.3875V27.1635C136.687 27.5475 136.858 27.7822 137.199 27.8675L140.399 28.8915C141.914 29.3822 142.671 30.5128 142.671 32.2835V37.7875C142.671 38.9822 142.351 39.8995 141.711 40.5395C141.092 41.1795 140.186 41.4995 138.991 41.4995H136.559C135.343 41.4995 134.426 41.1795 133.807 40.5395C133.188 39.8995 132.879 38.9928 132.879 37.8195V34.3315L136.655 33.4035ZM152.955 22.7475H150.139V41.4995H146.395V22.7475H143.579V19.0995H152.955V22.7475ZM161.886 19.0995L164.574 41.4995H160.51L160.094 37.1155H157.118L156.702 41.4995H152.766L155.454 19.0995H161.886ZM159.774 33.6595L158.782 22.7475H158.43L157.438 33.6595H159.774ZM165.889 19.0995H171.553C172.961 19.0995 174.006 19.4195 174.689 20.0595C175.371 20.6995 175.713 21.6808 175.713 23.0035V29.3715C175.713 30.6942 175.233 31.6328 174.273 32.1875L176.065 41.4995H172.129L170.817 33.4995L169.633 33.7875V41.4995H165.889V19.0995ZM171.425 29.6275C171.787 29.5422 171.969 29.3075 171.969 28.9235V23.3875C171.969 22.9608 171.755 22.7475 171.329 22.7475H169.633V30.0755L171.425 29.6275ZM185.924 22.7475H183.108V41.4995H179.364V22.7475H176.548V19.0995H185.924V22.7475Z" fill="white" />
                </g>
                <defs>
                  <filter id="filter0_diiii_968_23" x="-11.5523" y="-8.25786" width="331.613" height="81.9708" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="7.65432" />
                    <feGaussianBlur stdDeviation="1.91358" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_968_23" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_968_23" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feMorphology radius="3.03024" operator="erode" in="SourceAlpha" result="effect2_innerShadow_968_23" />
                    <feOffset dx="6.06047" />
                    <feGaussianBlur stdDeviation="7.57559" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_968_23" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="-4.54536" dy="-6.06047" />
                    <feGaussianBlur stdDeviation="3.03024" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0" />
                    <feBlend mode="normal" in2="effect2_innerShadow_968_23" result="effect3_innerShadow_968_23" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="-15.5523" dy="12.0963" />
                    <feGaussianBlur stdDeviation="7.94897" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect3_innerShadow_968_23" result="effect4_innerShadow_968_23" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-8.64018" />
                    <feGaussianBlur stdDeviation="5.18411" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect4_innerShadow_968_23" result="effect5_innerShadow_968_23" />
                  </filter>
                  <linearGradient id="paint0_linear_968_23" x1="9.28192" y1="2.41345" x2="302.682" y2="86.6967" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#838383" />
                    <stop offset="0.136293" stop-color="#FDFDFD" />
                    <stop offset="0.33341" stop-color="#5E5E5E" />
                    <stop offset="0.485" stop-color="white" />
                    <stop offset="0.69" stop-color="#818181" />
                    <stop offset="0.9" stop-color="white" />
                  </linearGradient>
                </defs>
              </svg>


            </>

          )}
        </div>
      )}
    </>
  );
};

export default HomeGamePage;
