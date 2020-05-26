const selectPartyNameAC = party => {
  return {
    type: 'SELECT',
    payload: party,
  };
};

export{ selectPartyNameAC };
