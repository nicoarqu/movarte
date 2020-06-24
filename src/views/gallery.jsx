import React from 'react';
import { images } from '../assets/pics';

export const Gallery = () => {
  return (
    <div>
      <h2>Explora los resultados de otras personas</h2>
      <div className="gallery-container">
        {images.map((img) => (
          <div className="responsive" key={img.id}>
            <div className="gallery">
              <a target="_blank" rel="noopener noreferrer" href={img.ref}>
                <img
                  src={img.ref}
                  alt="Creación abstracta"
                  width="600"
                  height="400"
                />
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="clearfix"></div>
      <div className="button-group">
        <a
          href={`${process.env.REACT_APP_IMG_FORM}`}
          className="btn"
          rel="noopener noreferrer"
          target="_blank">
          Sube tus creaciones
        </a>
      </div>
    </div>
  );
};
