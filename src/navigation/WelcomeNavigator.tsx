import { createStackNavigator } from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';

export default createStackNavigator(
  {
    Welcome: WelcomeScreen
  },
  {
    headerMode: 'none'
  }
);
