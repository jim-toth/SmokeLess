import React from 'react';
import { Platform, ScrollView, Text, FlatList, View } from 'react-native';
import TabBarIcon from '../components/TabBarIcon';
import { SmokeLogEntry } from '../common/SmokeLogEntry';
import { fetchSmokeLogEntries } from '../db/SmokeLogRepository';
import { formatPrettyDate } from '../util/helpers';

interface ISmokesLogScreenState {
  smokeLogEntries?: SmokeLogEntry[];
}

const defaultState:ISmokesLogScreenState = {
}

export default class SmokesLogScreen extends React.Component<any, ISmokesLogScreenState> {
  static navigationOptions = {
    title: 'Smokes Log',
  };

  constructor(props:any) {
    super(props);
    this.state = defaultState
  }

  async componentDidMount() {
    await this._fetchData();
  }

  async componentDidUpdate() {
    await this._fetchData();
  }

  async _fetchData() {
    const smokeLogEntries = await fetchSmokeLogEntries();
    this.setState({ smokeLogEntries });
  }

  _getSafeSmokeLogEntries = () => {
    return this.state.smokeLogEntries || null;
  }

  render() {
    return (
      <ScrollView>
        <FlatList
          data={this._getSafeSmokeLogEntries()}
          renderItem={({item}) => {
            const focused = false;
            const cheatedIcon = item.cheated ? 'close-circle' : 'checkmark-circle';
            const cheatedBackground = item.cheated ? 'red' : 'green';
            const iconStyle = { margin: 5, color: cheatedBackground };
            return (
              <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                <TabBarIcon
                  focused={focused}
                  style={iconStyle}
                  name={
                    Platform.OS === 'ios'
                      ? `ios-${cheatedIcon}${focused ? '' : '-outline'}`
                      : `md-${cheatedIcon}`
                  }
                />
                <Text style={{ fontSize: 16, textAlignVertical: 'center' }}>{formatPrettyDate(item.timestamp)}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}>
        </FlatList>
      </ScrollView>
    );
  }
}
