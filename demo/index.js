import React from 'react';
import ReactDOM from 'react-dom';
import injectSheet from 'react-jss';
import Wheel, { OpacityRange } from '../src';

const styles = {
  '@global': {
    body: {
      margin: 0,
      height: '100vh',
      backgroundColor: 'var(--bg)',
    },
    '*': {
      boxSizing: 'border-box',
    },
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
    borderRadius: '150px',
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
  state = { opacity: 1, color: [0, 0.75, 0.8] };

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { opacity, color: [h, s, l] } = this.state;
    document.body.style.setProperty(
      '--bg',
      `hsla(${Math.round(h * 360)},${Math.round(s * 100)}%,${Math.round(l * 100)}%,${opacity})`,
    );
  }

  render() {
    const { classes: _ } = this.props;
    const { opacity, color } = this.state;
    return (
      <div className={_.content}>
        <div className={_.wrapper}>
          <Wheel color={color} onChange={color => this.setState({ color })} />
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
