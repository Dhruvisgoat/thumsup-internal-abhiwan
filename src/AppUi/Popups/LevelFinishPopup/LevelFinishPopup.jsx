import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LevelFinishPopup({ setOpenExit, setOpenSettings }) {

  const navigate = useNavigate();

  useEffect(() => {
    setOpenExit(false);
    setOpenSettings(false);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backdropFilter: 'blur(5px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          height: '300px',
          width: '340px',
          position: 'relative',
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
          <div style={{ position: 'absolute', top: '-150px', right: '-40px' }}>
            <img src='/images/ui-logo/hurray.png' height="150px" alt="Hurray"></img>
          </div>
        </div>
        <div>
          <img src='/images/ui-logo/wellDone.png' height="100px" alt="Well Done"></img>
        </div>
        <div style={{ marginBottom: '40px', fontSize: '25px', marginTop: '10px' }}>
          New Level Unlocked!
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>

          <button
            style={{
              background: '#1F2D68',
              borderRadius: '5px',
              border: '2px solid silver',
              boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.5)',
              width: '140px',
              color: 'white',
              fontSize: '25px',
              padding: '0 15px',
            }}
            className="uiButton"
            onClick={() => {
              const currentRoute = window.location.pathname;
              if (currentRoute === '/game5') {
                window.location.href = '/play';
              } else {
                const gameNumber = parseInt(currentRoute.replace('/game', ''), 10);
                const nextGameNumber = gameNumber + 1;
                window.location.href = `/game${nextGameNumber}`;
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default LevelFinishPopup;
