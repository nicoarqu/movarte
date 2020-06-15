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
                  alt="Cinque Terre"
                  width="600"
                  height="400"
                />
              </a>
              <div className="desc">Add a description of the image here</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
