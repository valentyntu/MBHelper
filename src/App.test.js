import 'jsdom-global/register';
import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import store from './store';
import App from './App';
import {Provider} from 'react-redux';

describe('<App />', () => {
  it('renders without crashing', () => {
    let app = shallow(
        <Provider store={store}>
          <App/>
        </Provider>
    );
  });
});