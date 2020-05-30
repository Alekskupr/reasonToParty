import React, { useState, useEffect } from 'react';
import c from './header.css';
import Cocktail from '../cocktail/cocktail';
import Person from '../person/person';
import Keypad from '../keypad/keypad';

const Header = () => {
  return (
    <div className={c.containerHeader}>
      <div className={c.logoDiv}>
        <a href="/" className={c.linkLogo}>
          <Cocktail />
          <span className={c.textLogo}>reason to party!</span>
        </a>
      </div>
      <div className="emptyDiv" />
      <div className={c.navDiv}>
        <button className={c.navButton} type="button">
          <Keypad />
        </button>
        <button className={c.navButton} type="button">
          <Person />
        </button>
      </div>
    </div>
  );
};

export default Header;
