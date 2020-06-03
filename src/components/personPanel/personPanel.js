import React, { useState, useEffect } from 'react';
import c from './personPanel.css';

const PersonPanel = () => {
  const [regObject, setRegObject] = useState({ email: null, login: null, password: null, subscription: null });

  const handlerChangeEmailInput = (e) => {
    return {
      ...regObject,
      email: setRegObject(e.target.value),
    };
  };

  return (
    <div className={c.containerRegPanel}>
      <form className={c.form}>
        <h4>Registration</h4>
        <h4>{JSON.stringify(regObject)}</h4>
        <div className={c.inputGroup}>
          <input onChange={handlerChangeEmailInput} id="email" type="email" placeholder=" " />
          <label htmlFor="email">email</label>
        </div>
        <div className={c.inputGroup}>
          <input id="login" placeholder=" " />
          <label htmlFor="login">create login</label>
        </div>
        <div className={c.inputGroup}>
          <input id="password" placeholder=" " />
          <label htmlFor="password">create password</label>
        </div>
        <div className={`${c.inputGroup} ${c.InputCheckbox}`}>
          <input id="mailing" type="checkbox" />
          <span>I agree to receive newsletters about my favorite holidays!</span>
        </div>
        <button type="submit">registration</button>
      </form>
    </div>
  );
};

export default PersonPanel;
