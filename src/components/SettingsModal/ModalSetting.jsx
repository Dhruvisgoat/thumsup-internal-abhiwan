import React, { useState } from 'react';
import styles from './ModalSetting.module.css'; // Import the CSS module

const ModalSetting = () => {
    const [volume, setVolume] = useState(50); // Initial volume level
    const [music, setMusic] = useState(50); // Initial music level

    const handleVolumeChange = (change) => {
        setVolume((prevVolume) => Math.min(100, Math.max(0, prevVolume + change)));
    };

    const handleMusicChange = (change) => {
        setMusic((prevMusic) => Math.min(100, Math.max(0, prevMusic + change)));
    };

    
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Volume Control</h2>
                <div className={styles.control}>
                    <button onClick={() => handleVolumeChange(-10)}>-</button>
                    <div className={styles.progressBar}>
                        <div className={styles.progress} style={{ width: `${volume}%` }} />
                    </div>
                    <button onClick={() => handleVolumeChange(10)}>+</button>
                </div>

                <h2>Music Control</h2>
                <div className={styles.control}>
                    <button onClick={() => handleMusicChange(-10)}>-</button>
                    <div className={styles.progressBar}>
                        <div className={styles.progress} style={{ width: `${music}%` }} />
                    </div>
                    <button onClick={() => handleMusicChange(10)}>+</button>
                </div>

                <button className={styles.closeBtn} >Close</button>
            </div>
        </div>
    );
};

export default ModalSetting;
