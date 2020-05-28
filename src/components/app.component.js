import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './app.component.css';
import PartyList from './partyList/partyList';
import Header from './header/header';
import { downloadInfoAC } from '../redux/action';
import Footer from './footer/footer';
import FilterPanel from './filter/filter';

const App = () => {
  // console.log(Footer);

  const [dataParty, setDataParty] = useState([]);
  const [dataCounty, setDataCountry] = useState([]);

  // const [selectedParty, setSelectedParty] = useState(0);

  // const [isOpenCardInfo, setIsOpenCardInfo] = useState(true);
  // const selectedParty = useSelector(store => store.selectPartyName);

  const selectedParty = useSelector((store) => {
    return store.selectPartyName;
  });

  const dispatch = useDispatch();
  const downloadInfo = useSelector((store) => store.downloadInfo);

  const getDataParty = () => {
    fetch('/api/parties')
      .then((res) => res.json())
      .then((data) => {
        setDataParty(data);
        // setSelectedParty(data[0]);
      })
      .catch(console.log('чет не грузится пока'));
  };

  const getDataCountry = () => {
    fetch('/api/parties/countries')
      .then((resp) => resp.json())
      .then((data) => setDataCountry(data))
      .catch(console.log('страны не прогрузились'));
  };

  useEffect(() => {
    getDataParty();
  }, []);

  useEffect(() => {
    getDataCountry();
  }, []);

  useEffect(() => {
    const partyInfoSearch = (party) => {
      const { name } = party;
      if (name) {
        fetch(`/api/parties/`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({
            name,
          }),
        })
          .then((resp) => resp.json())
          .then((res) => {
            return {
              ...party,
              info: res,
            };
          })
          .then(() => dispatch(downloadInfoAC()))
          .catch((err) => console.log(err));
      }
    };
    partyInfoSearch(selectedParty);
  }, [selectedParty, dispatch]);

  return (
    <div className={s.app}>
      <Header />
      <FilterPanel className={s.nav} countries={dataCounty} />
      <article className={s.partyInfo}>
        {dataParty.length && dataCounty.length && (
          <PartyList parties={dataParty} countries={dataCounty} downloadInfo={downloadInfo} />
        )}
      </article>
      <aside className={s.sidebar} />
      <Footer />
    </div>
  );
};

export default App;
