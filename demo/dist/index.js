import { a as commonjsGlobal, b as unwrapExports, c as createCommonjsModule, d as _react, e as _propTypes, f as _jss, g as _ns, h as _contextTypes, i as _propTypes2, j as injectSheet_1, k as _theming, l as React, m as injectSheet, n as ReactDOM } from './chunk-cdf6a347.js';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var JssProvider_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();









var ns = _interopRequireWildcard(_ns);



var _contextTypes2 = _interopRequireDefault(_contextTypes);



var _propTypes3 = _interopRequireDefault(_propTypes2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JssProvider = function (_Component) {
  _inherits(JssProvider, _Component);

  function JssProvider() {
    _classCallCheck(this, JssProvider);

    return _possibleConstructorReturn(this, (JssProvider.__proto__ || Object.getPrototypeOf(JssProvider)).apply(this, arguments));
  }

  _createClass(JssProvider, [{
    key: 'getChildContext',


    // JssProvider can be nested. We allow to overwrite any context prop at any level.
    // 1. Check if there is a value passed over props.
    // 2. If value was passed, we set it on the child context.
    // 3. If value was not passed, we proxy parent context (default context behaviour).
    value: function getChildContext() {
      var _props = this.props,
          registry = _props.registry,
          classNamePrefix = _props.classNamePrefix,
          localJss = _props.jss,
          generateClassName = _props.generateClassName;

      var sheetOptions = this.context[ns.sheetOptions] || {};
      var context = _defineProperty({}, ns.sheetOptions, sheetOptions);

      if (registry) {
        context[ns.sheetsRegistry] = registry;
        // This way we identify a new request on the server, because user will create
        // a new Registry instance for each.
        if (registry !== this.registry) {
          // We reset managers because we have to regenerate all sheets for the new request.
          this.managers = {};
          this.registry = registry;
        }
      }

      // Make sure we don't loose managers when JssProvider is used inside of a stateful
      // component which decides to rerender.
      context[ns.managers] = this.managers;

      if (generateClassName) {
        sheetOptions.generateClassName = generateClassName;
      } else if (!sheetOptions.generateClassName) {
        if (!this.generateClassName) {
          var createGenerateClassName = _jss.createGenerateClassNameDefault;
          if (localJss && localJss.options.createGenerateClassName) {
            createGenerateClassName = localJss.options.createGenerateClassName;
          }
          // Make sure we don't loose the generator when JssProvider is used inside of a stateful
          // component which decides to rerender.
          this.generateClassName = createGenerateClassName();
        }

        sheetOptions.generateClassName = this.generateClassName;
      }

      if (classNamePrefix) sheetOptions.classNamePrefix = classNamePrefix;
      if (localJss) context[ns.jss] = localJss;

      return context;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react.Children.only(this.props.children);
    }
  }]);

  return JssProvider;
}(_react.Component);

JssProvider.propTypes = _extends({}, _propTypes3['default'], {
  generateClassName: _propTypes.func,
  classNamePrefix: _propTypes.string,
  children: _propTypes.node.isRequired
});
JssProvider.childContextTypes = _contextTypes2['default'];
JssProvider.contextTypes = _contextTypes2['default'];
exports['default'] = JssProvider;
});

unwrapExports(JssProvider_1);

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});



Object.defineProperty(exports, 'ThemeProvider', {
  enumerable: true,
  get: function get() {
    return _theming.ThemeProvider;
  }
});
Object.defineProperty(exports, 'withTheme', {
  enumerable: true,
  get: function get() {
    return _theming.withTheme;
  }
});
Object.defineProperty(exports, 'createTheming', {
  enumerable: true,
  get: function get() {
    return _theming.createTheming;
  }
});



Object.defineProperty(exports, 'JssProvider', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(JssProvider_1)['default'];
  }
});



Object.defineProperty(exports, 'jss', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_jss)['default'];
  }
});
Object.defineProperty(exports, 'SheetsRegistry', {
  enumerable: true,
  get: function get() {
    return _jss.SheetsRegistry;
  }
});
Object.defineProperty(exports, 'createGenerateClassName', {
  enumerable: true,
  get: function get() {
    return _jss.createGenerateClassNameDefault;
  }
});



Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(injectSheet_1)['default'];
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
});

var injectSheet$1 = unwrapExports(lib);

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		module.exports = classNames;
	} else if (typeof undefined === 'function' && typeof undefined.amd === 'object' && undefined.amd) {
		// register as 'classnames', consistent with npm package name
		undefined('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());
});

var hsl2hsv = ((h, s, l) => {
  const t = s * (l < 0.5 ? l : 1 - l),
        V = l + t,
        S = l > 0 ? 2 * t / V : 0;
  return [h, S, V];
});

var hsv2hwb = ((h, s, v) => [h, (1 - s) * v, 1 - v]);

var hsl2hwb = (...a) => hsl2hsv(...hsv2hwb(...a));

var hwb2hsv = ((h, w, b) => [h, b === 1 ? 0 : Math.max(0, 1 - w / (1 - b)), 1 - b]);

var hsv2hsl = ((h, s, v) => {
  const L = (2 - s) * v / 2,
        S = s * v / (L < 0.5 ? L * 2 : 2 - L * 2);
  return [h, S || 0, L];
});

var hwb2hsl = (...a) => hwb2hsv(...hsv2hsl(...a));

var hsl2rgb = ((h, s, l) => {
  if (s === 0) return [l, l, l]; // achromatic

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [hue2rgb(p, q, h + 1 / 3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1 / 3)];
});

function hue2rgb(p, q, t) {
  // private fn
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

const PI = Math.PI;
function createAnnulus(canvas) {
  var width = canvas.width,
      height = canvas.height;
  var half = width / 2;
  var radius = half - 15;
  var ctx = canvas.getContext('2d');
  var imageData = ctx.getImageData(0, 0, width, height);
  var data = imageData.data;

  for (var j = 0; j < height; j++) {
    for (var i = 0; i < width; i++) {
      var _hsl2rgb$map = hsl2rgb(Math.atan2(j - half, i - half) / (2 * PI), 1, 0.5).map(x => Math.round(x * 255)),
          _hsl2rgb$map2 = _slicedToArray(_hsl2rgb$map, 3),
          r = _hsl2rgb$map2[0],
          g = _hsl2rgb$map2[1],
          b = _hsl2rgb$map2[2];

      var index = (j * width + i) * 4;
      data[index] = r;
      data[index + 1] = g;
      data[index + 2] = b;
      data[index + 3] = 0xff;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(half, half, radius, 0, 2 * PI, false);
  ctx.lineWidth = 30;
  ctx.stroke();
  ctx.restore();
}
function createTriangle(canvas) {
  var height = Math.round(canvas.height * 3 ** 0.5 / 2);
  var width = Math.round(canvas.height * 3 / 4);
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, height);
  ctx.lineTo(width, height / 2);
  ctx.closePath();
  ctx.clip();
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fill();
  var imageData = ctx.getImageData(0, 0, width, height);
  var data = imageData.data;
  var x1 = 0,
      y1 = 0;
  var x2 = 0,
      y2 = height;
  var x3 = width,
      y3 = height / 2;
  var det = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3);

  function barycentric(x, y) {
    var i1 = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / det;
    var i2 = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / det;
    var i3 = 1 - i1 - i2;
    return [i1, i2, i3];
  }

  for (var j = 0; j < height; j++) {
    for (var i = 0; i < width; i++) {
      var _barycentric = barycentric(i, j),
          _barycentric2 = _slicedToArray(_barycentric, 3),
          i1 = _barycentric2[0],
          i2 = _barycentric2[1],
          i3 = _barycentric2[2];

      var k = Math.floor(255 * (i1 + i2));
      var v = Math.floor(255 * i2);
      var index = (j * width + i) * 4;
      data[index] = v;
      data[index + 1] = v;
      data[index + 2] = v;
      data[index + 3] = k;
    }
  }

  ctx.putImageData(imageData, canvas.height - width, (canvas.height - height) / 2);
} // move/drag element helper

function move(e, container, cb) {
  return new Promise(end => {
    cb(e); // trigger it now also

    document.addEventListener('mouseup', ev => {
      container.removeEventListener('mousemove', cb);
      end(ev);
    }, {
      once: true
    });
    container.addEventListener('mousemove', cb);
  });
}

const PI$1 = Math.PI;
const L = 135 * 3 ** 0.5; // todo export this (related to canvas width height below)

const normalizeHue = hue => (hue + 360) % 360 / 360;

const rotate = ([x, y], angleRad) => [x * Math.cos(angleRad) - y * Math.sin(angleRad), x * Math.sin(angleRad) + y * Math.cos(angleRad)];
/**
 * convert coords in the triangle, (without the rotation) to [saturation, lightness], via whiteness/blackness
 * @param {[Int, Int]}
 */


const triangleCoordsToSL = ([X, Y]) => {
  const x0 = 135 - X; // distance to pure point (point with 0 whiteness, 0 blackness)

  const l0 = x0 * L / 202.5; // 202.5 = 135 * 3/2, the triangle height

  const white = Math.max(0, Math.min(1, (Y + l0 / 2) / L)); // distance from white to black side, parallel to base

  const black = Math.max(0, Math.min(1, (l0 / 2 - Y) / L));
  return hwb2hsl(0, white, black).slice(1); // hue is unchanged, and not needed to convert hw to sl
};

const sLToTriangleCoords = ([s, l]) => {
  const _hsl2hwb = hsl2hwb(0, s, l),
        _hsl2hwb2 = _slicedToArray(_hsl2hwb, 3),
        white = _hsl2hwb2[1],
        black = _hsl2hwb2[2];

  const l0 = (white + black) * L;
  const Y = white * L - l0 / 2;
  const x0 = l0 * 202.5 / L;
  return [135 - x0, Y];
};

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
  hidden: {
    userSelect: 'none',
    position: 'absolute',
    zIndex: -1
  }
};
class Wheel extends React.PureComponent {
  componentDidMount() {
    createTriangle(this.canvas);
    createAnnulus(this.c2);

    let _ref = this.props.color || [],
        _ref2 = _slicedToArray(_ref, 3),
        hue = _ref2[0],
        saturation = _ref2[1],
        lightness = _ref2[2];

    const updateWheel = angleRad => {
      const angleDeg = Math.round(angleRad * 180 / PI$1 * 100) / 100;
      const x = Math.round(165 + 150 * Math.cos(angleRad)),
            y = Math.round(165 + 150 * Math.sin(angleRad));
      this.hueSel.style.transform = `translate(${x}px, ${y}px)`;
      this.triangle.style.transform = `rotate(${angleDeg}deg)`;
      this.twrap.style.backgroundColor = `hsl(${angleDeg}, 100%, 50%)`;
    }; // initialize wheel angle


    updateWheel(hue * 2 * PI$1); // initialize triangle coords

    const _sLToTriangleCoords = sLToTriangleCoords([saturation, lightness]),
          _sLToTriangleCoords2 = _slicedToArray(_sLToTriangleCoords, 2),
          X = _sLToTriangleCoords2[0],
          Y = _sLToTriangleCoords2[1];

    const angle = parseFloat(this.triangle.style.transform.slice(7)) || 0;

    const _rotate = rotate([X, Y], hue * 2 * PI$1),
          _rotate2 = _slicedToArray(_rotate, 2),
          x = _rotate2[0],
          y = _rotate2[1];

    this.fadeSel.style.transform = `rotate(${-angle}deg) translate(${x}px, ${y}px)`;

    const rotateWheel = (e, X, Y) => {
      // rotate from mouse event, and X, Y center of wheel
      const angle = Math.atan2(e.clientY - Y, e.clientX - X);
      updateWheel(angle); // console.log(angle, x, y, `hsl(${angleDeg}, 100%, 50%)`);

      hue = normalizeHue(angle * 180 / PI$1);
      this.props.onChange([hue, saturation, lightness]);
    };

    this.c2.onmousedown = e => {
      const r = this.wheel.getBoundingClientRect(),
            X = r.left + r.width / 2,
            Y = r.top + r.height / 2;
      const d = ((e.clientX - X) ** 2 + (e.clientY - Y) ** 2) ** 0.5;
      if (d > 165 || d < 135) return;
      rotateWheel(e, X, Y);
      move(e, document, e => {
        rotateWheel(e, X, Y);
      });
    };

    this.canvas.onmousedown = e => {
      // ugly, todo a nice state in part3 (React)
      const angle = parseFloat(this.triangle.style.transform.slice(7)) || 0;
      const R = this.triangle.getBoundingClientRect(); // triangle has no width and height

      const angleRad = angle * PI$1 / 180; // red angle in radian

      const h = 135 * Math.sin(PI$1 / 6); // the small distance from triangle center to one side

      move(e, document, e => {
        let x = e.clientX - R.left;
        let y = e.clientY - R.top;

        if (e.target !== this.canvas) {
          // when dragging from outside
          const alpha = Math.atan2(y, x);
          const beta = ((alpha - angleRad) % (2 * PI$1) + 2 * PI$1) % (2 * PI$1);
          const med = beta >= 0 && beta < 2 * PI$1 / 3 ? PI$1 / 3 : beta >= 2 * PI$1 / 3 && beta < 4 * PI$1 / 3 ? -PI$1 : -PI$1 / 3;
          const r = h / Math.cos(beta - med);
          x = r * Math.cos(alpha);
          y = r * Math.sin(alpha);
        }

        const hueRad = hue * 2 * PI$1;

        const _rotate3 = rotate([x, y], -hueRad),
              _rotate4 = _slicedToArray(_rotate3, 2),
              X = _rotate4[0],
              Y = _rotate4[1];

        var _triangleCoordsToSL = triangleCoordsToSL([X, Y]);

        var _triangleCoordsToSL2 = _slicedToArray(_triangleCoordsToSL, 2);

        saturation = _triangleCoordsToSL2[0];
        lightness = _triangleCoordsToSL2[1];
        this.props.onChange([hue, saturation, lightness]);
        this.fadeSel.style.transform = `rotate(${-angle}deg) translate(${x}px, ${y}px)`;
      });
    };
  }

  render() {
    const _this$props = this.props,
          _this$props$classes = _this$props.classes,
          _ = _this$props$classes === void 0 ? {} : _this$props$classes,
          className = _this$props.className,
          props = _objectWithoutProperties(_this$props, ["classes", "className"]);

    return React.createElement("div", _extends({
      ref: el => this.wheel = el,
      className: classnames(_.wheel, className)
    }, props), React.createElement("svg", {
      width: "20",
      height: "20",
      className: _.hidden
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
      ref: el => this.c2 = el,
      className: _.c2,
      height: "330",
      width: "330"
    }), React.createElement("div", {
      ref: el => this.triangle = el,
      className: _.triangle
    }, React.createElement("div", {
      ref: el => this.twrap = el,
      className: _.twrap
    }, React.createElement("canvas", {
      ref: el => this.canvas = el,
      className: _.canvas,
      height: "270",
      width: "270"
    })), React.createElement("svg", {
      ref: el => this.fadeSel = el,
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
      ref: el => this.hueSel = el,
      className: classnames(_.sel, _.hueSel),
      width: "20",
      height: "20"
    }, React.createElement("circle", {
      fill: "white",
      r: "10",
      cx: "10",
      cy: "10",
      mask: "url(#hole)"
    })));
  }

}
var Wheel$1 = injectSheet(styles)(Wheel);

const styles$1 = {
  root: {
    position: 'relative',
    backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0.4))',
    borderRadius: 25,
    height: 16,
    width: 250,
    lineHeight: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
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
    backgroundPosition: [[0, 0], [8, 8]],
    '&::-webkit-slider-thumb': {
      content: '""',
      borderRadius: '50%',
      border: 'solid 2px rgb(255, 255, 255)',
      height: 22,
      width: 22,
      '-webkit-appearance': 'none'
    }
  }
};
const OpacityRange = (_ref) => {
  let classes = _ref.classes,
      _ref$rootProps = _ref.rootProps;
  _ref$rootProps = _ref$rootProps === void 0 ? {} : _ref$rootProps;

  let rootClassName = _ref$rootProps.className,
      rootProps = _objectWithoutProperties(_ref$rootProps, ["className"]),
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["classes", "rootProps", "className"]);

  return React.createElement("div", _extends({
    className: classnames(rootClassName, classes.root)
  }, rootProps), React.createElement("input", _extends({
    type: "range",
    min: "0",
    max: "100",
    className: classnames(className, classes.input)
  }, props)));
};
var OpacityRange$1 = injectSheet(styles$1)(OpacityRange);

const styles$2 = {
  '@global': {
    body: {
      margin: 0,
      height: '100vh',
      backgroundColor: 'var(--bg)'
    },
    '*': {
      boxSizing: 'border-box'
    }
  },
  content: {
    position: 'fixed',
    top: '20%',
    bottom: '20%',
    left: '20%',
    right: '20%',
    backgroundColor: '#eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '150px'
  },
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  opacity: {
    transform: 'rotate(270deg)',
    margin: '0 -3em'
  }
};

class Demo extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), _defineProperty(this, "state", {
      opacity: 1,
      color: [0, 0.75, 0.8]
    }), _temp;
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const _this$state = this.state,
          opacity = _this$state.opacity,
          _this$state$color = _slicedToArray(_this$state.color, 3),
          h = _this$state$color[0],
          s = _this$state$color[1],
          l = _this$state$color[2];

    document.body.style.setProperty('--bg', `hsla(${Math.round(h * 360)},${Math.round(s * 100)}%,${Math.round(l * 100)}%,${opacity})`);
  }

  render() {
    const _ = this.props.classes;
    const _this$state2 = this.state,
          opacity = _this$state2.opacity,
          color = _this$state2.color;
    return React.createElement("div", {
      className: _.content
    }, React.createElement("div", {
      className: _.wrapper
    }, React.createElement(Wheel$1, {
      color: color,
      onChange: color => this.setState({
        color
      })
    }), React.createElement(OpacityRange$1, {
      value: opacity * 100,
      onChange: evt => this.setState({
        opacity: evt.target.value / 100
      }),
      rootProps: {
        className: _.opacity
      }
    })));
  }

}

const DemoStyled = injectSheet$1(styles$2)(Demo);
ReactDOM.render(React.createElement(DemoStyled, null), document.getElementById('root'));
