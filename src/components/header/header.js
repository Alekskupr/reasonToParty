import React, { useState, useEffect } from 'react';
import c from './header.css';
import Cocktail from '../cocktail/cocktail';

const Header = () => {
  return (
    <header className={c.containerHeader}>
      <div className="logoDiv">
        <a href="/" className={c.linkLogo}>
          <Cocktail />
          <span className={c.textLogo}>reason to party</span>
        </a>
      </div>
      <div className="emptyDiv"></div>
      <div className="navDiv">кнопочки</div>
    </header>
  );
};

export default Header;
