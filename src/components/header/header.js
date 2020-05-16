import React, { useState, useEffect } from 'react';
import c from './header.css';

const Header = () => {
  return (
    <header className={c.containerHeader}>
      <div class="logoDiv">
        тут будет логотип
      </div>
      <div class="emptyDiv"></div>
      <div class="navDiv">кнопочки</div>
    </header>
  );
};

export default Header;
