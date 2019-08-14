import { StyleSheet } from 'react-native';

import { Colors } from '../../Styles';
import { styles as settingsStyles } from '../SettingsScreen/Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
    padding: 25,
    backgroundColor: Colors.backgroundColor
  },
  bodyTitleText: {
    marginTop: 50,
    color: Colors.fontColor
  },
  bodyText: {
    color: Colors.fontColor
  },
  inputContainer: {},
  durationSliderContainer: settingsStyles.durationSliderContainer,
  durationSliderText: settingsStyles.durationSliderText,
  increaseSliderContainer: settingsStyles.increaseSliderContainer,
  increaseSliderText: settingsStyles.increaseSliderText,
});

export { styles }
