import React from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";

const Navigation = () => {
  function showNavigation() {
    if (auth.loggedIn()) {
      return (
        <ul>
          <li>
            <Link to="/profile">PROFILE</Link>
          </li>
          <li>
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => auth.logout()}>
              LOGOUT
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
          <li>
            <Link to="/signUp">SIGN-UP</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <ul>
      <li>
        <Link to="/">HOME</Link>
      </li>
      <li>
        <Link to="/testimonials">TESTIMONIALS</Link>
      </li>

      {showNavigation()}
      <li>
        <Link to="/contact">CONTACT</Link>
      </li>
    </ul>
  );
};

export default Navigation;
