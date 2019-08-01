import React from 'react';
import { Text, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

import { fetchWelcomeCompleted } from '../db/SettingsRepository';

class LoadingScreen extends React.Component<NavigationInjectedProps> {

  constructor(props:any) {
    super(props);
    this._checkWelcomeFlag();
  }

  _checkWelcomeFlag = async () => {
    let isWelcomeComplete = await fetchWelcomeCompleted();
    if (isWelcomeComplete) {
      this.props.navigation.navigate('Main');
    } else {
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

export default withNavigation(LoadingScreen);
