import { useState, useEffect, useContext, useRef } from 'react';
import styles from './Settings.module.css';
import plus from "../../../assets/UI/extra/plus.svg";
import minus from "../../../assets/UI/extra/minus.svg";
import settinImg from "../../../assets/UI/extra/setting.svg";
import { DirectionContext } from '../../../RefContext/DirectionContext';
import { PauseContext } from '../../../RefContext/PauseContext';

const Settings = ({ setOpenSettings }) => {

    const audioRef = useRef();
    useEffect(() => {
        audioRef.current = new Audio('/audio/collectBottle.mp3');
    }, []);

    const { setPause } = useContext(PauseContext);

    useEffect(() => {
        setPause(true);
    }, []);

    // Initialize volume from localStorage or default to 50
    const [music, setMusic] = useState(50); // Initial music level
    const { volume, setVolume } = useContext(DirectionContext);

    useEffect(() => {
        // Retrieve volume from localStorage or default to 50
        const savedVolume = localStorage.getItem('volume');
        if (savedVolume !== null) {
            setVolume(parseInt(savedVolume));
        }
    }, [setVolume]);

    useEffect(() => {
        // Store volume in localStorage whenever it changes
        localStorage.setItem('volume', volume);
    }, [volume]);

    const handleVolumeChange = (change, volume) => {
        setVolume((prevVolume) => Math.min(100, Math.max(0, prevVolume + change)));
        audioRef.current.volume = volume / 100;
        audioRef.current.currentTime = 0;
        audioRef.current.play();
    };

    const handleMusicChange = (change, volume) => {
        setMusic((prevMusic) => Math.min(100, Math.max(0, prevMusic + change)));
    };

    return (
        <>
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <div className={styles.settingimg}>
                        <img src={settinImg} />
                    </div>
                    <div className='d-flex justify-content-end w-100'>
                        <img
                            className='ml-auto uiButton'
                            src='/images/ui-logo/cut.png'
                            onClick={() => { setOpenSettings(false); setPause(false); }}
                            height="30px"
                        />
                    </div>

                    <div className={styles.settingPop}>
                        <div style={{ fontSize: '25px' }}>Music</div>
                        <div className={styles.control}>
                            <button className={`${styles.buttonUpdated} uiButton`} onClick={() => handleVolumeChange(-10, volume)}>
                                <img src={minus} width={45} />
                            </button>
                            <div className={styles.progressBar}>
                                <div className={styles.progressVolume} style={{ width: `${volume}%` }} />
                            </div>
                            <button className={`${styles.buttonUpdated} uiButton`} onClick={() => handleVolumeChange(10, volume)}>
                                <img src={plus} width={45} />
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Settings;
