const initialState = {
  selectPartyName: {},
  downloadInfo: false,
  selectCountry: null,
  isOpenSelect: false,
  searchWord: null,
  authorizedUser: {
    authUser: false,
    message: '',
    user: {
      favoriteHolyday: [],
      login: null,
      password: null,
      email: null,
    },
  },
};

export default function (state = initialState, action) {
  // console.log(...state);

  switch (action.type) {
    case 'SELECT': {
      return {
        ...state,
        selectPartyName: action.payload,
        downloadInfo: false,
      };
    }
    case 'DOWNLOAD_INFO': {
      return {
        ...state,
        downloadInfo: action.payload,
      };
    }
    case 'SELECT_COUNTRY_KEY': {
      return {
        ...state,
        selectCountry: action.payload,
      };
    }
    case 'SEARCH_WORD': {
      return {
        ...state,
        searchWord: action.payload,
      };
    }
    case 'AUTHORIZED_USER': {
      return {
        ...state,
        authorizedUser: action.payload,
      };
    }
    default:
      return state;
  }
}
