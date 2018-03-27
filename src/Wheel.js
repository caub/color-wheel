import React from 'react';
import cn from 'classnames';
import injectSheet from 'react-jss';

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
  svg: {
    userSelect: 'none',
  },
};

const Wheel = ({ classes: _, className, ...props }) => (
  <div className={cn(_.wheel, className)} {...props}>
    <svg width="20" height="20">
      <defs>
        <mask id="hole">
          <rect width="100%" height="100%" fill="white" />
          <circle r="8" cx="10" cy="10" fill="black" />
        </mask>
      </defs>
    </svg>
    <canvas className={_.c2} height="330" width="330" />
    <div className={_.triangle}>
      <div className={_.twrap}>
        <canvas className={_.canvas} height="270" width="270" />
      </div>
      <svg className={_.sel} width="20" height="20">
        <circle fill="white" r="10" cx="10" cy="10" mask="url(#hole)" />
      </svg>
    </div>

    <svg className={cn(_.sel, _.hueSel)} width="20" height="20">
      <circle fill="white" r="10" cx="10" cy="10" mask="url(#hole)" />
    </svg>
  </div>
);

export default injectSheet(styles)(Wheel);
