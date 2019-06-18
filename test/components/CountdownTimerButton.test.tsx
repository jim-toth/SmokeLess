import 'react-native';
import * as React from 'react';
import CountdownTimerButton from '../../src/components/CountdownTimerButton';
import { shallow } from 'enzyme';

describe('<CountdownTimerButton />', () => {
  let anHourFromNow = new Date();

  beforeAll(() => {
    anHourFromNow.setHours(anHourFromNow.getHours() + 1);
  });

  it('renders duration on a button from now until expiration time', () => {
    const tree = shallow(
      <CountdownTimerButton
        until={anHourFromNow}
      />
    );

    expect(tree.find('Button')).toHaveLength(1);
    expect(tree.find('Button').first().prop('title')).toEqual('01:00:00');
  });

  it('counts down', () => {
    const tree = shallow(
      <CountdownTimerButton
        until={anHourFromNow}
      />
    );

    jest.runOnlyPendingTimers();

    expect(tree.find('Button').first().prop('title')).toEqual('59:59');
  });

  it('matches snapshot', () => {
    const tree = shallow(
      <CountdownTimerButton
        until={new Date('1996-12-25')}
      />
    );

    expect(tree).toMatchSnapshot();
  });
});