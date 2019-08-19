import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, NavigationInjectedProps } from 'react-navigation';

import ToggleButton from '../components/atoms/ToggleButton';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import { NavStyle, Colors } from '../Styles';

const navigationOptions = (props:NavigationInjectedProps) => { return {
  title: 'SmokeLess',
  headerStyle: NavStyle.header,
  headerTitleStyle: NavStyle.headerTitle,
  headerRight: (
    <ToggleButton
      iconName={'settings'}
      iconStyle={NavStyle.settingsIcon}
      boundingStyle={NavStyle.settingsIconBounding}
      iconSize={26}
      iconColor={Colors.fontColor}
      toggled={false}
      onPress={() => {
        props.navigation.navigate('Settings');
      }}
    />
  )
} };

export default createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
      headerTintColor: Colors.fontColor,
      headerStyle: NavStyle.header,
      headerTitleStyle: NavStyle.headerTitle,
    }
  }
});
