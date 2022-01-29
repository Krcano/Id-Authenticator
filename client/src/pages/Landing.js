import React from "react";
import video from "../img/crowd-of-people-walking-on-nyc-sidewalk.mp4";
import { AiOutlineScan } from 'react-icons/ai';
import { FaSignInAlt } from 'react-icons/fa'
import { ImFileVideo } from 'react-icons/im'
import { BsPersonBoundingBox } from 'react-icons/bs'
import tficon from '../img/1229px-TensorFlowLogo.svg.png'

const Landing = () => {
  return (
    <body>
      <section className="hero">
        <video autoPlay muted playsInline loop className="hero-video">
          <source src={video} type="video/mp4" />
          "Your browser does not support HTML5 video."
        </video>
      </section>
      <section className="directions-grid react-icons">
        <div>
          <FaSignInAlt />
          <p>Login</p>
        </div>
        <div>
          <ImFileVideo />
          <p>Upload</p>
          <p>video</p>
        </div>
        <div>
          <AiOutlineScan />
          <p>Woldo</p>
          <p>scans</p>
        </div>
        <div>
          <BsPersonBoundingBox />
          <p>Found</p>
          <p>person</p>
        </div>          
      </section>
      <section className="technology-flex">
        <div>
          <img src={tficon}></img>
        </div>
        <div className="tech-def">
          <p>
          Finally it is, thanks to tensorflow.js! I managed to implement partially similar tools using tfjs-core, which will get you almost the same results as face-recognition.js, but in the browser! Furthmore, face-api.js provides models, which are optimized for the web and for running on resources mobile devices. And the best part about it is, there is no need to set up any external dependencies, it works straight out of the box. As a bonus it is GPU accelerated, running operations on a WebGL backend.
          </p>
        </div>
      </section>
    </body>
  );
};

export default Landing;
