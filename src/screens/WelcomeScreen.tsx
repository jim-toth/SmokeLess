import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';

import { updateWelcomeCompleted, updateSettings } from '../db/SettingsRepository';
import { sanitizeLastNonNumericChar } from '../util/helpers';

interface IWelcomeScreenState {
  durationBetweenSmokes?: string;
  durationIncrease?: string;
}

const defaultState:IWelcomeScreenState = {
}

export default class WelcomeScreen extends React.Component<any,IWelcomeScreenState> {
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

  _setDurationBetweenSmokes = (durationBetweenSmokes:string) => {
    durationBetweenSmokes = sanitizeLastNonNumericChar(durationBetweenSmokes);
    this.setState({ durationBetweenSmokes });
  }

  _setIncreaseBetweenSmokes = (durationIncrease:string) => {
    durationIncrease = sanitizeLastNonNumericChar(durationIncrease);
    this.setState({ durationIncrease });
  }

  render() {
    return (
      <View style={{ height: '100%' }}>
        <View style={{ height: '25%' }}></View>
        <Text style={{ marginLeft: 25 }}>
          Welcome to SmokeLess.
        </Text>
        <Text style={{ marginLeft: 25 }}>
          To get started, enter how often you smoke
          and the duration increase between smokes you'd like to track.
        </Text>
        <View style={{ height: '15%' }}></View>
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
        </View>
        <View style={{ height: '15%' }}></View>
        <Button title="Done" onPress={this.onFinishedPressed}></Button>
      </View>
    );
  }
}
