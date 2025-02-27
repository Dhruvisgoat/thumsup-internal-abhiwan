import React, { useContext, useState, useRef, useEffect } from 'react'
import { DirectionContext } from '../RefContext/DirectionContext'
import ThreeMinuteTimer from './Timer/Timer';
import MiniMap from './MiniMap/MiniMap';
import ToggleView from './ToggleView/ToggleView';
import QuitPopup from './Popups/QuitPopup/QuitPopup';
import GameOverPopup from './Popups/GameOverPopup/GameOverPopup';
import LevelFinishPopup from './Popups/LevelFinishPopup/LevelFinishPopup';
import SettingsPopup from './Popups/SettingsPopup/SettingsPopup';
import { CollectiblesContext } from '../RefContext/CollectiblesContext';
import Slider from '@mui/material/Slider';
import { CapRemoveIdContext } from '../RefContext/CapRemoveId';
import { PauseContext } from '../RefContext/PauseContext';
import Settings from './Popups/SettingsPopup/Settings'
import { ViewContext } from '../RefContext/ViewContext';
import { isAndroid, isIOS } from 'react-device-detect';
import ScoreAlgo from './ScoreAlgo/ScoreAlgo';
import { ProgressBar } from 'react-bootstrap';
import { use } from 'react';

function AppUi() {

    const { setPause, pause } = useContext(PauseContext);

    // const { setIsIsometric } = useContext(ViewContext);
    // useEffect(()=>{
    //     setIsIsometric(false);
    // })

    const { isPlayerDied, setRestart, collectedCount, isVictory, collectedCountBiryani, collectedCountCoke, collectedCap, lives } = useContext(DirectionContext);

    const [openSettings, setOpenSettings] = useState(false);
    const [openExit, setOpenExit] = useState(false);

    const [sliderValue, setSliderValue] = useState(70);
    const { capCountRef } = useContext(CapRemoveIdContext);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    const lastRoute = window.location.pathname.split('/').filter(Boolean).pop() || 'Home';

    // Generate level text
    const levelText = lastRoute.startsWith('game')
        ? `LEVEL ${lastRoute.replace('game', '')}`
        : 'UNKNOWN LEVEL';

    return (
        <>
            <div style={{
                fontSize: '13px',
                width: "100vw",
                position: 'fixed', left: '0%', zIndex: '50000', borderRadius: '8px'
                , ...(isIOS && { top: '0%' }), // Add 'top: 0%' only for iOS
            }}>
                <div style={{
                    height: '50px',
                    backdropFilter: 'blur(50px)',
                    display: 'flex',
                    alignItems: 'center',
                    // width: '500px',
                    gap: '10px',
                    padding: '0px 10px'
                }}>
                    <div style={{ color: 'white', background: "#1A265B", border: '1px solid white', borderRadius: '5px', padding: '5px' }}>
                        <img src='/images/ui-logo/pizza.png' height="20px"></img>
                        {/* {collectedCountBiryani}/5 */}
                        {collectedCountBiryani - 5}/5
                    </div>

                    <div style={{ color: 'white', background: "#1A265B", border: '1px solid white', borderRadius: '5px', padding: '5px' }}>
                        <img src='/images/ui-logo/coke.png' height="20px"></img>
                        {/* {collectedCountCoke}/5 */}
                        {collectedCountCoke - 5}/5
                    </div>

                    <div style={{ color: 'white', background: "#1A265B", border: '1px solid white', borderRadius: '5px', padding: '5px' }}>
                        {/* {Math.round(3 - lives)}/3 */}
                        {Math.abs(Math.round(3 - lives))}/3
                        {/* {lives} */}
                    </div>

                    {/* <div style={{ color: 'white', background: "#1A265B", border: '1px solid white', borderRadius: '5px', padding: '5px' }}>
                        {capCountRef.current / 2 - 930}
                    </div> */}

                    <div style={{ color: 'white', background: "#1A265B", border: '1px solid white', borderRadius: '5px', padding: '5px' }}>
                        {levelText}
                    </div>
                    {/* <div style={{ color: 'white', background: "#1A265B", border: '1px solid white', borderRadius: '5px', padding: '5px' }}>
                        <ScoreAlgo />
                    </div> */}
                    {/* for quit */}
                    <div style={{ color: 'white', background: "#1A265B", border: '1px solid white', borderRadius: '5px', padding: '5px', marginLeft: "auto" }} onClick={() => { setOpenExit(prev => !prev); setOpenSettings(false); }} className="uiButton">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 18.7236V10.0369C21 7.12723 21 4.2176 20.9836 1.32483C20.9836 0.523628 20.7295 0.253748 19.9589 0.253748H16.3518C16.0375 0.253748 15.7233 0.252811 15.409 0.251874C14.7805 0.25 14.152 0.248126 13.5235 0.253748C12.9087 0.253748 12.6217 0.565796 12.6217 1.18989C12.6182 1.43208 12.6192 1.67271 12.6202 1.91313V1.91324C12.6216 2.23371 12.6229 2.5538 12.6135 2.87664C12.6053 3.09591 12.6627 3.21399 12.8677 3.32362C13.5399 3.69471 13.7121 4.46218 13.294 5.12001C13.1464 5.35615 12.9824 5.57543 12.8103 5.79471C12.6791 5.96338 12.6053 6.14049 12.6135 6.3682C12.6299 6.97543 12.6299 7.57422 12.6135 8.18145C12.6053 8.4682 12.6791 8.57784 12.9742 8.56097C13.3284 8.53995 13.6769 8.54803 14.0292 8.55621C14.1009 8.55787 14.1728 8.55954 14.2449 8.56097C14.4581 8.56097 14.5646 8.53567 14.6302 8.27422C14.786 7.65856 15.4336 7.43085 15.9337 7.81037C16.6797 8.37543 17.4093 8.96579 18.1307 9.56458C18.5406 9.90193 18.5816 10.4839 18.1881 10.8212C17.4421 11.4706 16.6633 12.0863 15.8681 12.6851C15.4746 12.9802 14.8598 12.8369 14.7286 12.3814C14.581 11.8754 14.2859 11.8923 13.917 11.9176C13.6301 11.9345 13.3432 11.9429 13.0562 11.9176C12.7201 11.8839 12.6217 11.9851 12.6217 12.3477C12.634 13.9413 12.6325 15.5301 12.631 17.1213V17.1217C12.6304 17.6525 12.6299 18.1836 12.6299 18.7152C12.6299 19.4573 12.9005 19.7441 13.6137 19.7441H20.0081C20.7295 19.7441 21 19.4573 21 18.7236Z" fill="white" />
                            <path d="M4.52525 7.12197C4.64806 7.04767 4.77196 6.97272 4.89927 6.89952L4.90217 6.90695C4.9166 6.94384 4.92337 6.96112 4.91567 7.00073C4.85341 7.46121 4.78735 7.92168 4.72124 8.38245C4.46531 10.1665 4.20874 11.9549 4.16965 13.7646C4.16146 13.9754 4.04668 14.0345 3.85813 14.0682C3.21909 14.1723 2.5835 14.2835 1.94688 14.3949L1.94661 14.3949L1.94649 14.395C1.60322 14.455 1.25965 14.5151 0.91507 14.5742C0.300224 14.6754 -0.0768809 15.1477 0.0132964 15.7043C0.111672 16.2863 0.619944 16.5899 1.25938 16.4718C1.65288 16.4015 2.04638 16.3303 2.43988 16.2591C3.22689 16.1167 4.01389 15.9742 4.80089 15.8393C5.73546 15.679 5.94861 15.426 5.9896 14.4561C6.01146 13.9614 6.04789 13.4666 6.08433 12.9718C6.10255 12.7244 6.12076 12.477 6.13716 12.2296C6.15356 12.0525 6.17815 11.9851 6.39949 12.0019C6.99794 12.0357 7.41604 12.2296 7.60459 12.879C7.69724 13.2067 7.85532 13.5175 8.01239 13.8263C8.07771 13.9547 8.14285 14.0828 8.20304 14.2116C8.28502 14.3971 8.3506 14.5742 8.367 14.7766C8.49814 16.1089 8.63748 17.4496 8.77682 18.7904L8.77685 18.7907L8.7769 18.7911C8.84248 19.4152 9.26058 19.8031 9.79344 19.7441C10.3591 19.6766 10.6788 19.2043 10.6132 18.5634L10.5991 18.4263L10.5991 18.4261C10.5055 17.5196 10.4125 16.62 10.3345 15.7128C10.2443 14.6333 10.0968 13.579 9.5393 12.6176C9.38876 12.3612 9.27109 12.0846 9.15298 11.807C9.08458 11.6461 9.01602 11.485 8.94086 11.3272C8.84248 11.1248 8.80969 10.9393 8.84248 10.72C8.90234 10.341 8.94928 9.95936 8.99635 9.57654C9.03308 9.27785 9.0699 8.97844 9.11301 8.67904C9.12273 8.61543 9.13397 8.55143 9.14518 8.48757C9.23804 7.95879 9.32913 7.44005 8.53916 7.23687C9.02953 7.35557 9.47549 7.5069 9.91611 7.65642C9.9764 7.67687 10.0366 7.6973 10.0968 7.7176C10.5722 7.87784 10.8346 7.7935 11.1297 7.38868C11.7282 6.58748 12.3102 5.77784 12.8923 4.95977C13.2038 4.52965 13.1546 4.05736 12.7857 3.77061C12.4086 3.48387 11.9659 3.5682 11.6462 4.00676C11.4986 4.20918 11.3531 4.41161 11.2076 4.61403L11.2073 4.6144C11.0619 4.81667 10.9165 5.01894 10.769 5.22121C10.146 6.08145 10.146 6.08145 9.1622 5.6935C9.15011 5.68728 9.13802 5.67189 9.11607 5.64394C9.10825 5.63399 9.09918 5.62245 9.08842 5.60916C9.56374 5.66935 9.42591 5.49467 9.29168 5.32455C9.27543 5.30395 9.25923 5.28342 9.24418 5.26338C9.04743 5.00194 8.7605 4.90073 8.45718 4.85856C8.34252 4.84248 8.22785 4.82554 8.11293 4.80856L8.11274 4.80854C7.86621 4.77212 7.6184 4.73551 7.36685 4.70676C7.23318 4.69184 7.09888 4.67108 6.96432 4.65027C6.41391 4.56515 5.85915 4.47935 5.32556 4.79109C4.79289 5.10128 4.26637 5.41781 3.74224 5.7329L3.74208 5.733L3.7419 5.7331C3.4111 5.93197 3.08126 6.13026 2.75141 6.32603C2.44809 6.51157 2.31692 6.78989 2.34151 7.1441C2.41529 8.29952 2.48907 9.44651 2.57105 10.5935C2.61204 11.1333 2.93176 11.479 3.38265 11.4706C3.85813 11.4622 4.14506 11.0995 4.12047 10.5176C4.08972 9.83448 4.04515 9.15136 4.00057 8.46824C3.98571 8.24053 3.97085 8.01277 3.95651 7.78507C3.95561 7.76854 3.95443 7.75201 3.95325 7.73555C3.9436 7.60081 3.93426 7.47043 4.08767 7.38025C4.23464 7.29778 4.37918 7.21034 4.52525 7.12197Z" fill="white" />
                            <path d="M13.5317 9.06699C13.6385 9.06699 13.7448 9.06646 13.8509 9.06593C14.168 9.06435 14.4829 9.06279 14.8024 9.07543C15.0319 9.08386 15.1221 9.01639 15.1057 8.77181C15.1045 8.75578 15.1032 8.73961 15.1018 8.72337C15.0849 8.5174 15.0669 8.29871 15.3025 8.18145C15.5107 8.08472 15.6528 8.20876 15.7876 8.32631C15.8173 8.35225 15.8467 8.37787 15.8763 8.40073C16.3226 8.74817 16.7644 9.10474 17.2051 9.46036L17.2053 9.46049L17.2057 9.46084C17.3639 9.58847 17.5219 9.71598 17.6799 9.8429C18.0488 10.1381 18.0488 10.3321 17.6717 10.6357L15.8025 12.1284C15.7864 12.1414 15.7703 12.1547 15.7542 12.1681C15.6235 12.2766 15.4914 12.3863 15.2943 12.2887C15.0729 12.179 15.0811 11.9766 15.0975 11.7827C15.1303 11.479 15.0073 11.4116 14.7286 11.4116C14.1381 11.4242 13.543 11.4226 12.9501 11.4211C12.7529 11.4205 12.5559 11.42 12.3594 11.42C11.9003 11.42 11.8019 11.3188 11.8019 10.8549C11.7965 10.5857 11.7983 10.3164 11.8001 10.0447L11.8001 10.0443C11.801 9.90763 11.8019 9.77031 11.8019 9.63205C11.8101 9.12603 11.8675 9.05856 12.384 9.05856C12.7693 9.06699 13.1545 9.06699 13.5316 9.06699H13.5317Z" fill="white" />
                            <path d="M10.0968 2.44652C10.0968 1.47664 9.31796 0.692302 8.367 0.692302C7.40784 0.700736 6.65363 1.48507 6.66183 2.45495C6.67003 3.43326 7.44063 4.20073 8.39979 4.1923C9.33436 4.18386 10.0968 3.39953 10.0968 2.44652Z" fill="white" />
                        </svg>
                    </div>

                    {/* for settings */}
                    <div onClick={() => { setOpenSettings(prev => !prev); setOpenExit(false); }} style={{ color: 'white', background: "#1A265B", border: '1px solid white', borderRadius: '5px', padding: '5px' }} className="uiButton">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.52013 14C7.17461 14 6.82909 14 6.48357 14C6.26474 13.9708 6.04975 13.9343 5.83092 13.9161C5.45853 13.8869 5.22435 13.73 5.12069 13.3725C5.0132 12.9931 4.85195 12.6247 4.72143 12.2489C4.69455 12.1687 4.64848 12.1212 4.56786 12.0848C4.21082 11.9388 3.87682 11.7491 3.56202 11.5339C3.50443 11.4938 3.45068 11.4828 3.37774 11.4938C2.89402 11.585 2.41029 11.6725 1.92656 11.7564C1.72309 11.7929 1.55801 11.7272 1.42748 11.5813C0.817064 10.9028 0.352533 10.144 0.0415663 9.30126C-0.0313765 9.10062 0.00317537 8.91821 0.1529 8.75405C0.460028 8.42207 0.763316 8.08645 1.07044 7.75447C1.13571 7.68516 1.15874 7.61949 1.14723 7.52464C1.10884 7.17078 1.10884 6.81327 1.14723 6.4594C1.1549 6.37549 1.14339 6.31348 1.08196 6.25146C0.767156 5.91219 0.460028 5.56927 0.145222 5.23C0.00701447 5.08042 -0.0352156 4.90896 0.0300491 4.72291C0.337177 3.85831 0.813225 3.08492 1.44284 2.39543C1.56953 2.26045 1.73077 2.19843 1.91888 2.23491C2.39877 2.31882 2.87866 2.40273 3.35855 2.49758C3.45068 2.51582 3.51211 2.50122 3.58121 2.45015C3.88834 2.23856 4.21466 2.05616 4.56402 1.91388C4.65232 1.8774 4.69839 1.82268 4.72526 1.74242C4.87115 1.33384 5.02087 0.925251 5.16292 0.516665C5.24738 0.272243 5.4163 0.151856 5.6812 0.108079C6.56035 -0.0341965 7.43567 -0.0378446 8.31482 0.108079C8.58356 0.151856 8.75632 0.279539 8.84078 0.527609C8.97898 0.932547 9.13255 1.33748 9.27459 1.74242C9.30531 1.82633 9.34754 1.88105 9.43584 1.91753C9.78903 2.06345 10.1192 2.24951 10.4302 2.4611C10.4993 2.50852 10.5569 2.51947 10.6413 2.50487C11.0943 2.41367 11.5512 2.33341 12.008 2.24951C12.2499 2.20208 12.4457 2.26775 12.6069 2.4538C13.1943 3.1214 13.6473 3.85831 13.9545 4.67913C14.0351 4.89802 14.0044 5.08772 13.8393 5.26283C13.5283 5.5948 13.2289 5.93043 12.9217 6.2624C12.8603 6.32807 12.845 6.38644 12.8565 6.47035C12.8949 6.82786 12.8987 7.18902 12.8565 7.55018C12.845 7.63773 12.868 7.6961 12.9256 7.75812C13.2327 8.0901 13.536 8.42572 13.8431 8.7577C14.0082 8.93281 14.0389 9.1225 13.9545 9.34139C13.6473 10.1549 13.1981 10.8918 12.6146 11.5558C12.4457 11.7491 12.2422 11.8148 11.9888 11.7637C11.532 11.6762 11.079 11.5959 10.6221 11.5047C10.5492 11.4901 10.4954 11.5047 10.4378 11.5448C10.123 11.7601 9.78903 11.9498 9.432 12.0957C9.34754 12.1285 9.30531 12.1796 9.27843 12.2599C9.13255 12.6684 8.97898 13.077 8.84078 13.4856C8.75632 13.7337 8.5874 13.8687 8.31482 13.9015C8.04608 13.9234 7.78502 13.9635 7.52013 14ZM7.00953 4.12098C5.33184 4.12098 3.98048 5.40146 3.97664 6.99202C3.97664 8.58624 5.32416 9.87036 6.99801 9.87401C8.67569 9.87766 10.0271 8.59353 10.0309 7.00297C10.0309 5.40875 8.67953 4.12098 7.00953 4.12098Z" fill="white" />
                            <path d="M9.0097 6.98837C9.01353 8.03173 8.11135 8.89632 7.00953 8.90362C5.91154 8.91092 5.00168 8.05362 4.994 7.00661C4.98632 5.95961 5.89619 5.08772 7.00185 5.08772C8.09983 5.08772 9.00586 5.94502 9.0097 6.98837Z" fill="white" />
                        </svg>
                    </div>

                    {/* <div onClick={() => setPause(prev => !prev)} style={{ color: 'white', background: "#1A265B", border: '1px solid white', borderRadius: '5px', padding: '5px' }}>
                        {pause ? <>
                            <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path fill="white" d="m 2 2.5 v 11 c 0 1.5 1.269531 1.492188 1.269531 1.492188 h 0.128907 c 0.246093 0.003906 0.488281 -0.050782 0.699218 -0.171876 l 9.796875 -5.597656 c 0.433594 -0.242187 0.65625 -0.734375 0.65625 -1.226562 c 0 -0.492188 -0.222656 -0.984375 -0.65625 -1.222656 l -9.796875 -5.597657 c -0.210937 -0.121093 -0.453125 -0.175781 -0.699218 -0.175781 h -0.128907 s -1.269531 0 -1.269531 1.5 z m 0 0" />
                            </svg>
                        </> : <>
                            <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 512 512" xml:space="preserve" width="20px" height="20px">
                                <g>
                                    <path fill="white" class="st0" d="M256.004,0c-141.166,0-256,114.841-256,256s114.834,256,256,256c141.151,0,255.992-114.841,255.992-256
		S397.155,0,256.004,0z M256.004,466.046C140.001,466.046,45.95,372.002,45.95,256c0-116.002,94.051-210.046,210.054-210.046
		c115.995,0,210.039,94.045,210.039,210.046C466.043,372.002,371.999,466.046,256.004,466.046z"/>
                                    <rect fill="white" x="177.23" y="190.36" class="st0" width="52.514" height="131.28" />
                                    <rect fill="white" x="282.257" y="190.36" class="st0" width="52.506" height="131.28" />
                                </g>
                            </svg>
                        </>
                        }
                    </div> */}
                </div>

                <div style={{ marginLeft: 'auto', width: '120px', marginRight: '10px', marginTop: "10px" }}>
                    {/* <ThreeMinuteTimer /> */}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <ToggleView />
            </div>

            {
                openExit &&
                <QuitPopup setOpenExit={setOpenExit} />
            }

            {
                openSettings &&
                // <SettingsPopup setOpenSettings={setOpenSettings} />
                <Settings setOpenSettings={setOpenSettings} />
            }

            <GameOverPopup setOpenExit={setOpenExit} setOpenSettings={setOpenSettings} />

            {/* {(isVictory && collectedCountBiryani && collectedCountCoke) && */}
            {
                isVictory &&
                <LevelFinishPopup setOpenExit={setOpenExit} setOpenSettings={setOpenSettings} />
            }

            <Progress />

            {/* <MiniMap />  */}

        </>
    )

}


// function Progress() {
//     const [progress, setProgress] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setProgress((prevProgress) => {
//                 if (prevProgress >= 100) {
//                     return 0; // Reset progress to 0 when it reaches 100
//                 }
//                 return prevProgress + 10; // Increase progress by 10% per interval
//             });
//         }, 50); // Runs every 50ms

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div style={{ position: 'fixed', top: '15vh', right: '5vw', zIndex: 5, width: "200px",height:"300px" }}>
//             <div className="loading-bar">
//                 <ProgressBar now={progress} />
//             </div>
//         </div>
//     )
// }


const Progress = () => {
    const [progressBlue, setProgressBlue] = useState(100);
    const [progressYellow, setProgressYellow] = useState(100);
    const [visibleBlue, setVisibleBlue] = useState(false);
    const [visibleYellow, setVisibleYellow] = useState(false);
    const { invisiblePowerupCount, powerupCount, powerup, invisiblePowerup } = useContext(DirectionContext);

    useEffect(() => {
        if (powerupCount > 0 && powerup) {
            setProgressBlue(100);
            setVisibleBlue(true);

            const interval = setInterval(() => {
                setProgressBlue((prev) => {
                    if (prev > 0) return prev - 1;
                    clearInterval(interval);
                    setVisibleBlue(false);
                    return 0;
                });
            }, 100);

            return () => clearInterval(interval);
        } else {
            setVisibleBlue(false);
            setProgressBlue(0);
        }
    }, [powerupCount, powerup]);

    useEffect(() => {
        if (invisiblePowerupCount > 0 && invisiblePowerup) {
            setProgressYellow(100);
            setVisibleYellow(true);

            const interval = setInterval(() => {
                setProgressYellow((prev) => {
                    if (prev > 0) return prev - 1;
                    clearInterval(interval);
                    setVisibleYellow(false);
                    return 0;
                });
            }, 100);

            return () => clearInterval(interval);
        } else {
            setVisibleYellow(false);
            setProgressYellow(0);
        }
    }, [invisiblePowerupCount, invisiblePowerup]);

    if (!visibleBlue && !visibleYellow) return null;

    return (
        <div style={{ position: "fixed", top: "100px", right: "5vw", zIndex: 5 }}>
            {visibleBlue && (
                <div style={{ position: "relative", width: "150px", height: "20px", marginBottom: '5px' }}>
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            background: "rgba(240, 240, 240, 0.8)",
                            borderRadius: "5px",
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                width: `${progressBlue}%`,
                                height: "100%",
                                background: "#88EFF8",
                                transition: "width 0.1s linear",
                            }}
                        />
                        <span
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                fontWeight: "bold",
                                color: "black",
                                zIndex: 2,
                            }}
                        >
                            Invisible
                        </span>
                    </div>
                </div>
            )}

            {visibleYellow && (
                <div style={{ position: "relative", width: "150px", height: "20px" }}>
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            background: "rgba(240, 240, 240, 0.8)",
                            borderRadius: "5px",
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                width: `${progressYellow}%`,
                                height: "100%",
                                background: "yellow",
                                transition: "width 0.1s linear",
                            }}
                        />
                        <span
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                fontWeight: "bold",
                                color: "black",
                                zIndex: 2,
                            }}
                        >
                            1.5 x Speed
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppUi
