import React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import { Ionicons } from '@expo/vector-icons'

import Colors from '../constants/Colors';

interface ITabBarIcon {
  name: string;
  focused: boolean;
}

export default class TabBarIcon extends React.Component<ITabBarIcon, any> {
  render() {
    return (
      <Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}