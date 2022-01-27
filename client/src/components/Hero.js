import React from 'react';
import video from '../img/crowd-of-people-walking-on-nyc-sidewalk.mp4'

const Hero = () => {
  return (
    <video autoPlay muted playsInline loop className='hero-video'>
        <source src={video} type="video/mp4" />
            "Your browser does not support HTML5 video."
    </video>
  );
};

export default Hero;
