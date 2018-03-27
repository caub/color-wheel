import React from 'react';
import ReactDOM from 'react-dom';
import Wheel, { OpacityRange } from '../src';

ReactDOM.render(
  <div style={{ background: '#333' }}>
    <Wheel />
    <OpacityRange />
  </div>,
  document.getElementById('root'),
);
