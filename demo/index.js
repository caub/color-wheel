import React from 'react';
import ReactDOM from 'react-dom';
import injectSheet from 'react-jss';
import Wheel, { OpacityRange } from '../src';

const styles = {
  '@global': {
    body: {
      margin: 0,
    },
    '*': {
      boxSizing: 'border-box',
    },
  },
  bg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    border: '80px solid transparent',
  },
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  opacity: {
    transform: 'rotate(270deg)',
    margin: '0 -3em',
  },
};

class Demo extends React.Component {
  state = { opacity: 0.6, color: [200, 1, 0.6] };
  render() {
    const { classes: _ } = this.props;
    const { opacity, color: [h, s, l] } = this.state;
    return (
      <div
        className={_.bg}
        style={{
          borderColor: `hsla(${Math.round(h)},${Math.round(s * 100)}%,${Math.round(l * 100)}%,${opacity})`,
        }}
      >
        <div className={_.wrapper}>
          <Wheel color={[h, s, l]} onChange={color => this.setState({ color })} />
          <OpacityRange
            value={opacity * 100}
            onChange={evt => this.setState({ opacity: evt.target.value / 100 })}
            wrapperProps={{
              className: _.opacity,
            }}
          />
        </div>
      </div>
    );
  }
}
const DemoStyled = injectSheet(styles)(Demo);

ReactDOM.render(<DemoStyled />, document.getElementById('root'));
