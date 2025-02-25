import CityLevelHeader from "../../components/CityLevelHeader/CityLevelHeader";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Settings.module.css";
import plus from "../../assets/UI/extra/plus.svg";
import minus from "../../assets/UI/extra/minus.svg";
import settinImg from "../../assets/UI/extra/setting.svg";

const Settings = () => {
    const audioRef = useRef();
    const bgRef = useRef();
    const location = useLocation();
    const volumeRef = useRef(null);
    const musicRef = useRef(null);
    const [volume, setVolume] = useState(() => parseInt(localStorage.getItem("volume")) || 10);
    const [music, setMusic] = useState(() => parseInt(localStorage.getItem("music")) || 10);

    useEffect(() => {
        audioRef.current = new Audio("/audio/pop.mp3");
        bgRef.current = new Audio("/audio/thumsupBGmusic.mp3");

        const handleVisibilityChange = () => {
            if (document.hidden && bgRef.current) bgRef.current.pause();
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            if (bgRef.current) bgRef.current.pause();
        };
    }, []);

    useEffect(() => {
        if (bgRef.current) bgRef.current.pause();
    }, [location.pathname]);

    useEffect(() => {
        localStorage.setItem("volume", volume);
        localStorage.setItem("music", music);
    }, [volume, music]);

    const updateVolume = (newValue) => {
        const clampedValue = Math.max(0, Math.min(100, newValue));
        setVolume(clampedValue);
        audioRef.current.volume = clampedValue / 100;
        audioRef.current.currentTime = 0;
        audioRef.current.play();
    };

    const updateMusic = (newValue) => {
        const clampedValue = Math.max(0, Math.min(100, newValue));
        setMusic(clampedValue);
        bgRef.current.volume = clampedValue / 100;
        bgRef.current.play();
    };

    const handleSliderMove = (e, type) => {
        const ref = type === "volume" ? volumeRef : musicRef;
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const newValue = Math.min(100, Math.max(0, ((e.clientX || e.touches[0].clientX) - rect.left) / rect.width * 100));
        type === "volume" ? updateVolume(Math.round(newValue)) : updateMusic(Math.round(newValue));
    };

    return (
        <>
            <div>
                <CityLevelHeader />
            </div>

            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <div className={styles.settingimg}>
                        <img src={settinImg} />
                    </div>

                    <div className={styles.settingPop}>
                        <p>Volume</p>
                        <div className={styles.control}>
                            <button className={styles.buttonUpdated} onClick={() => updateVolume(volume - 10)}>
                                <img src={minus} alt="-" />
                            </button>
                            <div
                                className={styles.progressBar}
                                ref={volumeRef}
                                onClick={(e) => handleSliderMove(e, "volume")}
                                onTouchStart={(e) => handleSliderMove(e, "volume")}
                                onTouchMove={(e) => handleSliderMove(e, "volume")}
                                onMouseDown={(e) => handleSliderMove(e, "volume")}
                            >
                                <div className={styles.progressVolume} style={{ width: `${volume}%` }}>
                                    <div className={styles.sliderHandle} />
                                </div>
                            </div>
                            <button className={styles.buttonUpdated} onClick={() => updateVolume(volume + 10)}>
                                <img src={plus} alt="+" />
                            </button>
                        </div>

                        <p>Music</p>
                        <div className={styles.control}>
                            <button className={styles.buttonUpdated} onClick={() => updateMusic(music - 10)}>
                                <img src={minus} alt="-" />
                            </button>
                            
                            <div
                                className={styles.progressBar}
                                ref={musicRef}
                                onClick={(e) => handleSliderMove(e, "music")}
                                onTouchStart={(e) => handleSliderMove(e, "music")}
                                onTouchMove={(e) => handleSliderMove(e, "music")}
                                onMouseDown={(e) => handleSliderMove(e, "music")}
                            >
                                <div className={styles.progressMusic} style={{ width: `${music}%` }}>
                                    <div className={styles.sliderHandle} />
                                </div>
                            </div>

                            <button className={styles.buttonUpdated} onClick={() => updateMusic(music + 10)}>
                                <img src={plus} alt="+" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
