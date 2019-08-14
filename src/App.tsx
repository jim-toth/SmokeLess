import * as React from 'react';
import { View } from 'react-native';
import { AppLoading, Font } from 'expo';

import createAppContainer from './navigation/AppContainer';
import { fetchWelcomeCompleted } from './db/SettingsRepository';

import { AppStyle } from './Styles';

interface IAppProps {
  skipLoadingScreen?: boolean;
}

interface IAppState {
  isLoadingComplete: boolean;
  isWelcomeComplete: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {
  state = {
    isLoadingComplete: false,
    isWelcomeComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      const AppContainer = createAppContainer(this.state.isWelcomeComplete);
      return (
        <View style={AppStyle.container}>
          {/* {Platform.OS === 'ios' && <StatusBar barStyle="default" />} */}
          <AppContainer />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    Promise.all([
      fetchWelcomeCompleted(),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        // ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        // 'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      })
    ]).then((res) => {
      this.setState({ isWelcomeComplete: res[0] })
      return null;
    });
  };

  _handleLoadingError = (error:any) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
