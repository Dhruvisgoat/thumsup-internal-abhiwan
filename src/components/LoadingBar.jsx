import { useEffect, useState } from "react";
import "./LoadingBar.css";
import ProgressBar from 'react-bootstrap/ProgressBar';

const LoadingBar = ({ setIsLoading }) => {

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setIsLoading(false);
          return 0; // Reset progress to 0 when it reaches 100
        }
        return prevProgress + 10; // Increase progress by 10% per interval
      });
    }, 50); // Runs every 50ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-bar">
      <ProgressBar now={progress} />
    </div>
  );
};

export default LoadingBar;
