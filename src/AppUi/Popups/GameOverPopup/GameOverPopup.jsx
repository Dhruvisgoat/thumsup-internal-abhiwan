import React, { useContext, useEffect, useState } from 'react';
import { DirectionContext } from '../../../RefContext/DirectionContext';
import { useNavigate } from 'react-router-dom';

function GameOverPopup({ setOpenExit, setOpenSettings }) {

  const navigate = useNavigate();

  useEffect(() => {
    setOpenExit(false);
    setOpenSettings(false);
  }, []);

  const { timeLeft, lives } = useContext(DirectionContext);

  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    if (/* timeLeft <= 0 || */ lives >= 3) {
      const timeout = setTimeout(() => setShowDiv(true), 1000);
      return () => clearTimeout(timeout); // Cleanup to prevent memory leaks
    } else {
      setShowDiv(false);
    }
  }, [lives]); // Re-runs when `lives` changes

  return (
    <>
      {(
        // timeLeft <= 0 ||
        showDiv) &&
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
              <div
                style={{ position: 'absolute', top: '-150px', right: '-60px' }}
              >
                <img src='/images/ui-logo/oops.png' height="150px" alt="Oops"></img>
              </div>
            </div>
            <div>
              <img src='/images/ui-logo/oops-banner.png' height="100px" alt="Oops Banner"></img>
            </div>
            <div style={{ marginBottom: '40px', fontSize: '25px', marginTop: '10px' }}>
              No lives left!
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <button
                className="uiButton"

                style={{
                  border: '2px solid silver',
                  boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.5)',
                  background: '#DF0025', borderRadius: '5px',
                  width: '140px', color: 'white', fontSize: '25px', padding: '0 15px'
                }}
                onClick={() => {
                  window.location.reload();
                }}              >
                Play Again
              </button>
              <button
                className="uiButton"
                style={{
                  border: '2px solid silver',
                  boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.5)',
                  background: '#DF0025', borderRadius: '5px',
                  width: '140px', color: 'white', fontSize: '25px', padding: '0 15px'
                }}
                onClick={() => navigate('/level')}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default GameOverPopup;
