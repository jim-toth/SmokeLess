import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoadingScreen from '../screens/LoadingScreen/LoadingScreen';
import MainNavigator from './MainNavigator';
import WelcomeNavigator from './WelcomeNavigator';

export default createAppContainer(createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Main: MainNavigator,
    Welcome: WelcomeNavigator
  },{
    initialRouteName: 'Loading'
  }
));
