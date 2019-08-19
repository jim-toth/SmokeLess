import React from 'react';
import { Text, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

import CustomButton from '../../components/atoms/CustomButton';
import ButtonSlider from '../../components/molecules/ButtonSlider';
import { updateWelcomeCompleted, updateSettings } from '../../db/SettingsRepository';
import Values from '../../constants/Values';
import { Colors } from '../../Styles';
import { styles, buttons } from '../SettingsScreen/Styles';
import { styles as welcomeStyles } from './Styles';

interface IWelcomeScreenState {
  durationBetweenSmokes?: number;
  durationIncrease?: number;
}

const defaultState:IWelcomeScreenState = {
  durationBetweenSmokes: Values.defaultDurationBetweenSmokes,
  durationIncrease: Values.defaultDurationIncrease
}

class WelcomeScreen extends React.Component<NavigationInjectedProps,IWelcomeScreenState> {
  constructor(props:any) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount() {
    SplashScreen.hide();
  }
  
  onFinishedPressed = async () => {
    await updateWelcomeCompleted(true);
    await updateSettings({
      durationBetweenSmokes: this.state.durationBetweenSmokes,
      durationIncrease: this.state.durationIncrease
    });
    await this.props.navigation.navigate('Main');
  }

  _setDurationBetweenSmokes = (durationBetweenSmokes:number) => {
    this.setState({ durationBetweenSmokes });
  }

  _setDurationIncrease = (durationIncrease:number) => {
    this.setState({ durationIncrease });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={welcomeStyles.bodyTitleText}>
          Welcome to SmokeLess!
        </Text>
        <Text style={welcomeStyles.bodyText}>
          To get started, enter how often you smoke
          and the duration increase between smokes you'd like to track.
        </Text>
        
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
          onPress={this.onFinishedPressed}
          text="Done"
          textStyle={buttons.saveText}
          flexStyle={buttons.saveFlex}
          boundingStyle={buttons.saveBounding}
          rippleColor={buttons.saveText.color}
        />
      </View>
    );
  }
}

export default withNavigation(WelcomeScreen);
