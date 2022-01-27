import React from 'react';
import Navigation from './Navigation';

const Header = () => {
  return (
  <header className='header'>
    
        <div>
            <img src='../img/woldo.png' alt='woldo icon' className='icon'></img>
        </div>
        <div>
            <Navigation />
        </div>
  </header>
  );
};

export default Header;
