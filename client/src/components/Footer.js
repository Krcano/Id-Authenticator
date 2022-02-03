import React from "react";
import { Link } from "react-router-dom";
import woldoLogo from '../img/woldo-logo-large.png';
import facebook from "../img/white-facebook.png"
import twitter from "../img/white-twitter.png"
import google from "../img/white-google.png"

const Footer = () => {
  return (
    <>
      <div className="footerContainer">
        <div className="txtImgContainer">
          <img className="img" src={woldoLogo} alt="logo icon" />
          <h1 className="footerLinkText">WOLDO</h1>
        </div>

        <div className="footerLinkContainer">
          <h2 className="h1">Navigate</h2>
          <Link className="footerLink" to="/login">
            {" "}
            <h4 className="footerLinkText">Login</h4>
          </Link>
          <Link className="footerLink" to="/signup">
            {" "}
            <h4 className="footerLinkText">Sign Up</h4>
          </Link>
          <Link className="footerLink" to="/contact">
            {" "}
            <h4 className="footerLinkText">Contact Us</h4>
          </Link>
        </div>

        <div className="connectTextContainer">
          <h2 className="h1Connect">Connect With Us</h2>
          <div className="connectIconsContainer">
            <a href="#">
              <img
                className="icons"
                src={facebook}
                alt="facebook icon"
              />
            </a>
            <a href="#">
              <img
                className="icons"
                src={twitter}
                alt="twitter icon"
              />
            </a>
            <a href="#">
              <img
                className="icons"
                src={google}
                alt="google icon"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="footerPContainer">
        <p className="footerLinkText"> Privacy Policy </p>
        <p className="footerLinkText">2022 Copyright </p>
        <p className="footerLinkText">Terms & Conditions </p>
      </div>
    </>
  );
};

export default Footer;
