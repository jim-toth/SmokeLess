import React from 'react';
import { Platform, ScrollView, Text, FlatList, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import SlidingUpPanel from 'rn-sliding-up-panel';

import { SmokeLogEntry } from '../../common/SmokeLogEntry';
import CountdownTimerButton from '../../components/CountdownTimerButton';
import ToggleButton from '../../components/ToggleButton';
import {
  createSmokeLogEntry,
  fetchLastSmokeDateTime,
  fetchSmokeLogEntries
} from '../../db/SmokeLogRepository';
import { fetchSettings, updateSettings } from '../../db/SettingsRepository';
import { formatPrettyDate } from '../../util/helpers';

import { styles } from './Styles';

const { height } = Dimensions.get('window');

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

class HomeScreen extends React.Component<NavigationInjectedProps, IHomeScreenState> {
  constructor(props:any) {
    super(props);
    this.state = defaultState
  }
  
  static navigationOptions = (props:NavigationInjectedProps) => { return {
    title: 'SmokeLess',
    headerRight: (
      <ToggleButton
        iconName={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
        iconStyle={styles.settingsIcon}
        iconSize={26}
        iconColor={'black'}
        toggled={false}
        onPress={() => {
          props.navigation.navigate('Settings');
        }}
      />
    )
  } };

  draggableRange:any = { top: height - 80, bottom: 64 };

  _panel:any = null;

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
    const nextSmokeDateTime = this.calculateNextSmokeDateTime();
    const expired = (new Date()).getTime() > nextSmokeDateTime.getTime();
    const reminderString = expired
      ? `Your next smoke is right now`
      : `Your next smoke will be at ${formatPrettyDate(nextSmokeDateTime, {shortMonthName: true, timeOnly: true})}`;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <CountdownTimerButton
            until={nextSmokeDateTime}
            onPress={this.onPressLogSmoke}
          />
          <Text style={styles.topContainerText}>{reminderString}</Text>
        </View>
        <SlidingUpPanel
          ref={c => this._panel = c}
          draggableRange={this.draggableRange}
        >
          {dragHandler => (
            <View style={styles.bottomContainer}>
              <View style={styles.bottomContainerTitleHandle} {...dragHandler}>
                <Text>
                  You last had a smoke on {formatPrettyDate(this.state.lastSmokeDateTime, {shortMonthName: true})}
                </Text>
              </View>
              <ScrollView style={styles.logContainer}>
                <FlatList
                  data={this._getSafeSmokeLogEntries()}
                  renderItem={({item}) => {
                    const cheatedIcon = item.cheated ? 'close-circle' : 'checkmark-circle';
                    const iconColor = { color: item.cheated ? 'red' : 'green' };
                    return (
                      <View style={styles.logEntryWrapper}>
                        <Ionicons
                          name={
                            Platform.OS === 'ios'
                              ? `ios-${cheatedIcon}`
                              : `md-${cheatedIcon}`
                          }
                          size={26}
                          style={[styles.logIcon, iconColor]}
                        />
                        <Text style={styles.logText}>
                          {formatPrettyDate(item.timestamp)}
                        </Text>
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => { item; return index.toString();} }
                />
              </ScrollView>
            </View>
          )}
        </SlidingUpPanel>
      </View>
    );
  }
}

export default withNavigation(HomeScreen);
