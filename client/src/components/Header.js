import React from 'react';
import Navigation from './Navigation';
import woldoLogo from '../img/woldo-logo-small.png';

const Header = () => {
  return (
  <header className='header'>
        <div className='logo'>
            <img src={woldoLogo}></img>
        </div>
        <div className='nav'>
            <Navigation />
        </div>    
  </header>
  );
};

export default Header;
