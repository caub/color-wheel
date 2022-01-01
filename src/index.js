// example

import { useState, useEffect } from 'react';
import { render } from 'react-dom';
import styled from '@emotion/styled';
import Wheel from './Wheel';

const Container = styled.div({
  height: '100vh',
 
  '*': {
    boxSizing: 'border-box',
  },

  '.content': {
    position: 'fixed',
    top: '10%',
    bottom: '10%',
    left: '10%',
    right: '10%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '150px',
    minWidth: 525,
    minHeight: 350
  },
  '.wrapper': {
    display: 'inline-flex',
    alignItems: 'center'
  },

  '.link': {
    position: 'absolute',
    top: 20,
    left: 20,
    textDecoration: 'none',
    '& svg': {
      width: 50
    }
  }
});

const OpacityRange = styled.input({
  transform: 'rotate(270deg)',
  margin: '0 -3em',
  backgroundColor: 'transparent',
  borderRadius: 25,
  boxShadow: '0 0 2px 1px rgba(20, 20, 20, 0.9)',
  cursor: 'pointer',
  height: 16,
  width: 280,
  outline: 'none',
  appearance: 'none',
  borderRadius: 25,
  '&::-webkit-slider-thumb': {
    content: '""',
    borderRadius: '50%',
    border: 'solid 2px rgb(255, 255, 255)',
    height: 22,
    width: 22,
    WebkitAppearance: 'none',
  }
});

function Demo() {
  const [opacity, setOpacity] = useState(1);
  const [color, setColor] = useState([0, 0.75, 0.8]);
  const [h, s, l] = color;
  const [H, S, L] = [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];

  return <Container style={{ backgroundColor: `hsla(${H}, ${S}%, ${L}%, ${opacity})` }}>
    <div className="content">
      <div className="wrapper">
        <Wheel value={color} onChange={setColor} />
        <OpacityRange
          value={opacity * 100}
          onChange={evt => setOpacity(evt.target.value / 100)}
          type="range"
          min="0"
          max="100"
          style={{ backgroundImage: `linear-gradient(to right, #fff, hsl(${H}, ${S}%, ${L}%))` }}
        />
      </div>
    </div>
    <a href="https://github.com/caub/color-wheel" className="link">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" enableBackground="new 0 0 50 50"><path fillRule="evenodd" clipRule="evenodd" fill="#181616" d="M25 10c-8.3 0-15 6.7-15 15 0 6.6 4.3 12.2 10.3 14.2.8.1 1-.3 1-.7v-2.6c-4.2.9-5.1-2-5.1-2-.7-1.7-1.7-2.2-1.7-2.2-1.4-.9.1-.9.1-.9 1.5.1 2.3 1.5 2.3 1.5 1.3 2.3 3.5 1.6 4.4 1.2.1-1 .5-1.6 1-2-3.3-.4-6.8-1.7-6.8-7.4 0-1.6.6-3 1.5-4-.2-.4-.7-1.9.1-4 0 0 1.3-.4 4.1 1.5 1.2-.3 2.5-.5 3.8-.5 1.3 0 2.6.2 3.8.5 2.9-1.9 4.1-1.5 4.1-1.5.8 2.1.3 3.6.1 4 1 1 1.5 2.4 1.5 4 0 5.8-3.5 7-6.8 7.4.5.5 1 1.4 1 2.8v4.1c0 .4.3.9 1 .7 6-2 10.2-7.6 10.2-14.2C40 16.7 33.3 10 25 10z" /></svg>
    </a>
  </Container>
}

render(<Demo />, document.getElementById('root'));
