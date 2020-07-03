import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './app.component.css';
import PartyList from './partyList/partyList';
import Header from './header/header';
import { downloadInfoAC, authorizedUserAC } from '../redux/action';
import Footer from './footer/footer';
import FilterPanel from './filter/filter';

const App = () => {
  const [dataParty, setDataParty] = useState([]);
  const [dataCounty, setDataCountry] = useState([]);
  const [availableCountries, setAvailableCountries] = useState([]);
  const [dataPartiesFromServer, setDataPartiesFromServer] = useState([]);
  const [dataPartiesForList, setDataPartiesForList] = useState([]);

  const dispatch = useDispatch();

  const selectedParty = useSelector((store) => {
    return store.selectPartyName;
  });

  const selectedCountryKeyFromFilter = useSelector((store) => {
    return store.selectCountry;
  });

  const searchWordFromFilter = useSelector((store) => {
    return store.searchWord;
  });

  const downloadInfo = useSelector((store) => store.downloadInfo);

  const authorizedUser = useSelector((store) => store.authorizedUser);
  const authUser = useSelector((store) => store.authUser);

  // const favoriteHolidayHandler = () => {
  //   setDataPartiesFromServer(authorizedUser.favoriteHolidays);
  // };

  // useEffect(() => {
  //   fetch('/api/parties/countries')
  //     .then((resp) => resp.json())
  //     .then((data) => setDataCountry(data))
  //     .catch(console.log('страны не прогрузились'));
  // }, []);

  // useEffect(() => {
  //   fetch('/api/parties')
  //     .then((res) => res.json())
  //     .then((data) => setDataPartiesForList(data))
  //     .catch(console.log('чет не грузится пока'));
  // }, []);

  useEffect(() => {
    fetch(`/api/parties/dataParties/${selectedCountryKeyFromFilter}`)
      .then((resp) => resp.json())
      .then((data) => setDataPartiesFromServer(data))
      .catch((err) => console.log(err));
  }, [selectedCountryKeyFromFilter, authUser, authorizedUser]);

  useEffect(() => {
    setDataPartiesForList(dataPartiesFromServer);
  }, [dataPartiesFromServer]);

  useEffect(() => {
    fetch('/api/parties/availableCountries')
      .then((resp) => resp.json())
      .then((data) => setAvailableCountries(data))
      .catch(console.log('возможные страны не прогрузились'));
  }, []);

  useEffect(() => {
    fetch('/api/parties/user')
      .then((resp) => resp.json())
      .then((user) => {
        dispatch(authorizedUserAC(user));
      });
  }, [authUser, dispatch]);

  useEffect(() => {
    const partyInfoSearch = (party, dataParties) => {
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
            const index = dataParties.findIndex((item) => item.name === name && item.country === country);
            const newCombinedDataParties = [
              ...dataParties.slice(0, index),
              patryWithInfo,
              ...dataParties.slice(index + 1, dataParties.length),
            ];
            return newCombinedDataParties;
          })
          .then((result) => setDataPartiesForList(result))
          .then(() => dispatch(downloadInfoAC()))
          .catch((err) => console.log(err));
      }
    };
    partyInfoSearch(selectedParty, dataPartiesForList);
  }, [selectedParty, dispatch]);

  // useEffect(() => {
  //   const combine = (dataPartyArr, dataCountyArr) => {
  //     if ((dataPartyArr.length, dataCountyArr.length)) {
  //       const parties = [...dataPartyArr];
  //       for (let i = 0; i < parties.length; i += 1) {
  //         const countrySearch = dataCountyArr.filter((item) => item.alpha2Code === dataPartyArr[i].countryCode);
  //         parties[i].flag = countrySearch[0].flag;
  //         parties[i].country = countrySearch[0].name;
  //         // parties[i].like = false;
  //       }
  //       setcombinedDataParties(parties);
  //     }
  //   };
  //   combine(dataParty, dataCounty);
  // }, [dataParty, dataCounty]);

  // useEffect(() => {
  //   setDataPartiesForList(combinedDataParties);
  // }, [combinedDataParties]);

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
    const filteredList = filter(dataPartiesFromServer, searchWordFromFilter);
    setDataPartiesForList(filteredList);
  }, [dataPartiesFromServer, searchWordFromFilter]);

  // console.log(authorizedUser);

  return (
    <div className="app">
      <section className="header">
        <Header authorizedUser={authorizedUser} authUser={authUser} />
        {/* <div>{JSON.stringify(authorizedUser)}</div> */}
      </section>
      <section className="nav">
        <FilterPanel availableCountries={availableCountries} />
      </section>
      <article className="partyInfo">
        {dataPartiesForList.length ? (
          <PartyList dataPartiesForList={dataPartiesForList} downloadInfo={downloadInfo} />
        ) : (
          ''
        )}
      </article>
      <aside className="sidebar">
        <ul>
          {authorizedUser.favoriteHolidays.map((party, index) => {
            return <li key={index}>{party.name}</li>;
          })}
        </ul>
      </aside>
      <Footer />
    </div>
  );
};

export default App;
