import React from 'react';
import { View, Text, Button, Alert, Slider } from 'react-native';

import { fetchSettings, updateSettings, resetSettings } from '../db/SettingsRepository';
import { resetSmokeLog } from '../db/SmokeLogRepository';
import Values from '../constants/Values';
import Colors from '../constants/Colors';

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

export default class SettingsScreen extends React.Component<any, ISettingsScreenState> {
  static navigationOptions = {
    title: 'Settings',
  };

  constructor(props:any) {
    super(props);
    this.state = defaultState
  }

  async componentDidMount() {
    await this._fetchData();
  }

  // async componentDidUpdate() {
  //   await this._fetchData();
  // }

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
      <View style={{padding:10}}>
        <View>
          <Text>Duration Between Smokes (minutes): {this.state.displayDurationBetweenSmokes}</Text>
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

        <View>
          <Text>Duration Increase Between Smokes (minutes): {this.state.displayDurationIncrease}</Text>
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

        <Button
          onPress={this._onSavePressed}
          title="Save">
        </Button>

        <Button
          onPress={this._onResetPressed}
          title="Reset">
        </Button>
      </View>
    );
  }
}
