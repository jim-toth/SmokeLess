import React from 'react';
import { View, Text } from 'react-native';

import CountdownTimerButton from '../components/CountdownTimerButton';
import {
  createSmokeLogEntry,
  fetchLastSmokeDateTime
} from '../db/SmokeLogRepository';
import { fetchSettings, updateSettings } from '../db/SettingsRepository';
import { formatPrettyDate } from '../util/helpers';

interface IHomeScreenState {
  lastSmokeDateTime: Date | null;
  durationBetweenSmokes: number;
  durationIncrease: number;
}

const defaultState:IHomeScreenState = {
  lastSmokeDateTime: null,
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
    await this._fetchData();
  }

  async componentDidUpdate() {
    await this._fetchData();
  }

  async _fetchData() {
    const settings = await fetchSettings();
    const fetchedLastSmokeDateTime = await fetchLastSmokeDateTime();
    const lastSmokeDateTime = fetchedLastSmokeDateTime ? new Date(fetchedLastSmokeDateTime) : null;
    const durationBetweenSmokes = settings.durationBetweenSmokes ? parseFloat(settings.durationBetweenSmokes) : 0;
    const durationIncrease = settings.durationIncrease ? parseFloat(settings.durationIncrease) : 0;
    this.setState({ lastSmokeDateTime, durationBetweenSmokes, durationIncrease });
  }

  onPressLogSmoke = async (isExpired: boolean) => {
    let smokeTimestamp = new Date();
    let newDurationBetweenSmokes = this.state.durationBetweenSmokes + this.state.durationIncrease;
    this.setState({
      lastSmokeDateTime: smokeTimestamp,
      durationBetweenSmokes: newDurationBetweenSmokes
    });

    await createSmokeLogEntry(smokeTimestamp, !isExpired);
    await updateSettings({
      durationBetweenSmokes: newDurationBetweenSmokes.toString()
    })
  }

  private calculateNextSmokeDateTime() {
    if (!this.state.lastSmokeDateTime) {
      return new Date();
    }
    let nextSmokeDateTime = this.state.lastSmokeDateTime.getTime()
      + (this.state.durationBetweenSmokes * 60 * 1000)
      + (this.state.durationIncrease * 60 * 1000);
    return new Date(nextSmokeDateTime);
  }

  render() {    
    return (
      <View style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
        <View style={{ height: '45%' }}></View>
        <View style={{ alignSelf: 'center', width: '80%' }}>
          <CountdownTimerButton
            until={this.calculateNextSmokeDateTime()}
            onPress={this.onPressLogSmoke}
          />
          <Text style={{ alignSelf: 'center' }}>until next smoke</Text>
        </View>
        <View style={{ height: '35%' }}></View>
        <View style={{ alignSelf: 'center' }}>
          <Text>You last had a smoke on {formatPrettyDate(this.state.lastSmokeDateTime)}</Text>
        </View>
      </View>
    );
  }
}
