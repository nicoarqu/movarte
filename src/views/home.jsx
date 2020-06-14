import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import zones from '../components/sketches/zones';

export const Home = () => {
  return (
    <div>
      <h2 id="title">Mueve tu cuerpo</h2>
      <P5Wrapper sketch={zones}></P5Wrapper>
      <button id="btn-screenshot">Guarda tu imagen</button>
    </div>
  );
};
