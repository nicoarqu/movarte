import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import puntosdePoseNet from '../../components/p5/puntosPoseNet';
import circulosCara from '../../components/p5/circulosCara';
import zonas from '../../components/p5/zonas';
import trianguloMovimiento from '../../components/p5/trianguloMovimiento';

const SketchExampleApp = () => {
  return (
    <div>
      <h2>Mueve tu cuerpo</h2>
      <P5Wrapper sketch={zonas}></P5Wrapper>
    </div>
  );
};

export default SketchExampleApp;

// <P5Wrapper sketch={circulosMano}></P5Wrapper>
// <P5Wrapper sketch={puntosdePoseNet}></P5Wrapper>
