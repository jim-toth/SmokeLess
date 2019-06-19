/// <reference path="node_modules/typescript/lib/lib.d.ts" /
import * as React from 'react';
// import ReactMixin from 'react-mixin';
// import * as TimerMixin from 'react-timer-mixin';
import { Button } from 'react-native';

// Some code modified from https://github.com/noelyoo/react-native-timer-countdown/blob/master/index.tsx

interface ICountdownTimerButtonProps {
  bottomText?: string;
  until?: Date;
  resetOnPress?: boolean;
  onPress?: (beforeTimerExpired: boolean) => void;
}

interface ICountdownTimerButtonState {
  millisecondsRemaining: number,
  timeoutId: any,
  previousMilliseconds?: number,
  isExpired: boolean
}

export default class CountdownTimerButton extends React.Component<ICountdownTimerButtonProps, ICountdownTimerButtonState> {
  public readonly state = {
    millisecondsRemaining: this.props.until ? this.props.until.getTime() - Date.now() : -1,
    timeoutId: 0,
    previousMilliseconds: 0,
    isExpired: false
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
    return this.state.isExpired;
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
    const isComplete: boolean = this.state.previousMilliseconds && millisecondsRemaining <= 0 ? true : false;

    if (this.state.timeoutId !== undefined) {
      clearTimeout(this.state.timeoutId);
    }

    this.setState({
      timeoutId: isComplete ? undefined : setTimeout(this.tick, timeout),
      previousMilliseconds: currentMilliseconds,
      millisecondsRemaining,
      isExpired: isComplete
    });

    // if (this.props.onTick !== undefined) {
    //   this.props.onTick(millisecondsRemaining);
    // }
  };

  private getFormattedTime = (milliseconds: number): string => {
    if (milliseconds < 0) return '--:--:--'
    // if (this.props.formatMilliseconds !== undefined) {
    //   return this.props.formatMilliseconds(milliseconds);
    // }
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
    const millisecondsRemaining: number = this.state.millisecondsRemaining;
    const buttonColor = millisecondsRemaining > 0 ? 'red' : 'green';

    return (
      <Button
        color={buttonColor}
        title={this.getFormattedTime(millisecondsRemaining)}
        onPress={this._onPress}>
      </Button>
    );
  }
}

// ReactMixin(CountdownTimerButton.prototype, TimerMixin);
