import React from 'react';
import { View, Alert } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

import CustomButton from '../../components/atoms/CustomButton';
import ButtonSlider from '../../components/molecules/ButtonSlider';
import { fetchSettings, updateSettings, resetSettings } from '../../db/SettingsRepository';
import { resetSmokeLog } from '../../db/SmokeLogRepository';
import { Colors } from '../../Styles';
import Values from '../../constants/Values';

import { styles, buttons } from './Styles';

interface ISettingsScreenState {
  durationBetweenSmokes?: number;
  durationIncrease?: number;
}

const defaultState:ISettingsScreenState = {
  durationBetweenSmokes: Values.defaultDurationBetweenSmokes,
  durationIncrease: Values.defaultDurationIncrease
}

class SettingsScreen extends React.Component<NavigationInjectedProps, ISettingsScreenState> {
  constructor(props:any) {
    super(props);
    this.state = defaultState
  }

  async componentDidMount() {
    await this._fetchData();
  }

  async _fetchData() {
    const settings = await fetchSettings();
    this.setState({
      durationBetweenSmokes: settings.durationBetweenSmokes,
      durationIncrease: settings.durationIncrease
    });
  }

  _setDurationBetweenSmokes = (durationBetweenSmokes:number) => {
    this.setState({ durationBetweenSmokes });
  }

  _setDurationIncrease = (durationIncrease:number) => {
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
    await this.props.navigation.navigate('Welcome');
  }

  render() {
    return (
      <View style={styles.container}>
        <ButtonSlider
          minimumValue={Values.minimumDurationBetweenSmokes}
          maximumValue={Values.maximumDurationBetweenSmokes}
          value={this.state.durationBetweenSmokes}
          onValueSelected={this._setDurationBetweenSmokes}
          step={1}
          text={'Duration Between Smokes (minutes):'}
          containerStyle={styles.durationSliderContainer}
          textStyle={styles.durationSliderText}
          minimumTrackTintColor={Colors.minimumSliderTintColor}
          maximumTrackTintColor={Colors.maximumSliderTintColor}
          buttonColor={Colors.fontColor}
        />

        <ButtonSlider
          minimumValue={Values.minimumDurationIncrease}
          maximumValue={Values.maximumDurationIncrease}
          value={this.state.durationIncrease}
          onValueSelected={this._setDurationIncrease}
          step={1}
          text={'Increase Between Smokes (minutes):'}
          containerStyle={styles.increaseSliderContainer}
          textStyle={styles.increaseSliderText}
          minimumTrackTintColor={Colors.minimumSliderTintColor}
          maximumTrackTintColor={Colors.maximumSliderTintColor}
          buttonColor={Colors.fontColor}
        />

        <CustomButton
          onPress={this._onSavePressed}
          text="Save"
          textStyle={buttons.saveText}
          flexStyle={buttons.saveFlex}
          boundingStyle={buttons.saveBounding}
          rippleColor={buttons.saveText.color}
        />

        <CustomButton
          onPress={this._onResetPressed}
          text="Reset"
          textStyle={buttons.resetText}
          flexStyle={buttons.resetFlex}
          boundingStyle={buttons.resetBounding}
          rippleColor={buttons.resetText.color}
        />
      </View>
    );
  }
}

export default withNavigation(SettingsScreen);
