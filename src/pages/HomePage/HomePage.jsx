import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingBar from "../../components/LoadingBar";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoading)
      navigate("/create/profile");
  }, [isLoading]);

  return (
    <div className="home-page">
      <img src="/logo1.svg" alt="Logo" className="logo" />
      <LoadingBar setIsLoading={setIsLoading} />
    </div>
  );
};

export default HomePage;