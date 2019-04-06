import 'react-native';
import * as React from 'react';
import App from '../src/App';
import { shallow } from 'enzyme';

describe('<App />', () => {
  it('renders loading screen', () => {
    const tree = shallow(<App />);
    expect(tree).toMatchSnapshot();
  });

  it('renders without loading screen', () => {
    const tree = shallow(<App skipLoadingScreen />);
    expect(tree).toMatchSnapshot();
  });
});
