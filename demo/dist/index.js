// React defined from unpkg
// cn defined from unpkg
// injectSheet defined from unpkg
// ReactDOM defined from unpkg

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

var hsv2hwb = (h, s, v) => [h, (1 - s) * v, 1 - v];

var hsl2hsv = (h, s, l) => {
  const t = s * (l < 0.5 ? l : 1 - l),
        V = l + t,
        S = l > 0 ? 2 * t / V : 0;
  return [h, S, V];
};

var hsl2hwb = ((...a) => hsv2hwb(...hsl2hsv(...a)));

var hsv2hsl = (h, s, v) => {
  const L = (2 - s) * v / 2,
        S = s * v / (L < 0.5 ? L * 2 : 2 - L * 2);
  return [h, S || 0, L];
};

var hwb2hsv = (h, w, b) => [h, b === 1 ? 0 : Math.max(0, 1 - w / (1 - b)), 1 - b];

var hwb2hsl = ((...a) => hsv2hsl(...hwb2hsv(...a)));

var hsl2rgb = (h, s, l) => {
  if (s === 0) return [l, l, l]; // achromatic

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [hue2rgb(p, q, h + 1 / 3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1 / 3)];
};

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
      ref: el => {
        this.wheel = el;
      },
      className: cn(_.wheel, className)
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
      ref: el => {
        this.c2 = el;
      },
      className: _.c2,
      height: "330",
      width: "330"
    }), React.createElement("div", {
      ref: el => {
        this.triangle = el;
      },
      className: _.triangle
    }, React.createElement("div", {
      ref: el => {
        this.twrap = el;
      },
      className: _.twrap
    }, React.createElement("canvas", {
      ref: el => {
        this.canvas = el;
      },
      className: _.canvas,
      height: "270",
      width: "270"
    })), React.createElement("svg", {
      ref: el => {
        this.fadeSel = el;
      },
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
      ref: el => {
        this.hueSel = el;
      },
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
  let _ref$classes = _ref.classes,
      classes = _ref$classes === void 0 ? {} : _ref$classes,
      _ref$rootProps = _ref.rootProps;
  _ref$rootProps = _ref$rootProps === void 0 ? {} : _ref$rootProps;

  let rootClassName = _ref$rootProps.className,
      rootProps = _objectWithoutProperties(_ref$rootProps, ["className"]),
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["classes", "rootProps", "className"]);

  return React.createElement("div", _extends({
    className: cn(rootClassName, classes.root)
  }, rootProps), React.createElement("input", _extends({
    type: "range",
    min: "0",
    max: "100",
    className: cn(className, classes.input)
  }, props)));
};
var OpacityRange$1 = injectSheet(styles$1)(OpacityRange);

const styles$2 = {
  '@global': {
    body: {
      margin: 0,
      height: '100vh',
      backgroundColor: 'var(--bg)' // we could do (_, {color:[h,s,l], opacity} => `hsla(${Math.round(h * 360)},...)` as well

    },
    '*': {
      boxSizing: 'border-box'
    }
  },
  content: {
    position: 'fixed',
    top: '10%',
    bottom: '10%',
    left: '10%',
    right: '10%',
    backgroundColor: '#eeed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '150px',
    minWidth: 525,
    minHeight: 350
  },
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  opacity: {
    transform: 'rotate(270deg)',
    margin: '0 -3em'
  },
  link: {
    position: 'absolute',
    top: 20,
    left: 20,
    textDecoration: 'none',
    '& svg': {
      width: 50
    }
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
    return React.createElement(React.Fragment, null, React.createElement("div", {
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
    }))), React.createElement("a", {
      href: "https://github.com/caub/color-wheel",
      className: _.link
    }, React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 50 50",
      "enable-background": "new 0 0 50 50"
    }, React.createElement("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      fill: "#181616",
      d: "M25 10c-8.3 0-15 6.7-15 15 0 6.6 4.3 12.2 10.3 14.2.8.1 1-.3 1-.7v-2.6c-4.2.9-5.1-2-5.1-2-.7-1.7-1.7-2.2-1.7-2.2-1.4-.9.1-.9.1-.9 1.5.1 2.3 1.5 2.3 1.5 1.3 2.3 3.5 1.6 4.4 1.2.1-1 .5-1.6 1-2-3.3-.4-6.8-1.7-6.8-7.4 0-1.6.6-3 1.5-4-.2-.4-.7-1.9.1-4 0 0 1.3-.4 4.1 1.5 1.2-.3 2.5-.5 3.8-.5 1.3 0 2.6.2 3.8.5 2.9-1.9 4.1-1.5 4.1-1.5.8 2.1.3 3.6.1 4 1 1 1.5 2.4 1.5 4 0 5.8-3.5 7-6.8 7.4.5.5 1 1.4 1 2.8v4.1c0 .4.3.9 1 .7 6-2 10.2-7.6 10.2-14.2C40 16.7 33.3 10 25 10z"
    }))));
  }

}

const DemoStyled = injectSheet(styles$2)(Demo);
ReactDOM.render(React.createElement(DemoStyled, null), document.getElementById('root'));
