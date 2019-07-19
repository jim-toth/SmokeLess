import React from 'react';
import { Text, View } from 'react-native';

import { fetchWelcomeCompleted } from '../db/SettingsRepository';

export default class LoadingScreen extends React.Component {

  constructor(props:any) {
    super(props);
    this._checkWelcomeFlag();
  }

  _checkWelcomeFlag = async () => {
    let isWelcomeComplete = await fetchWelcomeCompleted();
    if (isWelcomeComplete) {
      console.log('welcome complete, navigating to Main')
      this.props.navigation.navigate('Main');
    } else {
      console.log('welcome incomplete, navigating to Welcome')
      this.props.navigation.navigate('Welcome');
    }
  }

  render() {
    return (
      <View style={{ height: '100%' }}>
        <View style={{ height: '40%' }}></View>
        <Text style={{ marginLeft: 25 }}>LOADING</Text>
      </View>
    );
  }
}