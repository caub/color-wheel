import React from 'react';
import { shallow } from 'enzyme';
import { OpacityRange } from '../dist/OpacityRange';

describe('OpacityRange', () => {
  it('should render without throwing an error', () => {
    const container = shallow(<OpacityRange />);
    // console.log(container.debug());
    expect(container.find('input')).toHaveLength(1);
  });
});
