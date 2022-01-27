import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [currentTab, setCurrentTab] = useState("");
  return (
    <ul>
      <li>
        <Link
          to="/"
          className={currentTab === "/" ? "active" : "navbarA"}
          onClick={() => {
            setCurrentTab("/");
          }}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/testimonials"
          className={currentTab === "testimonials" ? "active" : "navbarA"}
          onClick={() => {
            setCurrentTab("testimonials");
          }}
        >
          Testimonials
        </Link>
      </li>
      <li>
        <Link
          to="/login"
          className={currentTab === "login" ? "active" : "navbarA"}
          onClick={() => {
            setCurrentTab("login");
          }}
        >
          Log in
        </Link>
      </li>
      <li>
        <Link
          to="/signUp"
          className={currentTab === "signUp" ? "active" : "navbarA"}
          onClick={() => {
            setCurrentTab("signUp");
          }}
        >
          Sign Up
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          className={currentTab === "profile" ? "active" : "navbarA"}
          onClick={() => {
            setCurrentTab("profile");
          }}
        >
          Profile
        </Link>
      </li>
      <li>
        <Link
          to="/contact"
          className={currentTab === "contact" ? "active" : "navbarA"}
          onClick={() => {
            setCurrentTab("contact");
          }}
        >
          Contact
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
