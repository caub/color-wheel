import React from 'react';
import cn from 'classnames';
import injectSheet from 'react-jss/lib/injectSheet';

const styles = {
  root: {
    position: 'relative',
    backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0.4))',
    borderRadius: 25,
    height: 16,
    width: 250,
    lineHeight: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
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
      '-webkit-appearance': 'none',
    }
  }
};

const OpacityRangeRaw = ({ classes, rootProps: { className: rootClassName, ...rootProps }, className, ...props }) => (
  <div className={cn(rootClassName, classes.root)} {...rootProps}>
    <input type="range" min="0" max="100" className={cn(className, classes.input)} {...props} />
  </div>
);

export default injectSheet(styles)(OpacityRangeRaw);
