import React from 'react';
import { ScrollView, Text, FlatList, View, Dimensions, Animated } from 'react-native';
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
import Config from '../../util/config';

import { styles } from './Styles';

const { height } = Dimensions.get('window');

const velocity = 500;
const animationConfig = {
  hidePanelSleep: 2000,
  showAdSleep: 1000,
  show: { toValue: 150, velocity },
  hide: { toValue: 0, velocity }
};

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
  draggableRange:any = { top: height - 80, bottom: 90 };
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

    this.setState({
      lastSmokeDateTime: smokeTimestamp,
      durationBetweenSmokes: newDurationBetweenSmokes,
      smokeLogEntries
    }, this._animateLoggingOfSmoke);
  }

  _animateLoggingOfSmoke = async () => {
    // show panel
    this._panel.show(animationConfig.show);

    // wait and hide panel
    setTimeout(() => {
      this._panel.show(animationConfig.hide)

      // wait and show ad
      setTimeout(async () => {
        await this._showAfterSmokeAd();
      }, animationConfig.showAdSleep);

    }, animationConfig.hidePanelSleep);
  }

  _setUpAdMob = () => {
    if (Config.ENABLE_ADS) {
      if (Config.USE_TEST_ADS) {
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
      }
      AdMobInterstitial.setAdUnitID(Config.ADMOB_AFTER_SMOKE_ID);
    }
  }

  _showAfterSmokeAd = async () => {
    if (Config.ENABLE_ADS) {
      await AdMobInterstitial.requestAd();
      await AdMobInterstitial.showAd();
    } else {
      console.log('Skipping after smoke ad because ads are disabled. ');
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
