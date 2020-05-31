const selectPartyNameAC = (party) => {
  return {
    type: 'SELECT',
    payload: party,
  };
};

const downloadInfoAC = () => {
  return {
    type: 'DOWNLOAD_INFO',
    payload: true,
  };
};

const selectCountryKeyAC = (countryKey) => {
  return { type: 'SELECT_COUNTRY_KEY', payload: countryKey };
};

const searchWordAC = (word) => {
  return {
    type: 'SEARCH_WORD',
    payload: word,
  };
};

export { selectPartyNameAC, downloadInfoAC, selectCountryKeyAC, searchWordAC };
