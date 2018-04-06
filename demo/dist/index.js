import React, { commonjsGlobal, unwrapExports, createCommonjsModule, default$1 as cn, default$2 as injectSheet, default$3 as styled, default$4 as ReactDOM } from './chunk1.js';

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

var colorutil = createCommonjsModule(function (module) {
/* 
 color model conversions between RGB, HSL, HSV and HWB

sources:
 - http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 - http://alvyray.com/Papers/CG/hwb2rgb.htm 

info:
- foo2bar: input and output are in [0, 1]
- fooToBar: natural ranges: hues in [0, 360[, colors in [0, 255], saturation/value/lightness in [0, 100]
*/


function hsl2rgb(h, s, l){
	if(s != 0) { // not achromatic
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		return [
			hue2rgb(p, q, h + 1/3),
			hue2rgb(p, q, h),
			hue2rgb(p, q, h - 1/3)
		];
	}
	return [l, l, l];
}

function hue2rgb(p, q, t){ // private fn
	if(t < 0) t += 1;
	if(t > 1) t -= 1;
	if(t < 1/6) return p + (q - p) * 6 * t;
	if(t < 1/2) return q;
	if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	return p;
}

function hsv2rgb(h, s, v){
	const i = Math.floor(h * 6);
	const f = h * 6 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);

	switch (i){
		case 6:
		case 0: return [v, t, p];
		case 1: return [q, v, p];
		case 2: return [p, v, t];
		case 3: return [p, q, v];
		case 4: return [t, p, v];
		case 5: return [v, p, q];
	}
}


function hwb2rgb(h, w, b){ // could throw or warn if w+b>=1 ?
	const v = 1 - b;
	const i = Math.floor(h * 6);
	const f = (i&1) ? 1+i - h*6 : h*6 - i; // if i is odd
	const n = w + f * (v - w); // linear interpolation

	switch (i){
		case 6:
		case 0: return [v, n, w];
		case 1: return [n, v, w];
		case 2: return [w, v, n];
		case 3: return [w, n, v];
		case 4: return [n, w, v];
		case 5: return [v, w, n];
	}
}


function rgb2hsl(r, g, b){
	const max = Math.max(r,g,b), min = Math.min(r,g,b);
	const l = (max + min) / 2, d = max - min;

	if(d > 0) {  // not achromatic
		const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		const h = max===r ? (g - b) / d + (g < b ? 6 : 0) :
						max===g ? (b - r) / d + 2 :
										 (r - g) / d + 4;
		return [h/6, s, l];
	}

	return [0, 0, l];
}


function rgb2hsv(r, g, b){
	const max = Math.max(r,g,b), min = Math.min(r,g,b);
	const v = max, d = max - min, s = max === 0 ? 0 : d / max;

	if (d > 0) { // not achromatic
		const h = max===r ? (g - b) / d + (g < b ? 6 : 0) :
						max===g ? (b - r) / d + 2 :
										 (r - g) / d + 4;
		return [h/6, s, v];
	}

	return [0, s, v];
}


function rgb2hwb(R, G, B){
	const max = Math.max(R,G,B), min = Math.min(R,G,B);
	const b = 1 - max, d = max -min;

	if(d > 0) {  // not achromatic
		const [f, i] = min===R ? [G - B, 3/6] :
								 min===G ? [B - R, 5/6] :
													[R - G, 1/6];

		return [i - f/(6*d), min, b];
	}

	return [0, min, b];
}


const hsv2hwb = (h,s,v) => [h, (1-s)*v, 1-v];

const hwb2hsv = (h,w,b) => [h, b===1 ? 0 : Math.max(0, 1-w/(1-b)), 1-b];


function hsv2hsl(h,s,v){
	const L = (2 - s) * v/2,
		S = s*v / (L<.5 ? L*2 : 2-L*2);

	return [h, S||0, L]
}
function hsl2hsv(h,s,l){
	const t = s * (l<.5 ? l : 1-l),
		V = l + t,
		S = l>0 ? 2*t/V : 0;
	return [h, S, V];
}

// ab128c -> [r, g, b]
const hexToRgb = s => s.length===3 ? 
	[parseInt(s[0]+s[0], 16), parseInt(s[1]+s[1], 16), parseInt(s[2]+s[2], 16)] :
	[parseInt(s.slice(0,2), 16), parseInt(s.slice(2,4), 16), parseInt(s.slice(4,6), 16)];

const hex2rgb = s => hexToRgb(s).map(x => x/255);

const rgbToHex = (R, G, B) => R%17===0 && G%17===0 && B%17===0 ? // short version
	R.toString(16)[0]+G.toString(16)[0]+B.toString(16)[0] :
	R.toString(16).padStart(2,0)+G.toString(16).padStart(2,0)+B.toString(16).padStart(2,0);

const rgb2hex = (r, g, b) => rgbToHex(Math.round(r*255), Math.round(g*255), Math.round(b*255));

// round hsl, hsv, hwb outputs
const pretty = ([h,s,l]) => [Math.round(360*h) % 360, Math.round(100*s), Math.round(100*l)];

const colorUtil = {
	rgb2hsl,
	rgb2hsv,
	rgb2hwb,
	rgb2hex,

	rgbToHsl: (R,G,B) => pretty(rgb2hsl(R/255, G/255, B/255)),
	rgbToHsv: (R,G,B) => pretty(rgb2hsv(R/255, G/255, B/255)),
	rgbToHwb: (R,G,B) => pretty(rgb2hwb(R/255, G/255, B/255)),
	rgbToHex,


	hsl2rgb,
	hsl2hsv,
	hsl2hwb: (h,s,l) => hsv2hwb(...hsl2hsv(h,s,l)),
	hsl2hex: (h,s,l) => rgb2hex(...hsl2rgb(h,s,l)),

	hslToRgb: (H,S,L) => hsl2rgb(H/360, S/100, L/100).map(x => Math.round(x*255)), 
	hslToHsv: (H,S,L) => pretty(hsl2hsv(H/360, S/100, L/100)),
	hslToHwb: (H,S,L) => pretty(hsv2hwb(...hsl2hsv(H/360, S/100, L/100))),
	hslToHex: (H,S,L) => rgb2hex(...hsl2rgb(H/360, S/100, L/100)),


	hsv2rgb,
	hsv2hsl,
	hsv2hwb,
	hsv2hex: (h,s,v) => rgb2hex(...hsv2rgb(h,s,v)), 

	hsvToRgb: (H,S,V) => hsv2rgb(H/360, S/100, V/100).map(x => Math.round(x*255)), 
	hsvToHsl: (H,S,V) => pretty(hsv2hsl(H/360, S/100, V/100)),
	hsvToHwb: (H,S,V) => pretty(hsv2hwb(H/360, S/100, V/100)),
	hsvToHex: (H,S,V) => rgb2hex(...hsv2rgb(H/360, S/100, V/100)), 


	hwb2rgb,
	hwb2hsl: (h,w,b) => hsv2hsl(...hwb2hsv(h,w,b)),
	hwb2hsv,
	hwb2hex: (h,w,b) => rgb2hex(...hwb2rgb(h,w,b)),

	hwbToRgb: (H,W,B) => hwb2rgb(H/360, W/100, B/100).map(x => Math.round(x*255)),
	hwbToHsl: (H,W,B) => pretty(hsv2hsl(...hwb2hsv(h,w,b))),
	hwbToHsv: (H,W,B) => pretty(hwb2hsv(H/360, W/100, B/100)),
	hwbToHex: (H,W,B) => rgb2hex(...hwb2rgb(H/360, W/100, B/100)),


	hex2rgb,
	hex2hsl: s => rgb2hsl(...hex2rgb(s)),
	hex2hsv: s => rgb2hsv(...hex2rgb(s)),
	hex2hwb: s => rgb2hwb(...hex2rgb(s)),

	hexToRgb,
	hexToHsl: s => pretty(rgb2hsl(...hex2rgb(s))),
	hexToHsv: s => pretty(rgb2hsv(...hex2rgb(s))),
	hexToHwb: s => pretty(rgb2hwb(...hex2rgb(s)))
};


// quick shims if the js engine is old:
if (!String.prototype.padStart) {
	if (!String.prototype.repeat) {
		String.prototype.repeat = function(n) {var s=this; for(var i=1;i<n;i++) s+=this; return s};
	}
	String.prototype.padStart = function(n, c) {return ((c+'').repeat(n)+this).slice(-n)};
}


{
	module.exports = colorUtil;
}
});

const _cu$default = colorutil,
      hsl2rgb = _cu$default.hsl2rgb,
      hwb2hsl = _cu$default.hwb2hsl;
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
        s = _ref2[1],
        l = _ref2[2]; // todo apply those intial values


    const rotateWheel = (e, X, Y) => {
      // rotate from mouse event, and X, Y center of wheel
      const angle = Math.atan2(e.clientY - Y, e.clientX - X),
            angleDeg = Math.round(angle * 180 / Math.PI * 100) / 100;
      const x = Math.round(165 + 150 * Math.cos(angle)),
            y = Math.round(165 + 150 * Math.sin(angle)); // console.log(angle, x, y, `hsl(${angleDeg}, 100%, 50%)`);

      this.hueSel.style.transform = `translate(${x}px, ${y}px)`;
      this.triangle.style.transform = `rotate(${angleDeg}deg)`;
      this.twrap.style.backgroundColor = `hsl(${angleDeg}, 100%, 50%)`;
      hue = normalizeHue(angleDeg);
      this.props.onChange([hue, s, l]);
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
          const alpha = Math.atan2(y, x);
          const beta = ((alpha - angleRad) % (2 * PI$1) + 2 * PI$1) % (2 * PI$1);
          const med = beta >= 0 && beta < 2 * PI$1 / 3 ? PI$1 / 3 : beta >= 2 * PI$1 / 3 && beta < 4 * PI$1 / 3 ? -PI$1 : -PI$1 / 3;
          const r = h / Math.cos(beta - med);
          x = r * Math.cos(alpha);
          y = r * Math.sin(alpha);
        }

        const hueRad = hue * 2 * PI$1;
        const X = x * Math.cos(hueRad) + y * Math.sin(hueRad);
        const Y = x * Math.sin(hueRad) - y * Math.cos(hueRad);
        const x0 = 135 - X; // distance to pure point (point with 0 whiteness, 0 blackness)

        const l0 = x0 * L / 202.5; // 202.5 = 135 * 3/2, the triangle height

        const white = Math.max(0, Math.min(1, (l0 / 2 - Y) / L)); // distance from white to black side, parallel to base

        const black = Math.max(0, Math.min(1, (Y + l0 / 2) / L));
        this.fadeSel.style.transform = `rotate(${-angle}deg) translate(${x}px, ${y}px)`;

        var _hwb2hsl = hwb2hsl(hue, white, black);

        var _hwb2hsl2 = _slicedToArray(_hwb2hsl, 3);

        hue = _hwb2hsl2[0];
        s = _hwb2hsl2[1];
        l = _hwb2hsl2[2];
        this.props.onChange([hue, s, l]);
      });
    };
  }

  render() {
    const _props = this.props,
          _ = _props.classes,
          className = _props.className,
          props = _objectWithoutProperties(_props, ["classes", "className"]);

    return React.createElement("div", _extends({
      ref: el => this.wheel = el,
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
  '& input[type="range"]': {
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
    backgroundPosition: [[0, 0], [8, 8]]
  },
  '& input[type="range"]::-webkit-slider-thumb': {
    content: '""',
    borderRadius: '50%',
    border: 'solid 2px rgb(255, 255, 255)',
    height: 22,
    width: 22,
    '-webkit-appearance': 'none'
  }
});
var OpacityRange = ((_ref) => {
  let wrapperProps = _ref.wrapperProps,
      props = _objectWithoutProperties(_ref, ["wrapperProps"]);

  return React.createElement(Range, wrapperProps, React.createElement("input", _extends({
    type: "range",
    min: "0",
    max: "100"
  }, props)));
});

const styles$1 = {
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

    return _temp = super(...args), Object.defineProperty(this, "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        opacity: 0.6,
        color: [0, 1, 0.6]
      }
    }), _temp;
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const _state = this.state,
          opacity = _state.opacity,
          _state$color = _slicedToArray(_state.color, 3),
          h = _state$color[0],
          s = _state$color[1],
          l = _state$color[2];

    document.body.style.setProperty('--bg', `hsla(${Math.round(h * 360)},${Math.round(s * 100)}%,${Math.round(l * 100)}%,${opacity})`);
  }

  render() {
    const _ = this.props.classes;
    const _state2 = this.state,
          opacity = _state2.opacity,
          color = _state2.color;
    return React.createElement("div", {
      className: _.content
    }, React.createElement("div", {
      className: _.wrapper
    }, React.createElement(Wheel$1, {
      color: color,
      onChange: color => this.setState({
        color
      })
    }), React.createElement(OpacityRange, {
      value: opacity * 100,
      onChange: evt => this.setState({
        opacity: evt.target.value / 100
      }),
      wrapperProps: {
        className: _.opacity
      }
    })));
  }

}

const DemoStyled = injectSheet(styles$1)(Demo);
ReactDOM.render(React.createElement(DemoStyled, null), document.getElementById('root'));
