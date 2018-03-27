function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

import React from 'react';
import styled from 'styled-jss';
const Range = styled('div')({
  position: 'relative',
  backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0.4))',
  borderRadius: 25,
  height: 16,
  width: 250,
  lineHeight: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '1.5em',
  userSelect: 'none',
  'input[type=range]': {
    '--gray': 'rgba(120, 120, 120, 0.6)',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 25,
    boxShadow: '0 0 2px 1px rgba(20, 20, 20, 0.9)',
    cursor: 'pointer',
    height: 16,
    width: 280,
    marginLeft: -1,
    marginRight: -1,
    outline: 'none',
    '-webkit-appearance': 'none',
    backgroundImage: `linear-gradient(45deg, var(--gray) 25%, transparent 25%, transparent 75%, var(--gray) 75%, var(--gray)),
      linear-gradient(45deg, var(--gray) 25%, transparent 25%, transparent 75%, var(--gray) 75%, var(--gray))`,
    backgroundSize: [16, 16],
    backgroundPosition: [0, 0, 8, 8]
  },
  'input[type=range]::-webkit-slider-thumb': {
    content: '""',
    borderRadius: '50%',
    border: 'solid 2px rgb(255, 255, 255)',
    height: 22,
    width: 22,
    '-webkit-appearance': 'none'
  },
  'input[type=number]': {
    width: 50,
    fontSize: '1.4em',
    marginLeft: '1em'
  }
});
export default ((_ref) => {
  let wrapperProps = _ref.wrapperProps,
      props = _objectWithoutProperties(_ref, ["wrapperProps"]);

  return React.createElement(Range, wrapperProps, React.createElement("input", _extends({
    type: "range",
    min: "0",
    max: "100"
  }, props)));
});