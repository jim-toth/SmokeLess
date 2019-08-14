import { StyleSheet } from 'react-native';
import { Colors } from '../../Styles';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundColor
  },

  /* Duration Slider */
  durationSliderContainer: {},
  durationSliderText: {
    color: Colors.fontColor
  },

  /* Increase Slider */
  increaseSliderContainer: {},
  increaseSliderText: {
    color: Colors.fontColor
  },
});

export { styles }
