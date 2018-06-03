import React from 'react';
import ReactDOM from 'react-dom';
import injectSheet from 'react-jss';
import Wheel, { OpacityRange } from '../src/index';

const styles = {
  '@global': {
    body: {
      margin: 0,
      height: '100vh',
      backgroundColor: 'var(--bg)', // we could do (_, {color:[h,s,l], opacity} => `hsla(${Math.round(h * 360)},...)` as well
    },
    '*': {
      boxSizing: 'border-box',
    },
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
    margin: '0 -3em',
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
  state = { opacity: 1, color: [0, 0.75, 0.8] };

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const {
      opacity,
      color: [h, s, l],
    } = this.state;
    document.body.style.setProperty(
      '--bg',
      `hsla(${Math.round(h * 360)},${Math.round(s * 100)}%,${Math.round(l * 100)}%,${opacity})`,
    );
  }

  render() {
    const { classes: _ } = this.props;
    const { opacity, color } = this.state;
    return <>
      <div className={_.content}>
        <div className={_.wrapper}>
          <Wheel color={color} onChange={color => this.setState({ color })} />
          <OpacityRange
            value={opacity * 100}
            onChange={evt => this.setState({ opacity: evt.target.value / 100 })}
            rootProps={{
              className: _.opacity,
            }}
          />
        </div>
      </div>
      <a href="https://github.com/caub/color-wheel" className={_.link}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" enable-background="new 0 0 50 50"><path fill-rule="evenodd" clip-rule="evenodd" fill="#181616" d="M25 10c-8.3 0-15 6.7-15 15 0 6.6 4.3 12.2 10.3 14.2.8.1 1-.3 1-.7v-2.6c-4.2.9-5.1-2-5.1-2-.7-1.7-1.7-2.2-1.7-2.2-1.4-.9.1-.9.1-.9 1.5.1 2.3 1.5 2.3 1.5 1.3 2.3 3.5 1.6 4.4 1.2.1-1 .5-1.6 1-2-3.3-.4-6.8-1.7-6.8-7.4 0-1.6.6-3 1.5-4-.2-.4-.7-1.9.1-4 0 0 1.3-.4 4.1 1.5 1.2-.3 2.5-.5 3.8-.5 1.3 0 2.6.2 3.8.5 2.9-1.9 4.1-1.5 4.1-1.5.8 2.1.3 3.6.1 4 1 1 1.5 2.4 1.5 4 0 5.8-3.5 7-6.8 7.4.5.5 1 1.4 1 2.8v4.1c0 .4.3.9 1 .7 6-2 10.2-7.6 10.2-14.2C40 16.7 33.3 10 25 10z" /></svg>
      </a>
    </>
  }
}
const DemoStyled = injectSheet(styles)(Demo);

ReactDOM.render(<DemoStyled />, document.getElementById('root'));
