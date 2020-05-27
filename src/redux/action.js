const selectPartyNameAC = party => {
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

const combinedDataPartiesAC = (countryArr) => {
  return {
    type: 'COMBINED_DATA',
    payload: countryArr,
  }
}

export { selectPartyNameAC, downloadInfoAC, combinedDataPartiesAC };
