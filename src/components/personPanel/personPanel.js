import React, { useState, useEffect } from 'react';
import { useSelect, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { authorizedUserAC } from '../../redux/action';

import './personPanel.css';

const PersonPanel = (props) => {
  // console.log(c.animationRegPanel);
  // const [inProp, setInProp] = useState(false);
  // const { isOpenRegPanel } = props;

  const [isOpen, setIsOpen] = useState(false);

  const [userData, setUserData] = useState({
    email: null,
    login: null,
    password: null,
    subscription: false,
  });

  const [typePanel, setTypePanel] = useState({
    registration: false,
    authorization: true,
  });

  const [authMessage, setAuthMessage] = useState('');

  const dispatch = useDispatch();

  const inputHandler = (e) => {
    e.target.id === 'email'
      ? setUserData({ ...userData, email: e.target.value })
      : e.target.id === 'login'
      ? setUserData({ ...userData, login: e.target.value })
      : e.target.id === 'password'
      ? setUserData({ ...userData, password: e.target.value })
      : e.target.id === 'subscription'
      ? setUserData({ ...userData, subscription: e.target.subscription })
      : setUserData({ ...userData });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const partForReq = typePanel.authorization ? 'authorization' : 'registration';
    fetch(`/api/parties/${partForReq}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setAuthMessage(data.message);
        dispatch(authorizedUserAC(data));
        return data.authUser && props.changeStatusRegPanel();
      })
      .catch((err) => console.log('catch ', err));
  };

  const changePanelHandler = () => {
    setTypePanel({
      registration: !typePanel.registration,
      authorization: !typePanel.authorization,
    });
  };
  // console.log('animationRegPanel-enter');

  return (
    <div className="containerPersonPanel">
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        yf;vb
      </button>
      {/* <h4>{JSON.stringify(isOpen)}</h4> */}
      <CSSTransition
        in={isOpen}
        timeout={1000}
        className="animationRegPanel"
        unmountOnExit
        // onEnter={() => setIsOpen(true)}
        // onExited={() => setIsOpen(false)}
      >
        {/* <h4>{JSON.stringify(authMessage)}</h4> */}
        <div>
          {authMessage ? <span className="messageUser">{authMessage}</span> : ''}
          <button type="button" onClick={changePanelHandler}>
            <span>{typePanel.authorization ? 'registration' : 'authorization'}</span>
          </button>

          {typePanel.authorization ? (
            <form className="form" onSubmit={submitHandler}>
              <h4>Authorization</h4>
              <div className="inputGroup">
                <input onChange={inputHandler} id="login" placeholder=" " />
                <label htmlFor="login">login</label>
              </div>
              <div className="inputGroup">
                <input onChange={inputHandler} id="password" placeholder=" " />
                <label htmlFor="password">password</label>
              </div>
              <button type="submit">log in</button>
            </form>
          ) : (
            <form className="form" onSubmit={submitHandler}>
              <h4>Registration</h4>
              <div className="inputGroup">
                <input onChange={inputHandler} id="email" type="email" placeholder=" " />
                <label htmlFor="email">email</label>
              </div>
              <div className="inputGroup">
                <input onChange={inputHandler} id="login" placeholder=" " />
                <label htmlFor="login">create login</label>
              </div>
              <div className="inputGroup">
                <input onChange={inputHandler} id="password" placeholder=" " />
                <label htmlFor="password">create password</label>
              </div>
              <div className={`${'inputGroup'} ${'InputCheckbox'}`}>
                <input onChange={inputHandler} id="subscription" type="checkbox" />
                <span>I agree to receive newsletters about my favorite holidays!</span>
              </div>
              <button type="submit">sign up</button>
            </form>
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

export default PersonPanel;
