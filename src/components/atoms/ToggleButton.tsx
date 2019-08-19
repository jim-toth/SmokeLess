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
      justifyContent: 'center',
    };

    const boundingStyle = {
      height: this.props.iconSize,
      width: this.props.iconSize
    };

    let textComponent;
    if (this.props.text) {
      textComponent = (
        <View>
          <Text style={this.props.textStyle}>{this.props.text}</Text>
        </View>
      );
    }

    return (
      <TouchableNativeFeedback
        onPress={this._onPress}
        background={TouchableNativeFeedback.SelectableBackground()}
      >
        <View style={[boundingStyle,this.props.boundingStyle]}>
          <View style={flexStyle}>
            {textComponent}
            <View style={{width:'100%', height:'100%',alignItems:'center',justifyContent:'center'}}>
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
