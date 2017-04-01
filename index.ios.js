/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import BannerView from './BannerView';
var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

//引入数据
var ImageData = require('./data.json');

export default class BannerViewDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
          <BannerView height={250} width={width} images={ImageData.data}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});

AppRegistry.registerComponent('BannerViewDemo', () => BannerViewDemo);
