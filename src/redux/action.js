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

export { selectPartyNameAC, downloadInfoAC };
