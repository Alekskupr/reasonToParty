const initialState = {
  selectPartyName: {},
  downloadInfo: false,
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
    default:
      return state;
  }
}
