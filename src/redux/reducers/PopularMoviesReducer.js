import * as Types from '../actions/Types';

const initialState = {
  jsonResponse: null,
  responseType: '',
  errorResponse: '',
};

const homeScreenInfo = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case Types.GET_POPULAR_MOVIES:
    case Types.GET_POPULAR_MOVIES_ERROR:
      newState = Object.assign({}, state, {
        responseType: action.type,
        jsonResponse: action.response,
        errorResponse: action.errorResponse,
      });
      return newState;
    default:
      return state || newState;
  }
};

export default homeScreenInfo;
