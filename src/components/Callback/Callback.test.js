import React from 'react';
import {shallow} from 'enzyme';
import Callback from './Callback';

describe('<Callback />', () => {
  it('renders without crashing', () => {
    let workspace = shallow(
        <Callback/>
    );
  });
});