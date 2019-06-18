import React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import sanitizeLastNonNumericChar from '../util/helpers';
import { fetchSettings, updateSettings, resetSettings } from '../db/SettingsRepository';
import { resetSmokeLog } from '../db/SmokeLogRepository';

interface ISettingsScreenState {
  durationBetweenSmokes?: string;
  durationIncrease?: string;
}

const defaultState:ISettingsScreenState = {
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
    await this._fetchAndSetSettings();
  }

  async _fetchAndSetSettings() {
    const settings = await fetchSettings();
    this.setState(settings);
  }

  _setDurationBetweenSmokes = (durationBetweenSmokes:string) => {
    durationBetweenSmokes = sanitizeLastNonNumericChar(durationBetweenSmokes);
    this.setState({ durationBetweenSmokes });
  }

  _setIncreaseBetweenSmokes = (durationIncrease:string) => {
    durationIncrease = sanitizeLastNonNumericChar(durationIncrease);
    this.setState({ durationIncrease });
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
    await this._fetchAndSetSettings();
  }

  render() {
    return (
      <View style={{padding:10}}>
        <Text>Duration Between Smokes (minutes)</Text>
        <TextInput
          placeholder="90"
          autoCorrect={false}
          keyboardType="numeric"
          onChangeText={this._setDurationBetweenSmokes}
          value={this.state.durationBetweenSmokes}>
        </TextInput>

        <Text>Duration Increase Between Smokes (minutes)</Text>
        <TextInput
          placeholder="1"
          autoCorrect={false}
          keyboardType="numeric"
          onChangeText={this._setIncreaseBetweenSmokes}
          value={this.state.durationIncrease}>
        </TextInput>

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
