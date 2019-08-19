import React from 'react';
import { View, Text } from 'react-native';

interface ISplashLoaderProps {
  startAsync: () => Promise<void>;
  onError: (error: Error) => void;
  onFinish: () => void;
}

export default class SplashLoader extends React.Component<ISplashLoaderProps,any> {
  _isMounted: boolean = false;

  componentDidMount() {
    this._isMounted = true;
    this._tryLoadAsync();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _tryLoadAsync = async () => {
    try {
      await this.props.startAsync();
    } catch (err) {
      if (!this._isMounted) {
        return;
      }

      this.props.onError(err);
    } finally {
      if (!this._isMounted) {
        return;
      }

      this.props.onFinish();
    }
  }

  render() {
    return (
      <View style={{margin:100, backgroundColor: 'black'}}>

      </View>
    );
  }
}
