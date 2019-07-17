import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableNativeFeedback } from 'react-native';

interface IToggleButtonProps {
  iconStyle: any;
  iconSize: number;
  iconColor: string;
  iconName: string;
  toggledIconName?: string;
  text?: string;
  textStyle?: any;
  toggled?: boolean;
  boundingStyle?: any;
  onPress?: (toggled:boolean) => void;
}

export default class ToggleButton extends React.Component<IToggleButtonProps, any> {
  _onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(!this.props.toggled);
    }
  }

  render() {
    const flexStyle:any = {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    };

    let textComponent, boundingStyle;

    if (this.props.text) {
      textComponent = (
        <View>
          <Text style={this.props.textStyle}>{this.props.text}</Text>
        </View>
      );
    }

    if (this.props.boundingStyle) {
      boundingStyle = this.props.boundingStyle;
    } else {
      boundingStyle = {
        width: '100%',
        height: '100%',
        margin: 5
      };
    }

    return (
      <TouchableNativeFeedback
        onPress={this._onPress}
        background={TouchableNativeFeedback.SelectableBackground()}
      >
        <View style={boundingStyle}>
          <View style={flexStyle}>
            {textComponent}
            <View>
              <Ionicons
                name={
                  this.props.toggled && this.props.toggledIconName
                    ? this.props.toggledIconName
                    : this.props.iconName
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
