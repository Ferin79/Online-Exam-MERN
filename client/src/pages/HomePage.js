import React from "react";
import "./HomePage.css";
import back from "../images/homepage.svg";

const HomePage = () => {
  return (
    <div className="main_wrapper_homepage">
      <div className="text-wrapper">
        <h3>
          With Great Power,
          <br /> comes great Responsibility
        </h3>
      </div>
      <div className="img-wrapper">
        <img src={back} alt="background" height="500" width="500" />
      </div>
    </div>
  );
};

export default HomePage;
