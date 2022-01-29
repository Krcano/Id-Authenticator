import React from "react";
import video from "../img/crowd-of-people-walking-on-nyc-sidewalk.mp4";

const Landing = () => {
  return (
    <body>
      <section className="hero">
        <video autoPlay muted playsInline loop className="hero-video">
          <source src={video} type="video/mp4" />
          "Your browser does not support HTML5 video."
        </video>
      </section>
      <section>
          
      </section>
    </body>
  );
};

export default Landing;
