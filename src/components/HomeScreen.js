import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {ActionCreators} from '../redux/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {serviceURL} from '../lib/UrlConfig';
import Moment from 'moment';
import * as stringConstant from '../utilities/StringConstants';
import SearchComponent from './SearchComponent';

const devWidth = Dimensions.get('window').width;
const devHeight = Dimensions.get('window').height;
Moment.locale('en');

const HomeScreen = props => {
  const [moviesList, setMoviesList] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [errorText, setErrorText] = useState(stringConstant.NO_RECORD_FOUND);

  return (
    <View style={style.mainContainer}>
      <View>
        <Text style={style.headerStyle}>
          {stringConstant.POPULAR_MOVIE_TITLE}
        </Text>
        <SearchComponent
          setMoviesList={setMoviesList}
          movieName={movieName}
          setMovieName={setMovieName}
          navProps={props}
          setErrorText={setErrorText}
        />
      </View>
      {moviesList && moviesList.length > 0 ? (
        <FlatList
          data={moviesList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={style.listItemContainerStyle}>
              <Image
                source={{uri: serviceURL.POSTER_URL + item.poster_path}}
                style={style.posterImageStyle}
              />
              <View style={style.paddingStart_6}>
                <Text style={style.titleTextStyle}>{item.title}</Text>
                <Text style={style.releaseDateStyle}>
                  {Moment(item.release_date).format('d MMM YYYY')}
                </Text>
                <Text style={style.overviewTextStyle}>
                  {item.overview.length < 110
                    ? `${item.overview}`
                    : `${item.overview.substring(0, 110)}...`}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        // If List is empty due to network fail or API failure displaying custom error message
        <Text style={style.errorTextStyle}>{errorText}</Text>
      )}
    </View>
  );
};

function mapStateToProps(state) {
  return {
    PopularMoviesResp: state.PopularMoviesResp,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const style = StyleSheet.create({
  mainContainer: {flex: 1, alignItems: 'center'},
  headerStyle: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '600',
    margin: 10,
  },
  listItemContainerStyle: {
    marginVertical: 6,
    height: devHeight / 5,
    width: devWidth - 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
  },
  posterImageStyle: {
    height: '110%',
    width: '30%',
    resizeMode: 'contain',
  },
  titleTextStyle: {
    textAlign: 'left',
    textAlignVertical: 'center',
    marginVertical: 2,
    fontWeight: '600',
    fontSize: 14,
  },
  releaseDateStyle: {
    textAlign: 'left',
    textAlignVertical: 'center',
    marginVertical: 2,
  },
  overviewTextStyle: {
    marginVertical: 2,
    width: devWidth / 1.6,
  },
  paddingStart_6: {paddingStart: 6},
  errorTextStyle: {textAlign: 'center', fontSize: 20, fontWeight: '400'},
});
