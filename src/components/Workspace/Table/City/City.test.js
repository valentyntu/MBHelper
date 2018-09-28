import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai'
import City from './City';

describe('<City />', () => {
  it('renders without crashing', () => {
    let city = shallow(
        <City/>
    );
  });
  it('shows its name', () => {
    const name = 'Cherkasy';
    let city = shallow(
        <City cityName={name}/>
    );
    expect(city.props().children).to.contain(name);
  });
});