import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import zones from '../components/sketches/zones';

export const Home = () => {
  return (
    <div>
      <h2 id="title">Mueve tu cuerpo</h2>
      <P5Wrapper sketch={zones}></P5Wrapper>
      <div className="button-group">
        <a href="/" className="btn" id="btn-screenshot">
          Guarda tu imagen
        </a>
        <a href="/" className="btn" id="survey">
          Cuentanos tu experiencia
        </a>
      </div>
    </div>
  );
};
