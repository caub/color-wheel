import React from 'react';
import { mount } from 'enzyme';
import { Wheel } from './Wheel'; // could use ../dist/Wheel, but need to adjust jest mocks map, with rollup generated chunk

describe('Wheel', () => {
  it('should render without throwing an error', () => {
    const container = mount(<Wheel />);
    // console.log(container.debug());
    expect(container.find('canvas')).toHaveLength(2);
  });
});
