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

export { selectPartyNameAC, downloadInfoAC, selectCountryAC };
