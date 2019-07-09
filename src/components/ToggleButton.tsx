import * as React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import { Ionicons } from '@expo/vector-icons';
import { Platform, View, Text, TouchableNativeFeedback } from 'react-native';

interface IToggleButtonProps {
  text: string;
  textStyle: any;
  iconStyle: any;
  iconSize: number;
  iconColor: string;
  toggled?: boolean;
  onPress?: (toggled:boolean) => void;
}

export default class ToggleButton extends React.Component<IToggleButtonProps, any> {
  _onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(!this.props.toggled);
    }
  }

  render() {
    const toggleButtonStyle:any = {
      width: '100%',
      height: 75,
      margin: 5,
      borderColor: 'blue',
      borderWidth: 0
    };

    const flexStyle:any = {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    };

    return (
      <TouchableNativeFeedback
        onPress={this._onPress}
        background={TouchableNativeFeedback.SelectableBackground()}
      >
        <View style={toggleButtonStyle}>
          <View style={flexStyle}>
            <View>
              <Text style={this.props.textStyle}>{this.props.text}</Text>
            </View>
            <View>
              <Ionicons
                name={
                  Platform.OS === 'ios'
                    ? `ios-arrow-drop${this.props.toggled ? 'down' : 'right'}`
                    : `md-arrow-drop${this.props.toggled ? 'down' : 'right'}`
                }
                size={this.props.iconSize}
                style={this.props.iconStyle}
                color={this.props.iconColor}
              />
            </View>
          </View>              
        </View>
      </TouchableNativeFeedback>
    );
  }
}
