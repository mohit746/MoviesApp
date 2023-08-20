import * as Types from './Types';
import {getData} from '../../lib/HomeScreenService';

export const getPopularMoviesData = (data, reqOwner) => {
  return dispatch => {
    getData(data, (jsonResponse, errorResponse) => {
      dispatch({
        type: jsonResponse
          ? Types.GET_POPULAR_MOVIES
          : Types.GET_POPULAR_MOVIES_ERROR,
        response: jsonResponse,
        errorResponse: errorResponse,
      });
    });
  };
};
