import React from 'react';
import {mount, shallow} from 'enzyme';
import {Wheel} from '../dist/Wheel';

describe('Wheel', () => {
  it('should render without throwing an error', () => {
    const container = shallow(<Wheel />);
    console.log(container.debug());
    console.log(container.find('div'));
  });
});
