import React, { useState, useEffect } from 'react';
import './header.css';
import Cocktail from '../cocktail/cocktail';
import Person from '../person/person';
import Keypad from '../keypad/keypad';
import PersonPanel from '../personPanel/personPanel';

const Header = (props) => {
  const { authorizedUser } = props;

  const [isOpenRegPanel, setisOpenRegPanel] = useState(false);

  // const login = authorizedUser.user.login || '';

  const changeStatusRegPanel = () => {
    setisOpenRegPanel(!isOpenRegPanel);
  };

  return (
    <div className="containerHeader">
      <div className="logoDiv">
        <a href="/" className="linkLogo">
          <Cocktail />
          <span className="textLogo">reason to party!</span>
        </a>
      </div>
      <div className="helloUser">
        {authorizedUser.authUser ? (
          <p className="helloText">
            Only important occasions, only national holidays for you,
            <span className="userName">
              &nbsp;
              {authorizedUser.user.login}!
            </span>
          </p>
        ) : (
          ''
        )}
      </div>
      <div className="navDiv">
        <button className="navButton" type="button">
          <Keypad />
        </button>
        <button className="navButton" type="button" onClick={changeStatusRegPanel}>
          <Person />
        </button>
        <PersonPanel changeStatusRegPanel={changeStatusRegPanel} isOpenRegPanel={isOpenRegPanel} />
      </div>
    </div>
  );
};

export default Header;
