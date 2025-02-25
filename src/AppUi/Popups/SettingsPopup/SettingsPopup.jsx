import React from 'react'
import styles from '../../../pages/SettingsPop/Settings.module.css';
import plus from "../../../assets/UI/extra/plus.svg"
import minus from "../../../assets/UI/extra/minus.svg"
import { useState } from 'react';


function SettingsPopup({ setOpenSettings }) {
  const [volume, setVolume] = useState(50); // Initial volume level

  return (
    <div
      style={{
        height: '300px',
        width: '340px',
        position: 'fixed',
        zIndex: '1000',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '2px solid white',
        background: '#1F2D68',
        color: 'white',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',

      }}
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{ position: 'absolute', top: '-150px', right: '-70px' }}
        >
          <img src='/images/ui-logo/setting-icon.png' height="150px" ></img>
        </div>
        <div
          style={{ position: 'absolute', top: '-90px', left: '140px' }}
        >
          <img src='/images/ui-logo/cut.png' onClick={() => setOpenSettings(false)} height="20px" ></img>
        </div>
      </div>
      <div>
        {/* <img src='/images/ui-logo/sound.png' height="90px" ></img> */}
        <button className={styles.buttonUpdated} onClick={() => handleVolumeChange(-10)}>
          <img src={minus} width={45} />
        </button>
        <div className={styles.progressBar}>
          <div className={styles.progressVolume} style={{ width: `${volume}%` }} />
        </div>
        <button className={styles.buttonUpdated} onClick={() => handleVolumeChange(10)}>
          <img src={plus} width={45} />
        </button>
      </div>

    </div>
  )
}

export default SettingsPopup