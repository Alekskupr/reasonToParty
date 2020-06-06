import React, { useState, useEffect } from 'react';
import c from './header.css';
import Cocktail from '../cocktail/cocktail';
import Person from '../person/person';
import Keypad from '../keypad/keypad';
import PersonPanel from '../personPanel/personPanel';

const Header = (props) => {
  const { authorizedUser } = props;
  console.log(props);

  const [isOpenRegPanel, setisOpenRegPanel] = useState(false);

  const changeStatusRegPanel = () => {
    setisOpenRegPanel(!isOpenRegPanel);
  };

  return (
    <div className={c.containerHeader}>
      <div className={c.logoDiv}>
        <a href="/" className={c.linkLogo}>
          <Cocktail />
          <span className={c.textLogo}>reason to party!</span>
        </a>
      </div>
      <div className={c.helloUser}>
        {authorizedUser ? (
          <span>
            You are welcome,
            {authorizedUser.login}!
          </span>
        ) : (
          ''
        )}
      </div>
      <div className={c.navDiv}>
        <button className={c.navButton} type="button">
          <Keypad />
        </button>
        <button className={c.navButton} type="button" onClick={changeStatusRegPanel}>
          <Person />
        </button>
        {isOpenRegPanel ? <PersonPanel changeStatusRegPanel={changeStatusRegPanel} /> : ''}
      </div>
    </div>
  );
};

export default Header;
