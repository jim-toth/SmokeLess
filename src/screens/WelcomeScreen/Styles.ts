import { StyleSheet } from 'react-native';

import { Colors, Fonts } from '../../Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
    padding: 20,
    backgroundColor: Colors.elevation0
  },
  bodyTitleText: {
    marginTop: 50,
    fontSize: 24,
    color: Colors.font,
    fontFamily: Fonts.primary
  },
  bodyText: {
    color: Colors.font,
    fontFamily: Fonts.primary
  },
});

export { styles }
