import React from 'react';
import { Platform, ScrollView, Text, FlatList, View, Dimensions, Animated } from 'react-native';
// import { AdMobInterstitial } from 'expo-ads-admob'; // TODO -> fix admob dependency
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Icon from 'react-native-ionicons';
import SplashScreen from 'react-native-splash-screen';
import { AdMobInterstitial } from 'react-native-admob';

import { SmokeLogEntry } from '../../common/SmokeLogEntry';
import CountdownTimerButton from '../../components/atoms/CountdownTimerButton';
import {
  createSmokeLogEntry,
  fetchLastSmokeDateTime,
  fetchSmokeLogEntries
} from '../../db/SmokeLogRepository';
import { fetchSettings, updateSettings } from '../../db/SettingsRepository';
import { formatPrettyDate } from '../../util/helpers';
import getEnvVars from '../../../env';

import { styles } from './Styles';

const env = getEnvVars();

const { height } = Dimensions.get('window');

interface IHomeScreenState {
  lastSmokeDateTime: Date | null;
  durationBetweenSmokes?: number;
  durationIncrease?: number;
  smokeLogEntries?: SmokeLogEntry[];
  drawerOpen: boolean;
}

const defaultState:IHomeScreenState = {
  lastSmokeDateTime: null,
  durationBetweenSmokes: 60,
  durationIncrease: 5,
  drawerOpen: false
};

class HomeScreen extends React.Component<NavigationInjectedProps, IHomeScreenState> {
  constructor(props:any) {
    super(props);
    this.state = defaultState
  }

  _panel:any = null;
  draggableRange:any = { top: height - 80, bottom: 64 };
  animatedValue = new Animated.Value(this.draggableRange.bottom);

  async componentDidMount() {
    this.animatedValue.addListener(({value}) => {
      if (this.state.drawerOpen && value === this.draggableRange.bottom) {
        this.setState({ drawerOpen: false });
      } else if (!this.state.drawerOpen && value !== this.draggableRange.bottom) {
        this.setState({ drawerOpen: true });
      }
    });
    this.props.navigation.addListener('willFocus', async () => {
      await this._fetchData();
    });
    this._setUpAdMob();
    await this._fetchData();
    SplashScreen.hide();
  }

  componentWillUnmount() {
    this.animatedValue.removeAllListeners();
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

  async _refreshSettings() {
    this.setState(await fetchSettings());
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

    await this._showAfterSmokeAd();

    this.setState({
      lastSmokeDateTime: smokeTimestamp,
      durationBetweenSmokes: newDurationBetweenSmokes,
      smokeLogEntries
    });
  }

  _setUpAdMob = () => {
    if (env.enableAds) {
      // TODO -> Sentry error logging for Ads
      if (env.dev) {
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
      }
      AdMobInterstitial.setAdUnitID(env.adMob.afterSmokeAdId);
    }
  }

  _showAfterSmokeAd = async () => {
    if (env.enableAds) {
      // TODO -> Sentry error logging for Ads
      await AdMobInterstitial.requestAd();
      await AdMobInterstitial.showAd();
    }
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

  render() {
    const nextSmokeDateTime = this.calculateNextSmokeDateTime();
    const expired = (new Date()).getTime() > nextSmokeDateTime.getTime();
    const reminderString = expired || !this.state.lastSmokeDateTime
      ? `Your next smoke is right now`
      : `Your next smoke will be at ${formatPrettyDate(nextSmokeDateTime, {shortMonthName: true, timeOnly: true})}`;
    const nextSmokeString = !this.state.lastSmokeDateTime
      ? `You haven't logged any smokes yet`
      : `You last had a smoke on ${formatPrettyDate(this.state.lastSmokeDateTime, {shortMonthName: true})}`;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <CountdownTimerButton until={nextSmokeDateTime} onPress={this.onPressLogSmoke} />
          <Text style={styles.topContainerText}>{reminderString}</Text>
        </View>
        <SlidingUpPanel
          ref={c => this._panel = c}
          draggableRange={this.draggableRange}
          animatedValue={this.animatedValue}
        >
          {dragHandler => (
            <View style={styles.bottomContainer}>
              <View style={styles.bottomContainerTitleHandle} {...dragHandler}>
                <Text style={styles.bottomContainerTitleText}>{nextSmokeString}</Text>
                <View style={this.state.drawerOpen ? {display: 'none'} : {display: 'flex'}}>
                  <Icon
                    name={'arrow-dropdown'}
                    size={26}
                    style={styles.dragIcon}
                  />
                </View>
              </View>
              <ScrollView style={styles.logContainer}>
                <FlatList
                  data={this._getSafeSmokeLogEntries()}
                  renderItem={({item}) => {
                    const cheatedIcon = item.cheated ? 'close-circle' : 'checkmark-circle';
                    const iconColor = { color: item.cheated ? 'red' : 'green' };
                    return (
                      <View style={styles.logEntryWrapper}>
                        <Icon
                          name={cheatedIcon}
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
