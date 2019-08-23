import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Styles';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.elevation0
  },

  /* Duration Slider */
  durationSliderContainer: {
    width: '85%'
  },
  durationSliderText: {
    color: Colors.font,
    fontFamily: Fonts.primary
  },

  /* Increase Slider */
  increaseSliderContainer: {
    width: '85%'
  },
  increaseSliderText: {
    color: Colors.font,
    fontFamily: Fonts.primary
  },
});

const buttons = StyleSheet.create({
  // Save
  saveText: {
    color: 'green',
    fontFamily: Fonts.bold
  },
  saveFlex: {
    padding: 5,
    alignItems: 'center'
  },
  saveBounding: {
    width: '50%',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 4
  },

  // Reset
  resetText: {
    color: 'red',
    fontFamily: Fonts.bold
  },
  resetFlex: {
    padding: 5,
    alignItems: 'center'
  },
  resetBounding: {
    width: '50%',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 4
  }
});

export { styles, buttons }
