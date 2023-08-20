import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import reducer from '../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import AppNavigator from './AppNavigator';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="brown" barStyle="light-content" />
        <View style={styles.flex_1}>
          <AppNavigator />
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'brown',
    marginBottom:
      Dimensions.get('window').height === 812 && Platform.OS === 'ios'
        ? -35
        : 0,
  },
  flex_1: {flex: 1},
});
