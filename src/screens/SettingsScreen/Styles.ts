import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Styles';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColor
  },

  /* Duration Slider */
  durationSliderContainer: {
    width: '80%'
  },
  durationSliderText: {
    color: Colors.fontColor,
    fontFamily: Fonts.appFont
  },

  /* Increase Slider */
  increaseSliderContainer: {
    width: '80%'
  },
  increaseSliderText: {
    color: Colors.fontColor,
    fontFamily: Fonts.appFont
  },
});

const buttons = StyleSheet.create({
  // Save
  saveText: {
    fontWeight: 'bold',
    color: 'green',
    fontFamily: Fonts.appFont
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
    fontWeight: 'bold',
    color: 'red',
    fontFamily: Fonts.appFont
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
