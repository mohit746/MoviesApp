import config from 'react-native-config';

const {
  HOST_URL = '',
  POPULAR_MOVIE = '',
  READ_ACCESS_TOKEN = '',
  POSTER_URL = '',
} = config;

export const serviceURL = {
  HOST_URL: HOST_URL,
  POPULAR_MOVIE: POPULAR_MOVIE,
  READ_ACCESS_TOKEN: READ_ACCESS_TOKEN,
  POSTER_URL: POSTER_URL,
};
