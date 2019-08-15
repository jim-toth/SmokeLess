import { StyleSheet } from 'react-native';

import { Colors } from '../../Styles';

const styles = StyleSheet.create({
  // BODY
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
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
    color: Colors.fontColor,
  },

  // BOTTOM VIEW
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.backgroundColor2,
    shadowOffset: { width: 5, height: 5 }
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
    color: Colors.fontColor
  },
  dragIcon: {
    margin: 5,
    color: Colors.fontColor
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
    textAlignVertical: 'center',
    color: Colors.fontColor
  }
});

export { styles }
