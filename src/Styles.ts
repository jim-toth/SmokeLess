import { StyleSheet } from 'react-native';

export const Colors = {
  backgroundColor:        '#000000', // black
  backgroundColor1:       'rgb(18,18,18)', // elevation 1
  backgroundColor2:       'rgb(34,34,34)', // elevation 2
  fontColor:              '#FFFFFF', // white
  minimumSliderTintColor: '#FF0000', // red
  maximumSliderTintColor: '#00FFFF', // blue
}

export const Fonts = {
  appFont: 'Saira-Regular',
  boldAppFont: 'Saira-Bold'
}

export const AppStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    color: Colors.fontColor
  }
});

export const NavStyle = StyleSheet.create({
  header: {
    backgroundColor: Colors.backgroundColor1,
    fontFamily: Fonts.appFont
  },
  headerTitle: {
    color: Colors.fontColor,
    fontFamily: Fonts.appFont,
    // NB: fontWeight 200 is important or it will fall back on default font
    fontWeight: '200'
  },
  settingsIcon: {
    
    color: Colors.fontColor
  },
  settingsIconBounding: {
    marginRight: 15
  }
});
