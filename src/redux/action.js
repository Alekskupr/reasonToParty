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

const selectCountryAC = (country) => {
  return { type: 'SELECT_COUNTRY', payload: country };
};

const searchWordAC = (word) => {
  return {
    type: 'SEARCH_WORD',
    payload: word,
  };
};

export { selectPartyNameAC, downloadInfoAC, selectCountryAC, searchWordAC };
