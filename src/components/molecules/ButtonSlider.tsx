import React from 'react';
import { Platform, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

import ToggleButton from '../atoms/ToggleButton';

interface IButtonSliderProps {
  minimumValue: number;
  maximumValue: number;
  
  value?: number;
  onValueSelected?: (sliderValue:number) => void

  step?: number;
  text?: string
  containerStyle?: any;
  textStyle?: any;
  buttonStyle?: any;
  buttonColor: string;
  buttonIconSize: number;
  showValue?: boolean;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  showButtons?: boolean;
}

interface IButtonSliderState {
  displayValue: number;
  moving?: boolean;
}

export default class ButtonSlider extends React.Component<IButtonSliderProps,IButtonSliderState> {
  static defaultProps = {
    step: 1,
    showValue: true,
    showButtons: true,
    buttonColor: 'black',
    buttonIconSize: 26
  }

  constructor(props:IButtonSliderProps) {
    super(props);
    this.state = {
      displayValue: this.props.value || 0
    }
  }

  static getDerivedStateFromProps(props:IButtonSliderProps, state:IButtonSliderState) {
    if (!state.moving && props.value !== state.displayValue) {
      return {
        displayValue: props.value
      }
    }

    return null;
  }

  _updateDisplay = (displayValue:number) => {
    this.setState({ displayValue, moving: true });
  }

  _setValue = (sliderValue:number) => {
    if (this.props.onValueSelected) {
      this.props.onValueSelected(sliderValue);
    }
    this.setState({ moving: false });
  }

  _removeStep = () => {
    if (this.props.onValueSelected && this.props.value) {
      const newValue = this.props.value - (this.props.step || 1);
      this.setState({ displayValue: newValue }, () => {
        if (this.props.onValueSelected) {
          this.props.onValueSelected(newValue);
        }
      });
    }
  }

  _addStep = () => {
    if (this.props.value) {
      const newValue = this.props.value + (this.props.step || 1);
      this.setState({ displayValue: newValue }, () => {
        if (this.props.onValueSelected) {
          this.props.onValueSelected(newValue);
        }
      });
    }
  }
  
  render() {
    return (
      <View style={{width:'100%'}}>
        {this.props.showValue &&
          <Text style={this.props.textStyle}>
            {this.props.text} {this.state.displayValue}
          </Text>
        }
        <View style={{flexDirection:'row', alignItems: 'center'}}>
          <ToggleButton
            iconName={Platform.OS === 'ios' ? 'ios-remove' : 'md-remove'}
            iconStyle={this.props.buttonStyle}
            iconColor={this.props.buttonColor}
            iconSize={this.props.buttonIconSize}
            onPress={this._removeStep}
          />
          <View style={this.props.containerStyle}>
            <Slider
              minimumValue={this.props.minimumValue}
              maximumValue={this.props.maximumValue}
              minimumTrackTintColor={this.props.minimumTrackTintColor}
              maximumTrackTintColor={this.props.maximumTrackTintColor}
              onValueChange={this._updateDisplay}
              onSlidingComplete={this._setValue}
              step={this.props.step}
              value={this.state.displayValue}
            />
          </View>
          <ToggleButton
            iconName={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
            iconStyle={this.props.buttonStyle}
            iconColor={this.props.buttonColor}
            iconSize={this.props.buttonIconSize}
            onPress={this._addStep}
          />
        </View>
      </View>
    );
  }
}
