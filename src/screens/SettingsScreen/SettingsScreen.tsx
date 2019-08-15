import React from 'react';
import { View, Text, Button, Alert, Slider } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

import CustomButton from '../../components/CustomButton';
import { fetchSettings, updateSettings, resetSettings } from '../../db/SettingsRepository';
import { resetSmokeLog } from '../../db/SmokeLogRepository';
import { Colors } from '../../Styles';
import Values from '../../constants/Values';

import { styles, buttons } from './Styles';

interface ISettingsScreenState {
  durationBetweenSmokes?: number;
  displayDurationBetweenSmokes?: number;
  durationIncrease?: number;
  displayDurationIncrease?: number;
}

const defaultState:ISettingsScreenState = {
  durationBetweenSmokes: Values.defaultDurationBetweenSmokes,
  displayDurationBetweenSmokes: Values.defaultDurationBetweenSmokes,
  durationIncrease: Values.defaultDurationIncrease,
  displayDurationIncrease: Values.defaultDurationIncrease
}

class SettingsScreen extends React.Component<NavigationInjectedProps, ISettingsScreenState> {
  constructor(props:any) {
    super(props);
    this.state = defaultState
  }

  async componentDidMount() {
    await this._fetchData();
  }

  async _fetchData() {
    const settings = await fetchSettings();
    this.setState({
      durationBetweenSmokes: settings.durationBetweenSmokes,
      durationIncrease: settings.durationIncrease,
      displayDurationBetweenSmokes: settings.durationBetweenSmokes,
      displayDurationIncrease: settings.durationIncrease
    });
  }

  _setDurationBetweenSmokes = async (durationBetweenSmokes:number) => {
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

  _onSavePressed = async () => {
    await updateSettings({
      durationIncrease: this.state.durationIncrease,
      durationBetweenSmokes: this.state.durationBetweenSmokes
    });
  }

  _onResetPressed = async () => {
    Alert.alert(
      'Reset App',
      'This will reset ALL of your data for the app.  Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => this._onResetConfirmed() }
      ]
    );
  }

  _onResetConfirmed = async () => {
    await resetSmokeLog();
    await resetSettings();
    await this.props.navigation.navigate('Welcome');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.durationSliderContainer}>
          <Text style={styles.durationSliderText}>
            Duration Between Smokes (minutes): {this.state.displayDurationBetweenSmokes}
          </Text>
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
          <Text style={styles.increaseSliderText}>
            Increase Between Smokes (minutes): {this.state.displayDurationIncrease}
          </Text>
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
          onPress={this._onSavePressed}
          text="Save"
          textStyle={buttons.saveText}
          flexStyle={buttons.saveFlex}
          boundingStyle={buttons.saveBounding}
          rippleColor={buttons.saveText.color}
        />

        <CustomButton
          onPress={this._onResetPressed}
          text="Reset"
          textStyle={buttons.resetText}
          flexStyle={buttons.resetFlex}
          boundingStyle={buttons.resetBounding}
          rippleColor={buttons.resetText.color}
        />
      </View>
    );
  }
}

export default withNavigation(SettingsScreen);
