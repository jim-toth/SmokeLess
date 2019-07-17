import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default createStackNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen
});
