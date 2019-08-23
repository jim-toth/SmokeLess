import { StyleSheet } from 'react-native';

import { Colors, Fonts } from '../../Styles';

const styles = StyleSheet.create({
  // BODY
  container: {
    flex: 1,
    backgroundColor: Colors.elevation0,
  },

  // TOP VIEW
  topContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topContainerText: {
    padding: 5,
    color: Colors.font,
    fontFamily: Fonts.primary
  },

  // BOTTOM VIEW
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.elevation1,
    shadowOffset: { width: 5, height: 5 },
    paddingLeft: 20,
    paddingRight: 20,
  },
  bottomContainerTitleHandle: {
    width: '100%',
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    top: -24,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: -20,
    marginTop: 20,
    backgroundColor: 'transparent'
  },
  bottomContainerTitleText: {
    color: Colors.accent,
    fontFamily: Fonts.primary,
    fontSize: 12,
    backgroundColor: Colors.accentBackground,
    borderColor: Colors.accent,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20
  },
  dragIcon: {
    margin: 5,
    color: Colors.font
  },
  logContainer: {
    width: '100%',
  },
  logEntryWrapper: {
    flex: 1,
    flexDirection: 'row',
    padding: 5
  },
  logIcon: {
    margin: 5
  },
  logText: {
    fontSize: 16,
    textAlignVertical: 'center',
    color: Colors.font,
    fontFamily: Fonts.primary
  }
});

export { styles }
