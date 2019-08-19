import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';

interface ICustomButtonProps {
  text?: string;
  textStyle?: any;
  flexStyle?: any;
  boundingStyle?: any;
  rippleColor?: string;
  onPress?: () => void;
}

export default class CustomButton extends React.Component<ICustomButtonProps,any> {
  baseFlexStyle = {
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center'
  }

  baseBoundingStyle = {
    margin: 5
  }
  
  _onPress = () => {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }

  render() {
    return (
      <TouchableNativeFeedback
        onPress={this._onPress}
        useForeground={true}
        background={TouchableNativeFeedback.Ripple(this.props.rippleColor || 'black', false)}
      >
        <View style={[this.baseBoundingStyle, this.props.boundingStyle]}>
          <View style={[this.baseFlexStyle, this.props.flexStyle]}>
            <Text style={this.props.textStyle}>{this.props.text}</Text>
          </View>              
        </View>
      </TouchableNativeFeedback>
    );
  }
}
