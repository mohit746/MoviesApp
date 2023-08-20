import {combineReducers} from 'redux';
import PopularMoviesReducer from './PopularMoviesReducer';

const AppReducer = combineReducers({
  PopularMoviesResp: PopularMoviesReducer,
});

export default AppReducer;
