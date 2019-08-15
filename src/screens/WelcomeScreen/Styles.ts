import { StyleSheet } from 'react-native';

import { Colors } from '../../Styles';

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
    fontSize: 24,
    color: Colors.fontColor
  },
  bodyText: {
    color: Colors.fontColor
  },
});

export { styles }
