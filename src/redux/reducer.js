const initialState = {
  selectPartyName: {},
  downloadInfo: false,
  selectCountry: 'all',
  isOpenSelect: false,
  searchWord: '',
  authUser: false,
  authorizedUser: {
    login: '',
    favoriteHolidays: [],
  },
  authorizedMessage: {},
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
    case 'AUTHORIZED_MESSAGE': {
      return {
        ...state,
        authorizedMessage: action.payload,
      };
    }
    case 'AUTHORIZED_USER': {
      return {
        ...state,
        authorizedUser: action.payload,
        authUser: true,
      };
    }
    case 'AUTH_USER': {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    // case 'FAVORITE_HOLIDAY': {
    //   return {
    //     ...state,
    //     authorizedUser: {
    //       ...state.authorizedUser,
    //       favoriteHolidays: [...state.authorizedUser.favoriteHolidays, action.payload],
    //     },
    //   };
    // }
    default:
      return state;
  }
}
