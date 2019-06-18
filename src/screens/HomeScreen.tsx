import React from 'react';
import { View } from 'react-native';

import CountdownTimerButton from '../components/CountdownTimerButton';
import {
  createSmokeLogEntry,
  fetchLastSmokeDateTime
} from '../db/SmokeLogRepository';
import { fetchSettings, updateSettings } from '../db/SettingsRepository';

interface IHomeScreenState {
  lastSmokeDateTime: Date;
  durationBetweenSmokes: number;
  durationIncrease: number;
}

const defaultState:IHomeScreenState = {
  lastSmokeDateTime: new Date(),
  durationBetweenSmokes: 60,
  durationIncrease: 5
};

export default class HomeScreen extends React.Component<any, IHomeScreenState> {
  static navigationOptions = {
    title: 'SmokeLess',
  };

  constructor(props:any) {
    super(props);
    this.state = defaultState
  }

  async componentDidMount() {
    const settings = await fetchSettings();
    const lastSmokeDateTime = new Date(await fetchLastSmokeDateTime());
    const durationBetweenSmokes = settings.durationBetweenSmokes ? parseFloat(settings.durationBetweenSmokes) : 0;
    const durationIncrease = settings.durationIncrease ? parseFloat(settings.durationIncrease) : 0;
    this.setState({ lastSmokeDateTime, durationBetweenSmokes, durationIncrease });
  }

  onPressLogSmoke = async (pressedBeforeTimerExpired: boolean) => {
    let smokeTimestamp = new Date();
    let newDurationBetweenSmokes = this.state.durationBetweenSmokes + this.state.durationIncrease;
    this.setState({
      lastSmokeDateTime: smokeTimestamp,
      durationBetweenSmokes: newDurationBetweenSmokes
    });
    await createSmokeLogEntry(smokeTimestamp, pressedBeforeTimerExpired);
    await updateSettings({
      durationBetweenSmokes: newDurationBetweenSmokes.toString()
    })
  }

  private calculateNextSmokeDateTime() {
    console.log('lastSmokeDateTime', this.state.lastSmokeDateTime);
    if (!this.state.lastSmokeDateTime.getTime) {
      return new Date();
    }
    let nextSmokeDateTime = this.state.lastSmokeDateTime.getTime()
      + (this.state.durationBetweenSmokes * 60 * 1000)
      + (this.state.durationIncrease * 60 * 1000);
    return new Date(nextSmokeDateTime);
  }

  render() {    
    return (
      <View>
        <CountdownTimerButton
          until={this.calculateNextSmokeDateTime()}
          onPress={this.onPressLogSmoke}
        />
      </View>
    );
  }
}
