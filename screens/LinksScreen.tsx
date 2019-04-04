import React from 'react';
import { ScrollView, Text } from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <ScrollView>
        <Text>Smokes Log</Text>
      </ScrollView>
    );
  }
}
