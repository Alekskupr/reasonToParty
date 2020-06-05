import React, { useState, useEffect } from 'react';
import { useSelect, useDispatch } from 'react-redux';
import { authorizedUserAC } from '../../redux/action';

import c from './personPanel.css';

const PersonPanel = (props) => {
  const [regObject, setRegObject] = useState({
    email: null,
    login: null,
    password: null,
    subscription: false,
  });

  const [typePanel, setTypePanel] = useState({
    registration: false,
    authorization: true,
  });

  const dispatch = useDispatch();
  // const inputHandler = (e) => {
  //   switch (e.target.id) {
  //     case 'email': {
  //       setRegObject({
  //         ...regObject,
  //         email: e.target.value,
  //       });
  //       break;
  //     }
  //     case 'login': {
  //       setRegObject({
  //         ...regObject,
  //         login: e.target.value,
  //       });
  //       break;
  //     }
  //     case 'password': {
  //       setRegObject({
  //         ...regObject,
  //         password: e.target.value,
  //       });
  //       break;
  //     }
  //     case 'subscription': {
  //       setRegObject({
  //         ...regObject,
  //         subscription: e.target.value,
  //       });
  //       break;
  //     }
  //     default:
  //       setRegObject(regObject);
  //   }
  // };

  const inputHandler = (e) => {
    e.target.id === 'email'
      ? setRegObject({ ...regObject, email: e.target.value })
      : e.target.id === 'login'
      ? setRegObject({ ...regObject, login: e.target.value })
      : e.target.id === 'password'
      ? setRegObject({ ...regObject, password: e.target.value })
      : e.target.id === 'subscription'
      ? setRegObject({ ...regObject, subscription: e.target.subscription })
      : setRegObject({ ...regObject });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch('/api/parties/registration', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(regObject),
    })
      .then((resp) => resp.json())
      .then((data) => dispatch(authorizedUserAC(data)))
      .then(() => props.changeStatusRegPanel())
      .catch((err) => console.log('catch ', err));
  };

  const changePanelHandler = () => {
    setTypePanel({
      registration: !typePanel.registration,
      authorization: !typePanel.authorization,
    });
  };

  return (
    <div className={c.containerRegPanel}>
      {/* <h4>{JSON.stringify(regObject.password)}</h4> */}
      <button className type="button" onClick={changePanelHandler}>
        <span>{typePanel.authorization ? 'registration' : 'authorization'}</span>
      </button>

      {typePanel.authorization ? (
        <form className={c.form} onSubmit={submitHandler}>
          <h4>Authorization</h4>
          <div className={c.inputGroup}>
            <input onChange={inputHandler} id="login" placeholder=" " />
            <label htmlFor="login">login</label>
          </div>
          <div className={c.inputGroup}>
            <input onChange={inputHandler} id="password" placeholder=" " />
            <label htmlFor="password">password</label>
          </div>
          <button type="submit">log in</button>
        </form>
      ) : (
        <form className={c.form} onSubmit={submitHandler}>
          <h4>Registration</h4>
          <div className={c.inputGroup}>
            <input onChange={inputHandler} id="email" type="email" placeholder=" " />
            <label htmlFor="email">email</label>
          </div>
          <div className={c.inputGroup}>
            <input onChange={inputHandler} id="login" placeholder=" " />
            <label htmlFor="login">create login</label>
          </div>
          <div className={c.inputGroup}>
            <input onChange={inputHandler} id="password" placeholder=" " />
            <label htmlFor="password">create password</label>
          </div>
          <div className={`${c.inputGroup} ${c.InputCheckbox}`}>
            <input onChange={inputHandler} id="subscription" type="checkbox" />
            <span>I agree to receive newsletters about my favorite holidays!</span>
          </div>
          <button type="submit">sign up</button>
        </form>
      )}
    </div>
  );
};

export default PersonPanel;
