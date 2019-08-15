import React from 'react';
import { Text, View, Button, Slider } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

import CustomButton from '../../components/CustomButton';
import { updateWelcomeCompleted, updateSettings } from '../../db/SettingsRepository';
import Values from '../../constants/Values';
import { Colors } from '../../Styles';
import { styles, buttons } from '../SettingsScreen/Styles';
import { styles as welcomeStyles } from './Styles';

interface IWelcomeScreenState {
  durationBetweenSmokes?: number;
  displayDurationBetweenSmokes?: number;
  durationIncrease?: number;
  displayDurationIncrease?: number;
}

const defaultState:IWelcomeScreenState = {
  durationBetweenSmokes: Values.defaultDurationBetweenSmokes,
  displayDurationBetweenSmokes: Values.defaultDurationBetweenSmokes,
  durationIncrease: Values.defaultDurationIncrease,
  displayDurationIncrease: Values.defaultDurationIncrease
}

class WelcomeScreen extends React.Component<NavigationInjectedProps,IWelcomeScreenState> {
  constructor(props:any) {
    super(props);
    this.state = defaultState;
  }
  
  onFinishedPressed = async () => {
    await updateWelcomeCompleted(true);
    await updateSettings({
      durationBetweenSmokes: this.state.durationBetweenSmokes,
      durationIncrease: this.state.durationIncrease
    });
    await this.props.navigation.navigate('Main');
  }

  _setDurationBetweenSmokes = (durationBetweenSmokes:number) => {
    this.setState({ durationBetweenSmokes });
  }

  _updateDisplayDurationBetweenSmokes = (displayDurationBetweenSmokes:number) => {
    this.setState({ displayDurationBetweenSmokes });
  }

  _setDurationIncrease = (durationIncrease:number) => {
    this.setState({ durationIncrease });
  }

  _updateDisplayDurationIncrease = (displayDurationIncrease:number) => {
    this.setState({ displayDurationIncrease });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={welcomeStyles.bodyTitleText}>
          Welcome to SmokeLess!
        </Text>
        <Text style={welcomeStyles.bodyText}>
          To get started, enter how often you smoke
          and the duration increase between smokes you'd like to track.
        </Text>
        <View style={styles.durationSliderContainer}>
          <Text style={styles.durationSliderText}>Duration Between Smokes (minutes): {this.state.displayDurationBetweenSmokes}</Text>
          {/* TODO -> Step decrease button */}
          <Slider
            minimumValue={Values.minimumDurationBetweenSmokes}
            maximumValue={Values.maximumDurationBetweenSmokes}
            minimumTrackTintColor={Colors.minimumSliderTintColor}
            maximumTrackTintColor={Colors.maximumSliderTintColor}
            onValueChange={this._updateDisplayDurationBetweenSmokes}
            onSlidingComplete={this._setDurationBetweenSmokes}
            step={1}
            value={this.state.displayDurationBetweenSmokes}
          />
          {/* TODO -> Step increase button */}
        </View>

        <View style={styles.increaseSliderContainer}>
          <Text style={styles.increaseSliderText}>Increase Between Smokes (minutes): {this.state.displayDurationIncrease}</Text>
          {/* TODO -> Step decrease button */}
          <Slider
            minimumValue={Values.minimumDurationIncrease}
            maximumValue={Values.maximumDurationIncrease}
            minimumTrackTintColor={Colors.minimumSliderTintColor}
            maximumTrackTintColor={Colors.maximumSliderTintColor}
            onValueChange={this._updateDisplayDurationIncrease}
            onSlidingComplete={this._setDurationIncrease}
            step={1}
            value={this.state.displayDurationIncrease}
          />
          {/* TODO -> Step increase button */}
        </View>

        <CustomButton
          onPress={this.onFinishedPressed}
          text="Done"
          textStyle={buttons.saveText}
          flexStyle={buttons.saveFlex}
          boundingStyle={buttons.saveBounding}
          rippleColor={buttons.saveText.color}
        />
      </View>
    );
  }
}

export default withNavigation(WelcomeScreen);
