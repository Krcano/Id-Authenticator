import React from "react";
import { Link } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    background: "#222330",
    // height: "100vh"
    justifyContent: "center",
    flexDirection: "row",
  },
  img: {
    display: "flex",
    width: "50px",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
};

const Footer = () => {
  return (
    <div style={styles.container}>
      <div>
        <Link style={styles.link} to="/login">
          {" "}
          <h4 style={styles.linkText}>Login</h4>
        </Link>
        <Link style={styles.link} to="/signup">
          {" "}
          <h4 style={styles.linkText}>Sign Up</h4>
        </Link>
        <Link style={styles.link} to="/contact">
          {" "}
          <h4 style={styles.linkText}>Contact Us</h4>
        </Link>
      </div>
      
      <img
        style={styles.img}
        src="./woldo.png"
        alt="woldo icon"
        className="icon"
      />
    </div>
  );
};

export default Footer;
