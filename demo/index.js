import React from 'react';
import ReactDOM from 'react-dom';
import Wheel, { OpacityRange } from '../src';

ReactDOM.render(
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <OpacityRange />
  </div>,
  document.getElementById('root'),
);
