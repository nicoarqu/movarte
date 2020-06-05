import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import zones from '../../components/sketches/zones';

export const HomeApp = () => {
  return (
    <div>
      <h2>Mueve tu cuerpo</h2>
      <P5Wrapper sketch={zones}></P5Wrapper>
    </div>
  );
};
