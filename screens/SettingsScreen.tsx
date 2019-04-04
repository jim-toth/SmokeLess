import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import sanitizeLastNonNumericChar from '../util/helpers';
import { fetchSettings, updateSettings } from '../db/SettingsRepository';

interface ISettingsScreenState {
  durationBetweenSmokes?: string;
  durationIncrease?: string;
}

export default class SettingsScreen extends React.Component<any, ISettingsScreenState> {
  static navigationOptions = {
    title: 'Settings',
  };

  constructor(props:any) {
    super(props);
  }

  async componentDidMount() {
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
      </View>
    );
  }
}
