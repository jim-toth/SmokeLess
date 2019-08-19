import * as React from 'react';
import { View, Text } from 'react-native';

import createAppContainer from './navigation/AppContainer';
import { fetchWelcomeCompleted } from './db/SettingsRepository';
import SplashLoader from './components/atoms/SplashLoader';

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
    if (!this.state.isLoadingComplete) {
      return (
        <SplashLoader
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
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry

    // TODO -> report to sentry
    console.warn(error);
  };

  _handleFinishLoading = async () => {
    const isWelcomeComplete = await fetchWelcomeCompleted();
    this.setState({ isLoadingComplete: true, isWelcomeComplete });
  };
}
