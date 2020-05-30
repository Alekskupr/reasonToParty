import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './app.component.css';
import PartyList from './partyList/partyList';
import Header from './header/header';
import { downloadInfoAC } from '../redux/action';
import Footer from './footer/footer';
import FilterPanel from './filter/filter';

const App = () => {
  const [dataParty, setDataParty] = useState([]);
  const [dataCounty, setDataCountry] = useState([]);

  const [combinedDataParties, setcombinedDataParties] = useState([]);
  const [dataPartiesForList, setDataPartiesForList] = useState([]);

  // const [selectCountry, setSelectCountry] = useState([]);

  const selectedCountry = useSelector((store) => {
    return store.selectCountry;
  });

  const searchWordFromFilter = useSelector((store) => {
    return store.searchWord;
  });

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
    const partyInfoSearch = (party, combinedData) => {
      const { name, country } = party;
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
          .then((patryWithInfo) => {
            const index = combinedData.findIndex((item) => item.name === name && item.country === country);
            const newCombinedDataParties = [
              ...combinedData.slice(0, index),
              patryWithInfo,
              ...combinedData.slice(index + 1, combinedData.length),
            ];
            return newCombinedDataParties;
          })
          .then((result) => setDataPartiesForList(result))
          .then(() => dispatch(downloadInfoAC()))
          .catch((err) => console.log(err));
      }
    };
    partyInfoSearch(selectedParty, combinedDataParties);
  }, [selectedParty, dispatch, combinedDataParties]);

  useEffect(() => {
    const combine = (dataPartyArr, dataCountyArr) => {
      if ((dataPartyArr.length, dataCountyArr.length)) {
        const parties = [...dataPartyArr];
        for (let i = 0; i < parties.length; i += 1) {
          const countrySearch = dataCountyArr.filter((item) => item.alpha2Code === dataPartyArr[i].countryCode);
          parties[i].flag = countrySearch[0].flag;
          parties[i].country = countrySearch[0].name;
        }
        setcombinedDataParties(parties);
      }
    };
    combine(dataParty, dataCounty);
  }, [dataParty, dataCounty]);

  useEffect(() => {
    setDataPartiesForList(combinedDataParties);
  }, [combinedDataParties]);

  useEffect(() => {
    const filter = (arrForList, searchWord) => {
      const filteredList = arrForList.filter(
        (item) =>
          item.country.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1 ||
          item.name.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1 ||
          item.date.indexOf(searchWord) !== -1,
      );
      return filteredList;
    };
    const filteredList = filter(combinedDataParties, searchWordFromFilter);
    setDataPartiesForList(filteredList);
  }, [combinedDataParties, searchWordFromFilter]);

  // useEffect(() => {
  //   console.log(dataPartiesForList);
  // }, [dataPartiesForList]);

  return (
    <div className={s.app}>
      <Header />
      <FilterPanel className={s.nav} dataPartiesForList={dataPartiesForList} />
      <article className={s.partyInfo}>
        {dataPartiesForList.length ? (
          <PartyList dataPartiesForList={dataPartiesForList} downloadInfo={downloadInfo} />
        ) : (
          ''
        )}
      </article>
      <aside className={s.sidebar} />
      <Footer />
    </div>
  );
};

export default App;
