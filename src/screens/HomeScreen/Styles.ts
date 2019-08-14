import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // NAV HEADER
  settingsIcon: {
    margin: 5,
    marginLeft: 15
  },

  // BODY
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },

  // TOP VIEW
  topContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topContainerText: {},

  // BOTTOM VIEW
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',

    backgroundColor: 'white',

    borderWidth: 1,
    borderColor: 'black',
  },
  bottomContainerTitleHandle: {
    width: '100%',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black'
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
    textAlignVertical: 'center'
  }
});

export { styles }
