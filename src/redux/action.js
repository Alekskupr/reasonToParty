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

const authorizedMessageAC = (message) => {
  return {
    type: 'AUTHORIZED_MESSAGE',
    payload: message,
  };
};

const authorizedUserAC = (user) => {
  return {
    type: 'AUTHORIZED_USER',
    payload: user,
  };
};

const authUserAC = (bool) => {
  return {
    type: 'AUTH_USER',
    payload: bool,
  };
};

const favoriteHolidayAC = (holiday) => {
  return {
    type: 'FAVORITE_HOLIDAY',
    payload: holiday,
  };
};

export {
  selectPartyNameAC,
  downloadInfoAC,
  selectCountryKeyAC,
  searchWordAC,
  authorizedMessageAC,
  authorizedUserAC,
  authUserAC,
  favoriteHolidayAC,
};
