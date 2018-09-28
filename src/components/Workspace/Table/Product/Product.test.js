import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai'
import Product from './Product';

describe('<Product />', () => {
  it('renders without crashing', () => {
    let product = shallow(
        <Product/>
    );
  });
  it('shows its name', () => {
    const name = 'Tea';
    let product = shallow(
        <Product productName={name}/>
    );
    expect(product.props().children[0]).equal(name);
  });
  it('handles delete button click', () => {
    const name = 'Tea';
    let onChangeResult = {};
    let product = shallow(
        <Product
            productName={name}
            onChange={(name) => onChangeResult.name = name}
        />
    );
    product.find('button').simulate('click');
    expect(onChangeResult.name).equal(name);
  });
});