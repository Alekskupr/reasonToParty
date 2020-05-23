import React, { useState, useEffect } from 'react';
import c from './header.css';
import Cocktail from '../cocktail/cocktail';
import Person from '../person/person';
import Keypad from '../keypad/keypad';

const Header = () => {
  return (
    <header className={c.containerHeader}>
      <div className={c.logoDiv}>
        <a href="/" className={c.linkLogo}>
          <Cocktail />
          <span className={c.textLogo}>reason to party!</span>
        </a>
      </div>
      <div className="emptyDiv"></div>
      <div className={c.navDiv}>
        <button className={c.navButton}>
          <Keypad />
        </button>
        <button className={c.navButton}>
          <Person />
        </button>
      </div>
    </header>
  );
};

export default Header;
