import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './app.component.css';
import { Router, Route } from 'react-router-dom';
import PartyList from './partyList/partyList';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import { downloadInfoAC, authorizedUserAC } from '../redux/action';
import Footer from './footer/footer';
import FilterPanel from './filter/filter';
import ResumePanel from './resumePanel/resumePanel';

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

  return (
    <div className="app">
      <Route path="/" render={() => <Footer />} />
      <Route path="/" render={() => <Header authorizedUser={authorizedUser} authUser={authUser} />} />
      <Route path="/" render={() => <FilterPanel availableCountries={availableCountries} />} />
      <Route path="/" render={() => <Sidebar />} />
      <Route
        exact
        path="/"
        render={() => <PartyList dataPartiesForList={dataPartiesForList} downloadInfo={downloadInfo} />}
      />
      <Route exact path="/resume" render={() => <ResumePanel />} />
    </div>
  );
};

export default App;
