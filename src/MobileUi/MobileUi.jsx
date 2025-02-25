import React, { useContext, useEffect, useState, useRef } from 'react';
import './MobileUi.css';
import { MyContext } from '../RefContext/Context';
import { ViewContext } from '../RefContext/ViewContext';
import swipeSound from '../assets/swipe.mp3'; // Import your sound file

function MobileUi() {
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
  const { directionRef, jumpRef, stopRef } = useContext(MyContext);
  const { viewMode } = useContext(ViewContext);

  let touchStartX = 0;
  let touchStartY = 0;
  const [tapTime, setTapTime] = useState(0); // Track the last tap time for double-tap detection

  // Create an Audio object for the swipe sound
  const swipeAudio = new Audio(swipeSound);

  const randomSwipeIntervalRef = useRef(null);

  useEffect(() => {
    // Set an interval to trigger random swipes every 5 seconds
    // randomSwipeIntervalRef.current = setInterval(() => {
    //   triggerRandomSwipe();
    // }, 1000);

    return () => clearInterval(randomSwipeIntervalRef.current); // Clean up interval on component unmount
  }, []);

  // Function to trigger random swipe direction
  const triggerRandomSwipe = () => {
    const directions = ['Left', 'Right', 'Up', 'Down'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];

    // Set the directionRef based on the random direction
    directionRef.current = randomDirection;
    stopRef.current = false;

    // // Play the swipe sound
    // swipeAudio.currentTime = 0; // Reset sound to play from the beginning
    // swipeAudio.play().catch((err) => console.log('Audio play error:', err));

    console.log(`Random Swipe: ${randomDirection}`);
  };




  useEffect(() => {
    const handleResize = () => setIsLandscape(window.innerWidth > window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!touchStartX || !touchStartY) return;

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe
      if (diffX > 0) {
        directionRef.current = 'Right';
        stopRef.current = false;
        console.log('Swipe Right');
      } else {
        directionRef.current = 'Left';
        stopRef.current = false;
        console.log('Swipe Left');
      }
    } else {
      // Vertical swipe
      if (diffY > 0) {
        directionRef.current = 'Down';
        stopRef.current = false;
        console.log('Swipe Down');
      } else {
        directionRef.current = 'Up';
        stopRef.current = false;
        if (viewMode === '3rd') handleJumpSwipe();
        console.log('Swipe Up');
      }
    }

    // Play the swipe sound
    swipeAudio.currentTime = 0; // Reset sound to play from the beginning
    // swipeAudio.play().catch((err) => console.log('Audio play error:', err));

    // Reset swipe start positions
    touchStartX = 0;
    touchStartY = 0;
  };

  const handleTouchEnd = () => {
    // Double-tap detection logic
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - tapTime;

    if (timeDifference < 300 && timeDifference > 0) {
      // handleJumpSwipe(); // Call jump swipe handler on double-tap
    }
    setTapTime(currentTime); // Update tap time

    // Reset direction after swipe ends
    // directionRef.current = null;
  };

  const handleJumpSwipe = () => {
    jumpRef.current = true;
    setTimeout(() => {
      jumpRef.current = false;
    }, 100);
    console.log('Double tap detected - Jump');
  };

  const handleJumpButtonClick = () => {
    handleJumpSwipe(); // Trigger jump logic when the button is clicked
  };
  const handleStopButtonClick = () => {
    stopRef.current = true;
    // handleJumpSwipe(); // Trigger jump logic when the button is clicked
  };

  return (
    <div
      className="mobile-ui"
      style={{ left: isLandscape ? "80%" : "50%", height: '100vh', width: '100vw'}}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="swipe-info">
        <p>Swipe in any direction to move</p>
      </div>
      {/* <button
        className="jump-button"
        onClick={handleJumpButtonClick}
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          fontSize: '16px',
          border: 'none',
          borderRadius: "10px",
          backgroundColor: 'rgba(26, 38, 91, 0.7)',
          color: 'white',
        }}
      >
        Jump
      </button>
      <button
        onClick={handleStopButtonClick}
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          fontSize: '16px',
          border: 'none',
          borderRadius: "10px",
          backgroundColor: 'rgba(255, 165, 0, 0.7)',
          color: 'white',
        }}
      >
        Stop
      </button> */}
    </div>
  );
}

export default MobileUi;