import React from 'react';
import c from './personPanel.css';

const PersonPanel = () => {
  return (
    <div className={c.containerRegPanel}>
      <form className={c.form}>
        <h1>Registration</h1>
        <div className={c.inputGroup}>
          <input id="login" />

          <label htmlFor="login">login</label>
        </div>
        <div className={c.inputGroup}>
          <input id="password" />

          <label htmlFor="password">password</label>
        </div>
        <button type="submit">registration</button>
      </form>
    </div>
  );
};

export default PersonPanel;
