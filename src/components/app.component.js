import React, { useState, useEffect } from 'react';
import s from './app.component.css';
import PartyList from './partyList/partyList';
import Header from './header/header';


const App = () => {
  const [dataParty, setDataParty] = useState([]);
  const [dataCounty, setDataCountry] = useState([]);

  const getDataParty = () => {
    fetch('/api/parties')
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setDataParty(data);
      })
      .catch(console.log('чет не грузится пока'))
  };

  const getDataCountry = () => {
    fetch('/api/parties/countries')
    .then(resp => resp.json())
    .then(data => setDataCountry(data))
    .catch(console.log('страны не прогрузились')
    )
  };

  useEffect(() => {
    getDataParty();
  }, []);

  useEffect(() => {
    getDataCountry();
  }, []);

  // console.log(dataCounty);
  return (
    <div className={s.app}>
      <Header />
      <article className={s.nav}>Описание</article>
      <article className={s.partyInfo}>
        {dataParty.length && dataCounty.length && <PartyList parties={dataParty} countries={dataCounty} />}
      </article>
      <aside className={s.sidebar}></aside>
      <footer className={s.footer}>Футер</footer>
    </div>
  );
};

export default App;
