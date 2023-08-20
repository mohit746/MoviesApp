import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import * as stringConstant from '../utilities/StringConstants';
import * as Types from '../redux/actions/Types';

const devWidth = Dimensions.get('window').width;
const devHeight = Dimensions.get('window').height;

export default SearchComponent = props => {
  const [allMovies, setAllMovies] = useState(
    navProps ? navProps.PopularMoviesResp.jsonResponse.results : [],
  );
  const {setMovieName, movieName, setMoviesList, navProps, setErrorText} =
    props;

  // Single method to set list on view.
  const setMovies = () => {
    if (
      navProps.PopularMoviesResp &&
      navProps.PopularMoviesResp.responseType == Types.GET_POPULAR_MOVIES &&
      navProps.PopularMoviesResp.jsonResponse &&
      navProps.PopularMoviesResp.jsonResponse.results
    ) {
      setAllMovies(navProps.PopularMoviesResp.jsonResponse.results);
      setMoviesList(navProps.PopularMoviesResp.jsonResponse.results);
    } else if (
      navProps.PopularMoviesResp &&
      navProps.PopularMoviesResp.responseType ==
        Types.GET_POPULAR_MOVIES_ERROR &&
      navProps.PopularMoviesResp.errorResponse == stringConstant.OFFLINE_MESSAGE
    ) {
      setErrorText(stringConstant.OFFLINE_MESSAGE);
    } else if (
      navProps.PopularMoviesResp &&
      navProps.PopularMoviesResp.responseType == Types.GET_POPULAR_MOVIES_ERROR
    ) {
      setErrorText(stringConstant.UNABLE_FETCH_RECORD);
    } else {
      navProps.getPopularMoviesData(null, this);
    }
  };

  // For first load and new items in list
  useEffect(() => {
    setMovies();
  }, [navProps.PopularMoviesResp]);

  //For Movie search debouncing code...
  useEffect(() => {
    if (movieName && movieName.length > 0) {
      const delayDebounce = setTimeout(() => {
        searchMovie(movieName);
      }, 2000);
      return () => clearTimeout(delayDebounce);
    } else {
      setMovies();
    }
  }, [movieName]);

  // Search movie by title.. comparision code.
  const searchMovie = value => {
    if (value && value.length > 0) {
      let newList = [];
      allMovies.map(item => {
        if (String(item.title).toLowerCase().includes(value.toLowerCase())) {
          newList.push(item);
        }
      });
      setMoviesList(newList);
    }
  };

  return (
    <View style={style.searchViewMainStyle}>
      <TextInput
        style={style.searchInputStyle}
        placeholder={stringConstant.ENTER_MOVIE}
        onChangeText={value => {
          setMovieName(value);
        }}
      />
      <TouchableOpacity
        style={style.searchButtonStyle}
        onPress={() => searchMovie(movieName)}>
        <Text style={style.searchTextStyle}>{stringConstant.SEARCH_TEXT}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  searchViewMainStyle: {
    height: devHeight / 18,
    flexDirection: 'row',
    marginVertical: 16,
  },
  searchInputStyle: {
    width: devWidth - 100,
    borderWidth: 0.4,
    textAlign: 'left',
    paddingStart: 6,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  searchButtonStyle: {
    backgroundColor: 'brown',
    width: devWidth / 6,
    justifyContent: 'center',
    borderRadius: 20,
  },
  searchTextStyle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
});
