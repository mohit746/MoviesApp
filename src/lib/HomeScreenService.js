import * as stringConstant from '../utilities/StringConstants';
import * as UrlConfig from '../lib/UrlConfig';
import NetInfo from '@react-native-community/netinfo';

const isNetworkAvailable = async () => {
  let connected = false;
  await NetInfo.fetch().then(state => {
    if (state.isConnected) {
      connected = true;
    } else {
      connected = false;
    }
  });
  return connected;
};

export const getData = async (body, responseHandler) => {
  const header = {
    accept: 'application/json',
    Authorization: 'Bearer ' + UrlConfig.serviceURL.READ_ACCESS_TOKEN,
  };

  await fetch(
    UrlConfig.serviceURL.HOST_URL + UrlConfig.serviceURL.POPULAR_MOVIE,
    {
      method: 'GET',
      headers: header,
      body: body,
    },
  )
    .then(response => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    })
    .then(([statusCode, jsonResponse]) => {
      switch (statusCode) {
        case 200:
          if (jsonResponse) {
            responseHandler(jsonResponse, null);
          } else if (!isNetworkAvailable()) {
            responseHandler(null, stringConstant.OFFLINE_MESSAGE);
          } else {
            responseHandler(null, stringConstant.UNABLE_FETCH_RECORD);
          }
          break;
        case 0:
          responseHandler(null, stringConstant.REQUEST_TIMEOUT);
          break;
        case 500:
          responseHandler(null, stringConstant.INTERNAL_SERVER_ERROR);
          break;
        default:
          if (!isNetworkAvailable()) {
            responseHandler(null, stringConstant.OFFLINE_MESSAGE);
          } else {
            responseHandler(null, stringConstant.UNABLE_FETCH_RECORD);
          }
          break;
      }
    })
    .catch(() => {
      if (!isNetworkAvailable()) {
        responseHandler(null, stringConstant.OFFLINE_MESSAGE);
      } else {
        responseHandler(null, stringConstant.UNABLE_FETCH_RECORD);
      }
    });
};
