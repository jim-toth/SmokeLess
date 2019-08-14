import { StyleSheet } from 'react-native';

export const Colors = {
  backgroundColor:        '#000000', // black
  fontColor:              '#FFFFFF', // white
  minimumSliderTintColor: '#FF0000', // red
  maximumSliderTintColor: '#00FFFF', // blue
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
    backgroundColor: Colors.backgroundColor
  },
  headerTitle: {
    color: Colors.fontColor
  },
  settingsIcon: {
    margin: 5,
    marginLeft: 15,
    color: Colors.fontColor
  },
});
