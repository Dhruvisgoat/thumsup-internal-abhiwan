import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { PauseContext } from '../../../RefContext/PauseContext';

function QuitPopup({ setOpenExit }) {
  const { setPause } = useContext(PauseContext);

  useEffect(() => {
    setPause(true);
  }, []);


  const navigate = useNavigate();

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
          background: '#1F2D68',
          color: 'white',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          border: '2px solid silver',
          boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-150px', right: '-80px' }}>
            <img src='/images/ui-logo/home.png' height="150px" alt="Home"></img>
          </div>
        </div>
        <div>
          <img src='/images/ui-logo/quit.png' height="100px" alt="Quit"></img>
        </div>
        <div style={{ marginBottom: '40px', fontSize: '25px', marginTop: '10px' }}>
          Do you want to quit?
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button
            className="uiButton"

            onClick={() => navigate('/level')}
            style={{
              background: '#DF0025',
              borderRadius: '5px',
              border: '2px solid white',
              width: '100px',
              color: 'white',
              fontSize: '25px',
              padding: '0 15px',
              border: '2px solid silver',
              boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            YES
          </button>
          <button
            className="uiButton"
            onClick={() => {
              setOpenExit(false);
              setPause(false)
            }
            }
            style={{
              background: '#1F2D68',
              borderRadius: '5px',
              border: '2px solid white',
              width: '100px',
              color: 'white',
              fontSize: '25px',
              padding: '0 15px',
              border: '2px solid silver',
              boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            NO
          </button>
        </div>
      </div>
    </div >
  );
}

export default QuitPopup;
