import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import puntosdePoseNet from '../../components/p5/puntosPoseNet';
import circulosCara from '../../components/p5/circulosCara';

const SketchExampleApp = () => {
  return (
    <div>
      <P5Wrapper sketch={circulosCara}></P5Wrapper>
    </div>
  );
};

export default SketchExampleApp;

// <P5Wrapper sketch={circulosMano}></P5Wrapper>
// <P5Wrapper sketch={puntosdePoseNet}></P5Wrapper>
