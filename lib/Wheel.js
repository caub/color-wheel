function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

import React from 'react';
import cn from 'classnames';
import injectSheet from 'react-jss';
const styles = {
  section: {
    padding: '2em',
    margin: '1em auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  canvas: {
    display: 'inline-block',
    position: 'absolute',
    left: -1,
    top: -1,
    zIndex: 5
  },
  twrap: {
    clipPath: 'polygon(67px 18px, 67px 252px, 270px 135px)',
    display: 'inline-block',
    height: 270,
    width: 270,
    position: 'absolute',
    zIndex: 1,
    left: -135,
    top: -135,
    background: 'hsl(0, 100%, 50%)'
  },
  triangle: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  },
  c2: {
    cursor: 'default'
  },
  wheel: {
    position: 'relative',
    lineHeight: 0,
    userSelect: 'none',
    width: 330,
    width: 330
  },
  sel: {
    position: 'absolute',
    zIndex: 8,
    marginLeft: -10,
    marginTop: -10,
    pointerEvents: 'none'
  },
  hueSel: {
    top: 0,
    left: 0,
    transform: 'translate(315px, 165px)'
  },
  svg: {
    userSelect: 'none'
  }
};

const Wheel = (_ref) => {
  let _ = _ref.classes,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["classes", "className"]);

  return React.createElement("div", _extends({
    className: cn(_.wheel, className)
  }, props), React.createElement("svg", {
    width: "20",
    height: "20"
  }, React.createElement("defs", null, React.createElement("mask", {
    id: "hole"
  }, React.createElement("rect", {
    width: "100%",
    height: "100%",
    fill: "white"
  }), React.createElement("circle", {
    r: "8",
    cx: "10",
    cy: "10",
    fill: "black"
  })))), React.createElement("canvas", {
    className: _.c2,
    height: "330",
    width: "330"
  }), React.createElement("div", {
    className: _.triangle
  }, React.createElement("div", {
    className: _.twrap
  }, React.createElement("canvas", {
    className: _.canvas,
    height: "270",
    width: "270"
  })), React.createElement("svg", {
    className: _.sel,
    width: "20",
    height: "20"
  }, React.createElement("circle", {
    fill: "white",
    r: "10",
    cx: "10",
    cy: "10",
    mask: "url(#hole)"
  }))), React.createElement("svg", {
    className: cn(_.sel, _.hueSel),
    width: "20",
    height: "20"
  }, React.createElement("circle", {
    fill: "white",
    r: "10",
    cx: "10",
    cy: "10",
    mask: "url(#hole)"
  })));
};

export default injectSheet(styles)(Wheel);