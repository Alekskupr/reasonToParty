import React, { useState, useEffect } from 'react';
import s from './app.component.css';
import PartyList from './partyList/partyList';
const { CountryApi } = require('country-api');

const App = () => {
  const [dataParty, setDataParty] = useState([]);

  const getDataParty = () => {
    fetch('/api/parties')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setDataParty(data);
      })
      .catch(console.log('чет не грузится пока'))
  };

  useEffect(() => {
    getDataParty();
  }, []);

  // console.log(dataParty);
  return (
    <div className={s.app}>
      <header className={s.header}>Это будет шапка</header>
      <article className={s.nav}>Описание</article>
      <article className={s.partyInfo}>
        {dataParty ? <PartyList parties = {dataParty}/> : ''}  
      </article>
      <aside className={s.sidebar}></aside>
      <footer className={s.footer}>Футер</footer>
    </div>
  );
};

export default App;
