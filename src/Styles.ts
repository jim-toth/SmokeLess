import { StyleSheet } from 'react-native';

export const Colors = {
  elevation0:        '#121212',
  elevation1:        '#24252D',
  elevation2:        '#373A44',
  accent:            '#FF0366', // neon magenta
  accentBackground:  '#3A2233', // neon magenta on black
  font:              '#FFFFFF', // white
  minimumSliderTint: '#FF0000', // red
  maximumSliderTint: '#00FFFF', // blue
}

export const Fonts = {
  primary: 'Saira-Regular',
  bold: 'Saira-Bold'
}

export const AppStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.elevation0,
    color: Colors.font
  }
});

export const NavStyle = StyleSheet.create({
  header: {
    backgroundColor: Colors.elevation2,
    fontFamily: Fonts.primary
  },
  headerTitle: {
    color: Colors.font,
    fontFamily: Fonts.primary,
    // NB: fontWeight 200 is important or it will fall back on default font
    fontWeight: '200'
  },
  settingsIcon: {
    
    color: Colors.font
  },
  settingsIconBounding: {
    marginRight: 15
  }
});
