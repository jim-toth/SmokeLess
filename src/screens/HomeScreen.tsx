import React from 'react';
import moment from 'moment';
import {
  Button,
  Text,
  View
} from 'react-native';
import {
  createSmokeLogEntry,
  fetchLastSmokeDateTime
} from '../db/SmokeLogRepository';
import { fetchSettings, updateSettings } from '../db/SettingsRepository';

interface IHomeScreenState {
  lastSmokeDateTime: Date;
}

const defaultState:IHomeScreenState = {
  lastSmokeDateTime: new Date()
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
    const lastSmokeDateTime = await fetchLastSmokeDateTime();
    this.setState({ lastSmokeDateTime });
  }

  private async onPressLogSmoke() {
    let smokeTimestamp = new Date();
    this.setState({ lastSmokeDateTime: smokeTimestamp });
    await createSmokeLogEntry(smokeTimestamp);
  }

  private calculateDuration() : string {
    let now = moment();
    let last = moment(this.state.lastSmokeDateTime).subtract(1, 'days');
    let durr = moment.duration(now.diff(last));

    let d = durr.days();
    let h = (durr.hours() + (d * 24)).toString();
    if (h.length === 1) {
      h = '0' + h;
    }
    let m = durr.minutes().toString();
    if (m.length === 1) {
      m = '0' + m;
    }
    let s = durr.seconds().toString();
    if (s.length === 1) {
      s = '0' + s;
    }
    let duration = `${h}:${m}:${s}`;

    return duration;
  }

  render() {
    let durationString = this.calculateDuration();
    return (
      <View>
        <Button
          title={durationString}
          onPress={this.onPressLogSmoke}>
        </Button>
        <Text>until next smoke</Text>
      </View>
    );
  }
}
