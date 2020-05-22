import React, { useState, useEffect } from 'react';
import c from './header.css';

const Header = () => {
  return (
    <header className={c.containerHeader}>
      <div className="logoDiv">
        тут будет логотип
      </div>
      <div className="emptyDiv"></div>
      <div className="navDiv">кнопочки</div>
    </header>
  );
};

export default Header;
