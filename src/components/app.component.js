import React, { useState, useEffect } from 'react';
import s from './app.component.css';
import PartyList from './partyList/partyList';
import Header from './header/header';
import CardInfo from './cardInfo/cardInfo';


const App = () => {
  const [dataParty, setDataParty] = useState([]);
  const [dataCounty, setDataCountry] = useState([]);

  const [selectedParty, setSelectedParty] = useState(0);
  // const [infoParty, setInfoParty] = useState(0);
  // const [isOpenCardInfo, setIsOpenCardInfo] = useState(true);

  const getDataParty = () => {
    fetch('/api/parties')
      .then(res => res.json())
      .then(data => {
        setDataParty(data);
        // setSelectedParty(data[0]);
      })
      .catch(console.log('чет не грузится пока'));
  };

  const getDataCountry = () => {
    fetch('/api/parties/countries')
      .then(resp => resp.json())
      .then(data => setDataCountry(data))
      .catch(console.log('страны не прогрузились'));
  };

  // const partyInfoSearch = party => {
  //   if (party) {
  //     fetch(`/api/parties/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json',
  //         accept: 'application/json',
  //       },
  //       body: JSON.stringify({
  //         party,
  //       }),
  //     })
  //       .then(resp => resp.json())
  //       .then(res => setInfoParty(res))
  //       .catch(err => setInfoParty({err}));   
  //   }
  // };

  useEffect(() => {
    getDataParty();
  }, []);

  useEffect(() => {
    getDataCountry();
  }, []);

  // useEffect(() => {
  //   partyInfoSearch(selectedParty);
  // }, [selectedParty]);

  

  return (
    <div className={s.app}>
      <Header />
      <article className={s.nav}>Описание</article>
      <article className={s.partyInfo}>
        {dataParty.length && dataCounty.length && (
          <PartyList parties={dataParty} countries={dataCounty} />
        )}
      </article>
      <aside className={s.sidebar}></aside>
      <footer className={s.footer}>Футер</footer>
    </div>
  );
};

export default App;
