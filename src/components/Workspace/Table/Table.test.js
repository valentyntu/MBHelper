import 'jsdom-global/register';
import React from 'react';
import {mount, shallow} from 'enzyme';
import store from '../../../store'
import {Table} from './Table';
import {Provider} from 'react-redux';
import presets from '../Controls/Presets/Presets';

describe('<Table />', () => {
  it('renders without crashing', () => {
    let table = shallow(
        <Provider store={store}>
          <Table/>
        </Provider>
    );
  });

  it('mounts properly with initial state', () => {
    const presetToLoad = presets[1];

    let table = mount(
        <Table initialState={presetToLoad}/>
    );
    const EXPECTED_ROW_NUMBER = presetToLoad.cities.length + 2;
    expect(table.find('tr')).toHaveLength(EXPECTED_ROW_NUMBER);

    const EXPECTED_CELL_NUMBER = presetToLoad.cities.length * presetToLoad.products.length;
    expect(table.state().prices).toHaveLength(EXPECTED_CELL_NUMBER);
    expect(table.find('td')).toHaveLength(EXPECTED_CELL_NUMBER);

  });

  it('handles price change properly', () => {
    const presetToLoad = presets[1];
    const updateTableState = jest.fn();

    let table = shallow(
        <Table
            initialState={presetToLoad}
            updateTableState={updateTableState}
        />
    );

    const priceChange = {
      city: presetToLoad.cities[0],
      product: presetToLoad.products[0],
      type: 'buy',
      value: 300
    };

    const prices = table.find('Prices').first();
    prices.simulate('change', {
      target: priceChange
    });
    expect(updateTableState).toHaveBeenCalledWith(table.state());
  });
});
