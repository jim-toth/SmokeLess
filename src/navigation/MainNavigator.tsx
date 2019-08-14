import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';

export default createStackNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen
});
