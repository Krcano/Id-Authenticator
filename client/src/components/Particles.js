import React from "react";
import Particles from "react-tsparticles";
import particlesConfig from "../utils/particlesConfig";

export default function particlesBackground() {
  return <Particles params={particlesConfig}></Particles>;
}
// reference particleBackground to componnent you want it to show on which is login/ signup 
// make sure to make a colored background behind the particles in order for them to show up
