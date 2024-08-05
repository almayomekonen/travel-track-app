import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../shared/components/FormElements/Button";
import { AuthContext } from "../shared/context/auth-context";
import travelImage from "../images/travel.jpg";
import "./Home.css";

const Home = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="container-style">
      <div id="main" className="image-container">
        <img className="img-style" src={travelImage} alt="travel" />
      </div>
      <div className="header-heading">
        <h2>STEP UP YOUR</h2>
        <h1>
          <em>TRAVEL</em> WITH US
        </h1>
        <p className="details">
          Build Your Travel Track With Professional Touch
        </p>
        <div>
          {auth.isLoggedIn ? (
            <Link to="/places/build">
              <Button>Get Started</Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button>Next Step</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
