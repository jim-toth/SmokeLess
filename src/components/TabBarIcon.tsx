import * as React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import { Ionicons } from '@expo/vector-icons'

import Colors from '../constants/Colors';

interface ITabBarIcon {
  name: string;
  focused: boolean;
  style?: any;
}

export default class TabBarIcon extends React.Component<ITabBarIcon, any> {
  render() {
    const style = this.props.style ? this.props.style : { marginBottom: -3 };
    return (
      <Ionicons
        name={this.props.name}
        size={26}
        style={style}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}