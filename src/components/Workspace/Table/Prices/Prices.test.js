import React from 'react';
import {shallow} from 'enzyme';
import Prices from './Prices';

describe('<Prices />', () => {
  it('renders without crashing', () => {
    let pricesComp = shallow(
        <Prices/>
    );
  });

  it('sets prices correctly', () => {
    let buyPrice = 100;
    let sellPrice = 95;
    let pricesComp = shallow(
        <Prices
            buyPrice={buyPrice}
            isBuyPriceMin={false}
            sellPrice={sellPrice}
            isSellPriceMax={true}
        />
    );
    let buyPriceInput = pricesComp.find('.Prices-input-right');
    expect(buyPriceInput.props().defaultValue).toEqual(buyPrice);
    expect(buyPriceInput.props().className.includes('Prices-min-price')).toEqual(false);

    let sellPriceInput = pricesComp.find('.Prices-input-left');
    expect(sellPriceInput.props().defaultValue).toEqual(sellPrice);
    expect(sellPriceInput.props().className.includes('Prices-max-price')).toEqual(true);
  });

  it('sets inputs\' default values correctly', () => {
    let buyPrice = Number.MAX_SAFE_INTEGER;
    let sellPrice = 0;
    let pricesComp = shallow(
        <Prices
            buyPrice={buyPrice}
            sellPrice={sellPrice}
        />
    );
    const DEFAULT_INPUT_VALUE = '';

    let buyPriceInput = pricesComp.find('.Prices-input-right');
    expect(buyPriceInput.props().defaultValue).toEqual(DEFAULT_INPUT_VALUE);

    let sellPriceInput = pricesComp.find('.Prices-input-left');
    expect(sellPriceInput.props().defaultValue).toEqual(DEFAULT_INPUT_VALUE);
  });

  it('handles buy price change properly', () => {
    let changingResult = {};
    let pricesComp = shallow(<Prices onChange={(type, value) => {
      changingResult.type = type;
      changingResult.value = value;
    }}/>);
    let buyPriceInput = pricesComp.find('.Prices-input-right');
    const newBuyPrice = 250;
    buyPriceInput.simulate('blur', {target: {value: newBuyPrice}});
    let expectedResult = {
      type: 'buy',
      value: newBuyPrice
    };
    expect(changingResult).toEqual(expectedResult);

    buyPriceInput.simulate('blur', {target: {value: ''}});
    expectedResult.value = Number.MAX_SAFE_INTEGER;
    expect(changingResult).toEqual(expectedResult);
  });

  it('handles sell price change properly', () => {
    let changingResult = {};
    let pricesComp = shallow(<Prices onChange={(type, value) => {
      changingResult.type = type;
      changingResult.value = value;
    }}/>);
    let sellPriceInput = pricesComp.find('.Prices-input-left');
    const newSellPrice = 300;
    sellPriceInput.simulate('blur', {target: {value: newSellPrice}});
    let expectedResult = {
      type: 'sell',
      value: newSellPrice
    };
    expect(changingResult).toEqual(expectedResult);

    sellPriceInput.simulate('blur', {target: {value: ''}});
    expectedResult.value = 0;
    expect(changingResult).toEqual(expectedResult);
  });
});

