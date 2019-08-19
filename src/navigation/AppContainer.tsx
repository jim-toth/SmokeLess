import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainNavigator from './MainNavigator';
import WelcomeNavigator from './WelcomeNavigator';

export default (isWelcomeComplete:boolean) => { return createAppContainer(createSwitchNavigator(
  {
    Main: MainNavigator,
    Welcome: WelcomeNavigator
  },{
    initialRouteName: isWelcomeComplete ? 'Main' : 'Welcome'
  }
))};
