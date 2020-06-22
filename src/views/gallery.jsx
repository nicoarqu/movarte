import React from 'react';
import { images } from '../assets/pics';

export const Gallery = () => {
  return (
    <div>
      <h2>Explora la galería de imágenes</h2>
      <p>Puedes lograr esto y más</p>
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
              <div className="desc"></div>
            </div>
          </div>
        ))}
      </div>
      <div class="clearfix"></div>
      <a
        href={`${process.env.REACT_APP_IMG_FORM}`}
        className="btn"
        rel="noopener noreferrer"
        target="_blank">
        Sube tus creaciones
      </a>
    </div>
  );
};
