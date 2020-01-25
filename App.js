import React, {Component} from 'react';
import {Text, View} from 'react-native';
import HomeScreen from './src/HomeScreen';

export default class App extends Component {
  render() {
    return (
      <View>
        <HomeScreen />
      </View>
    );
  }
}
