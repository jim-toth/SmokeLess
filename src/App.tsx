import * as React from 'react';
import { View, StatusBar } from 'react-native';
import { Sentry } from 'react-native-sentry';
import Config from 'react-native-config';

import createAppContainer from './navigation/AppContainer';
import { fetchWelcomeCompleted } from './db/SettingsRepository';
import SplashLoader from './components/atoms/SplashLoader';

import { AppStyle, Colors } from './Styles';

Sentry.config(Config.SENTRY_URL).install();

interface IAppState {
  isLoadingComplete: boolean;
  isWelcomeComplete: boolean;
}

export default class App extends React.Component<IAppState> {
  state = {
    isLoadingComplete: false,
    isWelcomeComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <View>
          <StatusBar backgroundColor={Colors.elevation2} barStyle={'light-content'} />
          <SplashLoader
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
          />
        </View>
      );
    } else {
      const AppContainer = createAppContainer(this.state.isWelcomeComplete);
      return (
        <View style={AppStyle.container}>
          <StatusBar backgroundColor={Colors.elevation2} barStyle={'light-content'} />
          <AppContainer />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () : Promise<void> => {
    return Promise.all([
      // Ionicons.loadFont(),
      // Font.loadAsync({
      //   'saira': require('../assets/fonts/Saira-Regular.ttf'),
      //   'saira-bold': require('../assets/fonts/Saira-Bold.ttf'),
      // }),
    ]).then(() => undefined);
  };

  _handleLoadingError = (error:any) => {
    // Reports to Sentry
    console.warn(error);
  };

  _handleFinishLoading = async () => {
    const isWelcomeComplete = await fetchWelcomeCompleted();
    this.setState({ isLoadingComplete: true, isWelcomeComplete });
  };
}
