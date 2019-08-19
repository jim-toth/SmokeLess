/// <reference path="node_modules/typescript/lib/lib.d.ts" /
import * as React from 'react';
// import ReactMixin from 'react-mixin';
// import * as TimerMixin from 'react-timer-mixin';
import { View, Text, TouchableNativeFeedback } from 'react-native';

// Some code modified from https://github.com/noelyoo/react-native-timer-countdown/blob/master/index.tsx

const defaultStyle:any = {
  button: {
    width: '80%',
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 4
  },
  buttonExpired: {
    width: '80%',
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 4
  },
  text: {
    color: 'white',
    margin: 5,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'saira'
  }
}

interface ICountdownTimerButtonProps {
  bottomText?: string;
  until?: Date;
  resetOnPress?: boolean;
  onPress?: (beforeTimerExpired: boolean) => void;
  buttonStyle?: any;
  buttonExpiredStyle?: any;
  textStyle?: any;
}

interface ICountdownTimerButtonState {
  millisecondsRemaining: number,
  timeoutId: any,
  previousMilliseconds?: number
}

export default class CountdownTimerButton extends React.Component<ICountdownTimerButtonProps, ICountdownTimerButtonState> {
  constructor(props:ICountdownTimerButtonProps) {
    super(props);

    const millisecondsRemaining = props.until ? props.until.getTime() - Date.now() : -1;

    this.state = {
      millisecondsRemaining,
      timeoutId: 0,
      previousMilliseconds: 0
    }
  }

  static defaultProps = {
    buttonStyle: defaultStyle.button,
    buttonExpiredStyle: defaultStyle.buttonExpired,
    textStyle: defaultStyle.text
  }

  public componentDidMount(): void {
    this.tick();
  }

  public componentWillReceiveProps(newProps:ICountdownTimerButtonProps): void {
    if (this.state.timeoutId !== undefined) {
      clearTimeout(this.state.timeoutId);
    }
    this.setState({
      previousMilliseconds: undefined,
      millisecondsRemaining: newProps.until ? newProps.until.getTime() - Date.now() : -1
    });
  }

  public componentDidUpdate(): void {
    if (!this.state.previousMilliseconds && this.state.millisecondsRemaining > 0) {
      this.tick();
    }
  }

  public componentWillUnmount(): void {
    clearTimeout(this.state.timeoutId);
  }

  private isExpired = () : boolean => {
    return this.state.millisecondsRemaining <= 0;
  }

  _onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(this.isExpired());
    }
  }

  private tick = () => {
    const currentMilliseconds = Date.now();
    const dt = this.state.previousMilliseconds
      ? currentMilliseconds - this.state.previousMilliseconds
      : 0;
    const interval: number = 1000;

    // correct for small variations in actual timeout time
    const intervalSecondsRemaing: number = interval - (dt % interval);
    let timeout: number = intervalSecondsRemaing;

    if (intervalSecondsRemaing < interval / 2.0) {
      timeout += interval;
    }

    const millisecondsRemaining: number = Math.max(this.state.millisecondsRemaining - dt, 0);
    // const isComplete: boolean = this.state.previousMilliseconds && millisecondsRemaining <= 0 ? true : false;
    const isComplete: boolean = millisecondsRemaining <= 0 ? true : false;

    if (this.state.timeoutId !== undefined) {
      clearTimeout(this.state.timeoutId);
    }

    this.setState({
      timeoutId: isComplete ? undefined : setTimeout(this.tick, timeout),
      previousMilliseconds: currentMilliseconds,
      millisecondsRemaining
    });
  };

  private getFormattedTime = (milliseconds: number): string => {
    if (milliseconds <= 0) return '--:--:--'

    const remainingSec: number = Math.round(milliseconds / 1000);

    const seconds: number = parseInt((remainingSec % 60).toString(), 10);
    const minutes: number = parseInt(((remainingSec / 60) % 60).toString(), 10);
    const hours: number = parseInt((remainingSec / 3600).toString(), 10);

    const s = seconds < 10 ? '0' + seconds : seconds;
    const m = minutes < 10 ? '0' + minutes : minutes;
    let h = hours < 10 ? '0' + hours : hours;
    h = h === '00' ? '' : h + ':';
    return h + m + ':' + s;
  };

  render() {
    return (
      <TouchableNativeFeedback
        onPress={this._onPress}
        background={TouchableNativeFeedback.SelectableBackground()}
      >
        <View style={this.isExpired() ? this.props.buttonExpiredStyle : this.props.buttonStyle}>
          <Text style={this.props.textStyle}>{this.getFormattedTime(this.state.millisecondsRemaining)}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}
