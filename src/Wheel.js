import React from 'react';
import cn from 'classnames';
import injectSheet from 'react-jss';
import { hwb2hsl, hsl2hwb } from 'colorutil/src';
import { move, createAnnulus, createTriangle } from './util';

const { PI } = Math;

const L = 135 * 3 ** 0.5; // todo export this (related to canvas width height below)

const normalizeHue = hue => ((hue + 360) % 360) / 360;

const rotate = ([x, y], angleRad) => [
  x * Math.cos(angleRad) - y * Math.sin(angleRad),
  x * Math.sin(angleRad) + y * Math.cos(angleRad),
];

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
  const [, white, black] = hsl2hwb(0, s, l);
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
    alignItems: 'center',
  },
  canvas: {
    display: 'inline-block',
    position: 'absolute',
    left: -1,
    top: -1,
    zIndex: 5,
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
    background: 'hsl(0, 100%, 50%)',
  },
  triangle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  c2: {
    cursor: 'default',
  },
  wheel: {
    position: 'relative',
    lineHeight: 0,
    userSelect: 'none',
    width: 330,
    width: 330,
  },
  sel: {
    position: 'absolute',
    zIndex: 8,
    marginLeft: -10,
    marginTop: -10,
    pointerEvents: 'none',
  },
  hueSel: {
    top: 0,
    left: 0,
    transform: 'translate(315px, 165px)',
  },
  hidden: {
    userSelect: 'none',
    position: 'absolute',
    zIndex: -1,
  },
};

class Wheel extends React.PureComponent {
  componentDidMount() {
    createTriangle(this.canvas);
    createAnnulus(this.c2);

    let [hue, saturation, lightness] = this.props.color || [];

    const updateWheel = angleRad => {
      const angleDeg = Math.round(angleRad * 180 / PI * 100) / 100;
      const x = Math.round(165 + 150 * Math.cos(angleRad)),
        y = Math.round(165 + 150 * Math.sin(angleRad));
      this.hueSel.style.transform = `translate(${x}px, ${y}px)`;
      this.triangle.style.transform = `rotate(${angleDeg}deg)`;
      this.twrap.style.backgroundColor = `hsl(${angleDeg}, 100%, 50%)`;
    };

    // initialize wheel angle
    updateWheel(hue * 2 * PI);
    // initialize triangle coords
    const [X, Y] = sLToTriangleCoords([saturation, lightness]);
    const angle = parseFloat(this.triangle.style.transform.slice(7)) || 0;
    const [x, y] = rotate([X, Y], hue * 2 * PI);
    this.fadeSel.style.transform = `rotate(${-angle}deg) translate(${x}px, ${y}px)`;

    const rotateWheel = (e, X, Y) => {
      // rotate from mouse event, and X, Y center of wheel
      const angle = Math.atan2(e.clientY - Y, e.clientX - X);
      updateWheel(angle);
      // console.log(angle, x, y, `hsl(${angleDeg}, 100%, 50%)`);
      hue = normalizeHue(angle * 180 / PI);
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

      const angleRad = angle * PI / 180; // red angle in radian

      const h = 135 * Math.sin(PI / 6); // the small distance from triangle center to one side

      move(e, document, e => {
        let x = e.clientX - R.left;
        let y = e.clientY - R.top;
        if (e.target !== this.canvas) {
          // when dragging from outside
          const alpha = Math.atan2(y, x);
          const beta = ((alpha - angleRad) % (2 * PI) + 2 * PI) % (2 * PI);

          const med =
            beta >= 0 && beta < 2 * PI / 3 ? PI / 3 : beta >= 2 * PI / 3 && beta < 4 * PI / 3 ? -PI : -PI / 3;
          const r = h / Math.cos(beta - med);
          x = r * Math.cos(alpha);
          y = r * Math.sin(alpha);
        }

        const hueRad = hue * 2 * PI;
        const [X, Y] = rotate([x, y], -hueRad);

        [saturation, lightness] = triangleCoordsToSL([X, Y]);

        this.props.onChange([hue, saturation, lightness]);

        this.fadeSel.style.transform = `rotate(${-angle}deg) translate(${x}px, ${y}px)`;
      });
    };
  }

  render() {
    const { classes: _, className, ...props } = this.props;
    return (
      <div ref={el => (this.wheel = el)} className={cn(_.wheel, className)} {...props}>
        <svg width="20" height="20" className={_.hidden}>
          <defs>
            <mask id="hole">
              <rect width="100%" height="100%" fill="white" />
              <circle r="8" cx="10" cy="10" fill="black" />
            </mask>
          </defs>
        </svg>
        <canvas ref={el => (this.c2 = el)} className={_.c2} height="330" width="330" />
        <div ref={el => (this.triangle = el)} className={_.triangle}>
          <div ref={el => (this.twrap = el)} className={_.twrap}>
            <canvas ref={el => (this.canvas = el)} className={_.canvas} height="270" width="270" />
          </div>
          <svg ref={el => (this.fadeSel = el)} className={_.sel} width="20" height="20">
            <circle fill="white" r="10" cx="10" cy="10" mask="url(#hole)" />
          </svg>
        </div>

        <svg ref={el => (this.hueSel = el)} className={cn(_.sel, _.hueSel)} width="20" height="20">
          <circle fill="white" r="10" cx="10" cy="10" mask="url(#hole)" />
        </svg>
      </div>
    );
  }
}

export default injectSheet(styles)(Wheel);
