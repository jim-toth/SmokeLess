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
  topContainerText: {
    padding: 5
  },

  // BOTTOM VIEW
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    shadowOffset: { width: 5, height: 5 }
  },
  bottomContainerTitleHandle: {
    width: '100%',
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    top: -20,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: -20,
    backgroundColor: 'white'
  },
  dragIcon: {
    margin: 5
  },
  logContainer: {
    width: '100%'
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
