import React from 'react';
import { Platform, ScrollView, Text, FlatList, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import { SmokeLogEntry } from '../common/SmokeLogEntry';
import CountdownTimerButton from '../components/CountdownTimerButton';
import ToggleButton from '../components/ToggleButton';
import {
  createSmokeLogEntry,
  fetchLastSmokeDateTime,
  fetchSmokeLogEntries
} from '../db/SmokeLogRepository';
import { fetchSettings, updateSettings } from '../db/SettingsRepository';
import { formatPrettyDate } from '../util/helpers';
import {  } from 'react-navigation';

interface IHomeScreenState {
  lastSmokeDateTime: Date | null;
  durationBetweenSmokes?: number;
  durationIncrease?: number;
  smokeLogEntries?: SmokeLogEntry[];
  logListVisible: boolean;
}

const defaultState:IHomeScreenState = {
  lastSmokeDateTime: null,
  durationBetweenSmokes: 60,
  durationIncrease: 5,
  logListVisible: false
};

export default class HomeScreen extends React.Component<any, IHomeScreenState> {
  // tslint:disable-next-line
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'SmokeLess',
      headerRight: (
        <ToggleButton
          iconName={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
          iconStyle={{ margin: 5, marginLeft: 15, color: 'black' }}
          iconSize={26}
          iconColor={'black'}
          toggled={false}
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
      )
    };
  };

  constructor(props:any) {
    super(props);
    this.state = defaultState
  }

  async componentDidMount() {
    await this._fetchData();
  }

  async _fetchData() {
    const settings = await fetchSettings();
    const fetchedLastSmokeDateTime = await fetchLastSmokeDateTime();
    const lastSmokeDateTime = fetchedLastSmokeDateTime ? new Date(fetchedLastSmokeDateTime) : null;
    const durationBetweenSmokes = settings.durationBetweenSmokes;
    const durationIncrease = settings.durationIncrease;
    const smokeLogEntries = await fetchSmokeLogEntries();
    this.setState({
      lastSmokeDateTime,
      durationBetweenSmokes,
      durationIncrease,
      smokeLogEntries
    });
  }

  onPressLogSmoke = async (isExpired: boolean) => {
    let smokeTimestamp = new Date();
    let newDurationBetweenSmokes = this.state.durationBetweenSmokes;

    // If first smoke ever, don't add time increase
    if (this.state.smokeLogEntries &&
        this.state.durationIncrease &&
        newDurationBetweenSmokes &&
        this.state.smokeLogEntries.length > 0) {
      newDurationBetweenSmokes += this.state.durationIncrease;
    }

    await createSmokeLogEntry(smokeTimestamp, !isExpired);
    await updateSettings({ durationBetweenSmokes: newDurationBetweenSmokes });
    const smokeLogEntries = await fetchSmokeLogEntries();

    this.setState({
      lastSmokeDateTime: smokeTimestamp,
      durationBetweenSmokes: newDurationBetweenSmokes,
      smokeLogEntries
    });
  }

  private calculateNextSmokeDateTime() {
    if (!this.state.lastSmokeDateTime || !this.state.durationBetweenSmokes) {
      return new Date();
    }
    let nextSmokeDateTime = this.state.lastSmokeDateTime.getTime()
      + (this.state.durationBetweenSmokes * 60 * 1000);
    return new Date(nextSmokeDateTime);
  }

  _getSafeSmokeLogEntries = () => {
    return this.state.smokeLogEntries || null;
  }

  _onLogTogglePress = async () => {
    this.setState({ logListVisible: !this.state.logListVisible });
  }

  render() {
    const logDisplayStyle = this.state.logListVisible ? { width: '100%' } : { width: '100%', display: "none" };

    return (
      <View style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
        <View style={{ height: '10%' }}></View>
        <View style={{ alignSelf: 'center', width: '80%' }}>
          <CountdownTimerButton
            until={this.calculateNextSmokeDateTime()}
            onPress={this.onPressLogSmoke}
          />
          <Text style={{ alignSelf: 'center' }}>until next smoke</Text>
        </View>
        <View style={{ height: '10%' }}></View>
        <View style={{ alignSelf: 'center', width: '100%', alignContent: 'center' }}>
          <ToggleButton
            text={`You last had a smoke on ${formatPrettyDate(this.state.lastSmokeDateTime, true)}`}
            textStyle={{ paddingLeft: 5, paddingTop: 15, paddingBottom: 15 }}
            iconStyle={{ margin: 5, marginLeft: 15, color: 'black' }}
            iconSize={26}
            iconColor={'black'}
            iconName={
              Platform.OS === 'ios'
                ? 'ios-arrow-dropright'
                : 'md-arrow-dropright'
            }
            toggledIconName={
              Platform.OS === 'ios'
                ? 'ios-arrow-dropdown'
                : 'md-arrow-dropdown'
            }
            boundingStyle={{
              width: '100%',
              height: 75,
              margin: 5
            }}
            toggled={this.state.logListVisible}
            onPress={this._onLogTogglePress}
          />
        </View>
        <ScrollView style={logDisplayStyle}>
          <FlatList
            data={this._getSafeSmokeLogEntries()}
            renderItem={({item}) => {
              const focused = false;
              const cheatedIcon = item.cheated ? 'close-circle' : 'checkmark-circle';
              const cheatedBackground = item.cheated ? 'red' : 'green';
              const iconStyle = { margin: 5, color: cheatedBackground };
              return (
                <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                  <Ionicons
                    name={
                      Platform.OS === 'ios'
                        ? `ios-${cheatedIcon}${focused ? '' : '-outline'}`
                        : `md-${cheatedIcon}`
                    }
                    size={26}
                    style={iconStyle}
                    color={'black'}
                  />
                  <Text style={{ fontSize: 16, textAlignVertical: 'center' }}>{formatPrettyDate(item.timestamp)}</Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}>
          </FlatList>
        </ScrollView>
      </View>
    );
  }
}
