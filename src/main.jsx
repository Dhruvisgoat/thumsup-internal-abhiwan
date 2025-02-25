import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import "react-multi-carousel/lib/styles.css";
import { isTablet } from 'react-device-detect';

createRoot(document.getElementById('root')).render(

  <div className="homeContainer" style={{ maxWidth: isTablet ? "100vw" : "500px" }}>
    <App />
  </div>

)
