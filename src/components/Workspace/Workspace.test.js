import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Workspace from './Workspace';

describe('<Workspace />', () => {
  it('renders without crashing', () => {
    let workspace = shallow(
        <Workspace/>
    );
  });
  it('hides help by default', () => {

    let workspace = shallow(
        <Workspace/>
    );
    expect(workspace.props().children).to.contain(undefined);
  });
  it('shows help when required', () => {
    let workspace = shallow(
        <Workspace isHelpShown={true}/>
    );
    expect(workspace.props().children).to.have.length(3);
  });
});
